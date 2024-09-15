import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { DecryptMessageResult } from 'openpgp';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import ErrorMessage from '../shared/ErrorMessage';
import { deleteSecret, getSecret } from '../utils/secret';
import {
  backendDomain,
  decryptMessage,
  isErrorWithMessage,
} from '../utils/utils';
import Secret from './Secret';

const DisplaySecret = () => {
  const { t } = useTranslation();
  const { format, key, password } = useParams();
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState<DecryptMessageResult>();

  const isFile = format === 'f';
  const url = isFile
    ? `${backendDomain}/file/${key}`
    : `${backendDomain}/secret/${key}`;

  const loadSecret = async (url: string, password: string | undefined) => {
    setLoading(true);

    try {
      // Get blob.

      if (password == null) {
        return setError(new Error('Access denied.'));
      }

      const secretResponse = await getSecret(url);
      if (secretResponse.status !== 200) {
        return setError(
          new Error('Secret not found. Probably revealed already or expired.'),
        );
      }

      const data = await secretResponse.json();

      if (data == null) {
        return setError(
          new Error('Secret not found. Probably revealed already or expired.'),
        );
      }

      // Decrypt blob.
      const decryptedMessage = await decryptMessage(
        data.message,
        password,
        isFile ? 'binary' : 'utf8',
      );

      setValue(decryptedMessage);

      // Delete secret.

      const response = await deleteSecret(url);
      if (response.status !== 204) {
        const data = await response.json();
        console.error(data.message);
      }
    } catch (e) {
      if (isErrorWithMessage(e)) {
        setError(e as any);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {value != null ? (
        <>
          <Secret secret={value.data as string} fileName={value.filename} />
          <Button component={Link} variant="contained" to="/" sx={{ mt: 6 }}>
            Respond securely
          </Button>
        </>
      ) : (
        <Box>
          {error == null && (
            <Typography
              variant="h2"
              color="primary"
              component="div"
              sx={{
                fontSize: '1.5rem',
                fontWeight: 300,
                textAlign: 'center',
                my: 5,
                px: 3,
              }}
            >
              You've received an encrypted secret. Press the button below to
              decrypt it.
            </Typography>
          )}

          <ErrorMessage
            message={error?.message}
            onClick={() => setError(undefined)}
          />
          {error == null && (
            <>
              <Box
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <Button
                  variant="contained"
                  disabled={loading}
                  onClick={() => loadSecret(url, password)}
                >
                  {loading
                    ? t('display.buttonDecryptLoading')
                    : t('display.buttonDecrypt')}
                </Button>
                {loading && <CircularProgress color="primary" size={20} />}
              </Box>
            </>
          )}
        </Box>
      )}
    </>
  );
};

export default DisplaySecret;

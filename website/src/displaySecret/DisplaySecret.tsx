import { Box, Button, CircularProgress } from '@mui/material';
import { DecryptMessageResult } from 'openpgp';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import Layout from '../layout/Layout';
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

      const data = await getSecret(url);

      if (data == null || password == null) {
        // @todo: handle error better.
        return;
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
    <Layout>
      {value ? (
        <Secret secret={value.data as string} fileName={value.filename} />
      ) : (
        <Box>
          <ErrorMessage
            message={error?.message}
            onClick={() => setError(undefined)}
          />
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
        </Box>
      )}
    </Layout>
  );
};

export default DisplaySecret;

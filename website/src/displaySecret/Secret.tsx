import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { saveAs } from 'file-saver';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useCopyToClipboard } from 'react-use';

const Secret = ({
  secret,
  fileName,
}: {
  readonly secret: string;
  readonly fileName?: string;
}) => {
  return (
    <>
      {fileName ? (
        <DownloadSecret fileName={fileName} secret={secret} />
      ) : (
        <RenderSecret secret={secret} />
      )}
    </>
  );
};

export default Secret;

const RenderSecret = ({ secret }: { readonly secret: string }) => {
  const { t } = useTranslation();
  const [copy, copyToClipboard] = useCopyToClipboard();
  const theme = useTheme();

  return (
    <Box sx={{ width: '100%' }}>
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
        {t('secret.subtitleMessage')}
      </Typography>

      <Typography
        id="pre"
        data-test-id="preformatted-text-secret"
        sx={{
          backgroundColor: '#f9fcfe',
          p:2,
          border: '2px solid ' + theme.palette.primary.main,
          display: 'block',
          fontSize: '1rem',
          borderRadius: '6px',
          wordWrap: 'break-word',
          wordBreak: 'break-all',
          whiteSpace: 'pre-wrap',
          fontFamily: 'monospace, monospace', // https://github.com/necolas/normalize.css/issues/519#issuecomment-197131966
          marginTop: '16px',
          marginBottom: '16px',
        }}
      >
        {secret}
      </Typography>
      <Button
        color={copy.error ? 'secondary' : 'primary'}
        onClick={() => copyToClipboard(secret)}
        startIcon={<FontAwesomeIcon icon={faCopy} />}
        variant="contained"
      >
        {t('secret.buttonCopy')}
      </Button>
    </Box>
  );
};

const DownloadSecret = ({
  secret,
  fileName,
}: {
  readonly secret: string;
  readonly fileName: string;
}) => {
  const { t } = useTranslation();

  useEffect(() => {
    saveAs(
      new Blob([secret], {
        type: 'application/octet-stream',
      }),
      fileName,
    );
  }, [fileName, secret]);

  return (
    <Box sx={{ width: '100%' }}>
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
        {t('secret.titleFile')}
      </Typography>
    </Box>
  );
};

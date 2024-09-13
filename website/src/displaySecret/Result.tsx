import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Button, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useCopyToClipboard } from 'react-use';
import ShareButtons from '../createSecret/ShareButtons';

type ResultProps = {
  readonly uuid: string;
  readonly password: string;
  readonly prefix: 's' | 'f';
};

const Result = ({ uuid, password, prefix }: ResultProps) => {
  const base =
    (import.meta.env.VITE_BASE_URL ||
      `${window.location.protocol}//${window.location.host}`) + `/#/${prefix}`;
  const short = `${base}/${uuid}`;
  const full = `${short}/${password}`;
  const { t } = useTranslation();
  const [copy, copyToClipboard] = useCopyToClipboard();
  const theme = useTheme();

  return (
    <Box>
      <Box
        sx={{
          // backgroundColor: '#f9fcfe',
          border: '2px solid' + theme.palette.primary.main,
          p: 2,
          borderRadius: '6px',
          mb: 2,
          color: theme.palette.grey[700],
          wordWrap: 'break-word',
          wordBreak: 'break-all',
          fontSize: '1rem',
          fontFamily: 'monospace, monospace', // https://github.com/necolas/normalize.css/issues/519#issuecomment-197131966
        }}
      >
        {full}
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
        }}
      >
        <Box>
          <Button
            startIcon={<FontAwesomeIcon icon={faCopy} />}
            color={copy.error ? 'secondary' : 'primary'}
            variant="contained"
            onClick={() => copyToClipboard(full)}
          >
            Copy
          </Button>
        </Box>
        <Box>
          <ShareButtons url={full} title="Secret" />
        </Box>
      </Box>
    </Box>
  );
};

export default Result;

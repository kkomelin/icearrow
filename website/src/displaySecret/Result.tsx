import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Button, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useCopyToClipboard } from 'react-use';
import ShareButton from '../createSecret/ShareButton';

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
          border: '2px solid' + theme.palette.primary.main,
          p: 2,
          borderRadius: '6px',
          mb: 2,
        }}
      >
        {full}
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
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
          <ShareButton url={full} />
        </Box>
      </Box>
    </Box>
  );
};

export default Result;

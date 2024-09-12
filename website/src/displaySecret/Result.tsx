import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useCopyToClipboard } from 'react-use';

type ResultProps = {
  readonly uuid: string;
  readonly password: string;
  readonly prefix: 's' | 'f';
  readonly customPassword?: boolean;
};

const Result = ({ uuid, password, prefix, customPassword }: ResultProps) => {
  const base =
    (import.meta.env.VITE_BASE_URL ||
      `${window.location.protocol}//${window.location.host}`) + `/#/${prefix}`;
  const short = `${base}/${uuid}`;
  const full = `${short}/${password}`;
  const { t } = useTranslation();

  return (
    <Box>
      {/* <Typography variant="h4">{t('result.title')}</Typography>
      <Typography>
        {t('result.subtitleDownloadOnce')}
        <br />
        {t('result.subtitleChannel')}
      </Typography> */}
      <TableContainer>
        <Table>
          <TableBody>
            <Row label={t('result.rowLabelOneClick')} value={full} />
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

type RowProps = {
  readonly label: string;
  readonly value: string;
};

const Row = ({ label, value }: RowProps) => {
  const [copy, copyToClipboard] = useCopyToClipboard();
  return (
    <TableRow key={label}>
      <TableCell width="15">
        <Button
          color={copy.error ? 'secondary' : 'primary'}
          variant="contained"
          onClick={() => copyToClipboard(value)}
        >
          <FontAwesomeIcon icon={faCopy} />
        </Button>
      </TableCell>
      <TableCell>{value}</TableCell>
    </TableRow>
  );
};

export default Result;

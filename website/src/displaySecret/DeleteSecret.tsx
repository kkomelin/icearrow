import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ErrorMessage from '../shared/ErrorMessage';
import { deleteSecret } from '../utils/secret';
import { isErrorWithMessage } from '../utils/utils';

const DeleteSecret = ({ url }: { readonly url: string }) => {
  const { t } = useTranslation();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = useState(false);

  const [deleted, setDeleted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onDelete = async (): Promise<void> => {
    setLoading(true);
    setError('');
    try {
      const response = await deleteSecret(url);

      if (response.status !== 204) {
        const data = await response.json();
        setError(data.message);
      } else {
        setDeleted(true);
        setOpen(false);
      }
    } catch (e) {
      if (isErrorWithMessage(e)) {
        setError(e.message);
      }
    }
    setLoading(false);
  };

  const handleConfirmOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (deleted) {
    return <Alert severity="error">{t('delete.messageDeleted')}</Alert>;
  }

  return (
    <>
      <Button color="secondary" onClick={handleConfirmOpen} disabled={deleted}>
        <FontAwesomeIcon icon={faTrash} /> {t('delete.buttonDelete')}
      </Button>

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="delete-dialog-title"
      >
        <DialogTitle id="delete-dialog-title">
          {t('delete.dialogTitle')}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <ErrorMessage message={error} />
            {t('delete.dialogMessage')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={handleClose}
            color="primary"
            disabled={loading}
          >
            {t('delete.dialogCancel')}
          </Button>
          <Button
            onClick={onDelete}
            color="primary"
            autoFocus
            disabled={loading}
          >
            {loading ? t('delete.dialogProgress') : t('delete.dialogConfirm')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteSecret;

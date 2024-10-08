import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Typography,
  useTheme,
} from '@mui/material';
import { createMessage, encrypt } from 'openpgp';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  DEFAULT_IS_ONETIME_LINK,
  DEFAULT_LINK_EXPIRATION_TIME,
  DEFAULT_MAX_UPLOAD_SIZE,
} from '../config/main';
import Result from '../displaySecret/Result';
import ErrorMessage from '../shared/ErrorMessage';
import { isErrorWithMessage, randomString, uploadFile } from '../utils/utils';

const Upload = () => {
  const maxSize = DEFAULT_MAX_UPLOAD_SIZE;
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const [result, setResult] = useState({
    password: '',
    uuid: '',
  });

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({
    defaultValues: {
      secret: '',
    },
  });

  const theme = useTheme();

  const form = watch();
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const reader = new FileReader();
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = async () => {
        handleSubmit(onSubmit)();

        try {
          const pw = randomString();
          const message = await encrypt({
            format: 'armored',
            message: await createMessage({
              binary: new Uint8Array(reader.result as ArrayBuffer),
              filename: acceptedFiles[0].name,
            }),
            passwords: pw,
          });
          const { data, status } = await uploadFile({
            expiration: DEFAULT_LINK_EXPIRATION_TIME,
            message,
            one_time: DEFAULT_IS_ONETIME_LINK,
          });

          if (status !== 200) {
            setError('secret', { type: 'submit', message: data.message });
          } else {
            setResult({
              uuid: data.message,
              password: pw,
            });
          }
        } catch (e) {
          if (isErrorWithMessage(e)) {
            setError('secret', {
              type: 'submit',
              message: e.message,
            });
          }
        } finally {
          setLoading(false);
        }
      };
      acceptedFiles.forEach((file) => reader.readAsArrayBuffer(file));
    },
    [form, handleSubmit],
  );

  const { getRootProps, getInputProps, fileRejections, isDragActive } =
    useDropzone({
      maxSize,
      minSize: 0,
      onDrop,
    });

  const onSubmit = () => {
    setLoading(true);
  };

  const isFileTooLarge =
    fileRejections.length > 0 &&
    fileRejections[0].errors[0].code === 'file-too-large';

  if (result.uuid) {
    return <Result uuid={result.uuid} password={result.password} prefix="f" />;
  }
  return (
    <Grid>
      {isFileTooLarge && (
        <ErrorMessage message={t('upload.errorFileTooLarge')} />
      )}
      {!isFileTooLarge && (
        <ErrorMessage
          message={errors.secret?.message}
          onClick={() => clearErrors('secret')}
        />
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          {...getRootProps()}
          style={{
            borderWidth: '2px',
            borderStyle: 'dashed',
            borderColor: !!errors.secret
              ? 'red'
              : isDragActive
                ? 'blue'
                : theme.palette.primary.main,
            borderRadius: '6px',
            padding: '40px',
            marginTop: '6px',
            marginBottom: '2rem',
            position: 'relative',
          }}
        >
          <input {...getInputProps()} />
          <Grid
            container
            justifyContent="left"
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              padding: '6px',
            }}
          >
            <Typography
              variant="body2"
              color="textSecondary"
              style={{
                fontSize: '12px',
              }}
            >
              {t('upload.title')} (max: {maxSize / 1024 / 1024} MB)
            </Typography>
          </Grid>
          <Grid container justifyContent="center">
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
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                disabled={isDragActive || loading}
                color="primary"
              >
                {loading
                  ? t('upload.buttonUploadLoading')
                  : t('upload.buttonUpload')}
              </Button>
              {loading && <CircularProgress color="primary" size={20} />}
            </Box>
          </Grid>
        </div>
      </form>
    </Grid>
  );
};

export default Upload;

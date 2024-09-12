import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Button, Grid, Typography } from '@mui/material';
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
import Error from '../shared/Error';
import { randomString, uploadFile } from '../utils/utils';

const Upload = () => {
  const maxSize = DEFAULT_MAX_UPLOAD_SIZE;
  const [error, setError] = useState('');
  const { t } = useTranslation();
  const [result, setResult] = useState({
    password: '',
    customPassword: false,
    uuid: '',
  });

  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      secret: '',
    },
  });

  const form = watch();
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const reader = new FileReader();
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = async () => {
        handleSubmit(onSubmit)();
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
          setError(data.message);
        } else {
          setResult({
            uuid: data.message,
            password: pw,
            customPassword: false,
          });
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

  const onSubmit = () => {};

  const isFileTooLarge =
    fileRejections.length > 0 &&
    fileRejections[0].errors[0].code === 'file-too-large';

  if (result.uuid) {
    return (
      <Result
        uuid={result.uuid}
        password={result.password}
        prefix="f"
        customPassword={result.customPassword}
      />
    );
  }
  return (
    <Grid>
      {isFileTooLarge && <Error message={t('upload.fileTooLarge')} />}
      <Error message={error} onClick={() => setError('')} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          {...getRootProps()}
          style={{
            border: '2px dashed #888888',
            borderRadius: '6px',
            padding: '40px',
            marginTop: '6px',
            position: 'relative',
          }}
        >
          <input {...getInputProps()} />
          {/* <Grid container justifyContent="center">
            <Typography variant="h4">{t('upload.title')}</Typography>
          </Grid> */}
          {/* <Grid container justifyContent="center">
            <FontAwesomeIcon
              color={isDragActive ? 'blue' : 'black'}
              size="8x"
              icon={faFileUpload}
            />

          </Grid> */}
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
            <Typography variant="body2" color="textSecondary" style={{}}>
              {t('upload.title')} (max: {maxSize / 1024 / 1024} MB)
            </Typography>
          </Grid>
          <Grid container justifyContent="center">
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              disabled={isDragActive}
              color="primary"
            >
              Upload
            </Button>
          </Grid>
        </div>
      </form>
    </Grid>
  );
};

export default Upload;

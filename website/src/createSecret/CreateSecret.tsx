import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Control, Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Result from '../displaySecret/Result';
import Error from '../shared/Error';
import Expiration from '../shared/Expiration';
import randomString, {
  encryptMessage,
  isErrorWithMessage,
  postSecret,
} from '../utils/utils';

const CreateSecret = () => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
    setError,
    clearErrors,
  } = useForm({
    defaultValues: {
      generateDecryptionKey: true,
      secret: '',
      onetime: true,
    },
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState({
    password: '',
    uuid: '',
    customPassword: false,
  });

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.ctrlKey && event.key === 'Enter') {
      handleSubmit(onSubmit)();
    }
  };

  const onSubmit = async (form: any): Promise<void> => {
    // Use the manually entered password, or generate one
    const pw = form.password ? form.password : randomString();
    setLoading(true);
    try {
      const { data, status } = await postSecret({
        expiration: parseInt(form.expiration),
        message: await encryptMessage(form.secret, pw),
        one_time: form.onetime,
      });

      if (status !== 200) {
        setError('secret', { type: 'submit', message: data.message });
      } else {
        setResult({
          customPassword: form.password ? true : false,
          password: pw,
          uuid: data.message,
        });
      }
    } catch (e) {
      if (isErrorWithMessage(e)) {
        setError('secret', {
          type: 'submit',
          message: e.message,
        });
      }
    }
    setLoading(false);
  };

  if (result.uuid) {
    return (
      <Result
        password={result.password}
        uuid={result.uuid}
        prefix="s"
        customPassword={result.customPassword}
      />
    );
  }
  return (
    <>
      <Error
        message={errors.secret?.message}
        onClick={() => clearErrors('secret')}
      />
      <Typography component="h1" variant="h4" align="center">
        {t('create.title')}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container justifyContent="center" paddingTop={1}>
          <Controller
            name="secret"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                multiline={true}
                margin="dense"
                fullWidth
                label={t('create.inputSecretLabel')}
                rows="4"
                autoFocus={true}
                onKeyDown={onKeyDown}
                placeholder={t<string>('create.inputSecretPlaceholder')}
                inputProps={{ spellCheck: 'false', 'data-gramm': 'false' }}
              />
            )}
          />
          <Grid container justifyContent="center" marginTop={2}>
            <Expiration control={control} />
          </Grid>
          <Grid container alignItems="center" direction="column">
            <OneTime control={control} />
          </Grid>
          <Grid container justifyContent="center">
            <Box p={2} pb={4}>
              <Button
                onClick={() => handleSubmit(onSubmit)()}
                variant="contained"
                disabled={loading}
              >
                {loading ? (
                  <span>{t('create.buttonEncryptLoading')}</span>
                ) : (
                  <span>{t('create.buttonEncrypt')}</span>
                )}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export const OneTime = (props: { control: Control<any> }) => {
  const { t } = useTranslation();

  return (
    <Grid item justifyContent="center">
      <FormControlLabel
        control={
          <Controller
            name="onetime"
            control={props.control}
            render={({ field }) => (
              <Checkbox
                {...field}
                id="enable-onetime"
                defaultChecked={true}
                color="primary"
              />
            )}
          />
        }
        label={t('create.inputOneTimeLabel') as string}
      />
    </Grid>
  );
};

export default CreateSecret;

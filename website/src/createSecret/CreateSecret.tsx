import { Box, Button, CircularProgress, Grid, TextField } from '@mui/material';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  DEFAULT_IS_ONETIME_LINK,
  DEFAULT_LINK_EXPIRATION_TIME,
} from '../config/main';
import Result from '../displaySecret/Result';
import Error from '../shared/Error';
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
      secret: '',
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
    const pw = randomString();
    setLoading(true);
    try {
      const { data, status } = await postSecret({
        expiration: DEFAULT_LINK_EXPIRATION_TIME,
        message: await encryptMessage(form.secret, pw),
        one_time: DEFAULT_IS_ONETIME_LINK,
      });

      if (status !== 200) {
        setError('secret', { type: 'submit', message: data.message });
      } else {
        setResult({
          customPassword: false,
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
    } finally {
      setLoading(false);
    }
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
      {/* <Typography component="h1" variant="h4" align="center">
        {t('create.title')}
      </Typography> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container justifyContent="center" paddingTop={0}>
          <Controller
            name="secret"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                multiline={true}
                margin="dense"
                fullWidth
                // label={t('create.inputSecretLabel')}
                rows="4"
                autoFocus={true}
                onKeyDown={onKeyDown}
                placeholder={t('create.inputSecretPlaceholder')}
                inputProps={{ spellCheck: 'false', 'data-gramm': 'false' }}
              />
            )}
          />
          <Grid container justifyContent="center">
            <Box
              p={2}
              pb={4}
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '10px',
              }}
            >
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
              {loading && <CircularProgress color="inherit" size={20} />}
            </Box>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default CreateSecret;

import { Box, Container, Link, Typography } from '@mui/material';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 1,
          p: 2,
          mt: 4,
        }}
      >
        <Typography variant="body2" color="textSecondary" align="center">
          Hosted on{' '}
          <Link
            href="https://walrus.xyz?utm_source=icearrow"
            target="_blank"
            rel="noopener noreferrer"
          >
            Walrus
          </Link>
        </Typography>
        <span>&middot;</span>
        <Typography variant="body2" color="textSecondary" align="center">
          <Link
            href="https://github.com/kkomelin/icearrow"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </Link>
        </Typography>
        <span>&middot;</span>
        <Typography variant="body2" color="textSecondary" align="center">
          <Link
            href="https://github.com/kkomelin/icearrow-extension"
            target="_blank"
            rel="noopener noreferrer"
          >
            Extension
          </Link>
        </Typography>
        {/* <Typography
        margin={4}
        variant="body2"
        color="textSecondary"
        align="center"
      >
        {t('attribution.createdBy')}{' '}
        <Link href="https://github.com/jhaals/yopass">Johan Haals</Link>
      </Typography> */}
        {/* {t('attribution.translatorName') && <TranslationAttribution />} */}
      </Box>
    </Container>
  );
};

const TranslationAttribution = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {t('attribution.translatedBy')}{' '}
      <Link href={t('attribution.translatorLink')}>
        {t('attribution.translatorName')}
      </Link>
    </Typography>
  );
};

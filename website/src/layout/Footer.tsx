import { Container, Link, Typography } from '@mui/material';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <Typography
        margin={4}
        variant="body2"
        color="textSecondary"
        align="center"
      >
        Hosted on{' '}
        <Link
          href="https://walrus.xyz?utm_source=icearrow"
          target="_blank"
          rel="noopener noreferrer"
        >
          Walrus
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

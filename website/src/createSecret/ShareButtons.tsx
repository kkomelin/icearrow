import { Box, useTheme } from '@mui/material';
import { FC } from 'react';
import {
  EmailIcon,
  EmailShareButton,
  TelegramIcon,
  TelegramShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share';

interface IShareButtonsProps {
  url: string;
  title: string;
}

const ShareButtons: FC<IShareButtonsProps> = ({ url, title }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '16px',
      }}
    >
      <TelegramShareButton
        title="Send via Telegram"
        url={url}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TelegramIcon
          size={32}
          round
          bgStyle={{ fill: theme.palette.primary.main }}
        />
      </TelegramShareButton>

      <WhatsappShareButton
        title="Send via Whatsapp"
        url={url}
        separator=":: "
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <WhatsappIcon
          size={32}
          round
          bgStyle={{ fill: theme.palette.primary.main }}
        />
      </WhatsappShareButton>

      <EmailShareButton
        title="Send via email"
        url={url}
        subject={title}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <EmailIcon
          size={32}
          round
          bgStyle={{ fill: theme.palette.primary.main }}
        />
      </EmailShareButton>
    </Box>
  );
};

export default ShareButtons;

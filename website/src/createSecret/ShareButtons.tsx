import { Box } from '@mui/material';
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
        url={url}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TelegramIcon size={32} round />
      </TelegramShareButton>

      <WhatsappShareButton
        url={url}
        separator=":: "
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>

      <EmailShareButton
        url={url}
        subject={title}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <EmailIcon size={32} round />
      </EmailShareButton>
    </Box>
  );
};

export default ShareButtons;

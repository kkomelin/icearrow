import { faShare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@mui/material';
import { FC } from 'react';

interface IShareButtonProps {
  url: string;
}

const ShareButton: FC<IShareButtonProps> = ({ url }) => {
  const shareData = {
    // title: 'Share Secret',
    // text: '',
    url,
  };

  const handleClick = async () => {
    try {
      await navigator.share(shareData);
      //resultPara.textContent = "MDN shared successfully";
    } catch (err) {
      //resultPara.textContent = `Error: ${err}`;
      console.error(err);
    }
  };

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleClick}
      startIcon={<FontAwesomeIcon icon={faShare} />}
    >
      Share
    </Button>
  );
};

export default ShareButton;

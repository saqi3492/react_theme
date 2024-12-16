import { IconButton } from '@mui/material';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';

const BackButton = ({ handleBack }) => {
  return (
    <>
      <IconButton onClick={handleBack} sx={{ backgroundColor: 'white' }}>
        <ArrowBackIosNewRoundedIcon sx={{ color: 'black' }} />
      </IconButton>
    </>
  );
};

export default BackButton;

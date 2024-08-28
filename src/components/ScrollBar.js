import { styled } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css'; // Import the styles

const StyledScrollBar = styled(PerfectScrollbar)(({ theme }) => ({
  maxHeight: '100%',
  '& .ps__rail-y': {
    width: 9,
    right: 2, // Adjusts scrollbar's position
    backgroundColor: 'transparent'
  },
  '& .ps__thumb-y': {
    backgroundColor: theme.palette.grey[400],
    borderRadius: 4,
    opacity: 0.6
  },
  '& .ps__rail-x': {
    height: 6,
    bottom: 2, // Adjusts scrollbar's position
    backgroundColor: 'transparent'
  },
  '& .ps__thumb-x': {
    backgroundColor: theme.palette.grey[400],
    borderRadius: 4,
    opacity: 0.6
  },
  '&:hover .ps__thumb-y, &:hover .ps__thumb-x': {
    opacity: 1
  }
}));

const Scrollbar = ({ children, style, sx, ...props }) => {
  return (
    <StyledScrollBar style={style} sx={sx} {...props}>
      {children}
    </StyledScrollBar>
  );
};

export default Scrollbar;

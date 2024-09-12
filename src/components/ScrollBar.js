import PerfectScrollbar from 'react-perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css'; // Import the styles

const Scrollbar = ({ children, style, ...props }) => {
  return (
    <PerfectScrollbar style={style} {...props}>
      {children}
    </PerfectScrollbar>
  );
};

export default Scrollbar;

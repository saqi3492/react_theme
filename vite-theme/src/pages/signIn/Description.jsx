import { Box, Typography } from '@mui/material';

const Description = () => {
  return (
    <Box sx={{ mt: { xs: 7, lg: 'auto' }, my: 'auto', maxWidth: '800px' }}>
      <Typography sx={{ fontSize: { xs: 25, md: 40 }, fontWeight: '600' }} gutterBottom>
        Revolutionising Clinical Note Creation
      </Typography>
      <Typography fontSize={18} fontWeight="400" color="textSecondary">
        In todays fast-paced healthcare environment accurate and efficient documentation is critical. ConvoNote transforms the way
        healthcare professionals handle documentation offering a powerful and intuitive platform designed to meet the unique needs of modern
        medical practices. Our solution simplifies the complexities of note-taking allowing you to seamlessly manage patient notes with
        confidence precision and speed. Our platform is designed to adapt to your workflow offering flexible tools that streamline the
        documentation process without sacrificing thoroughness or compliance. With ConvoNote patient records are not only easy to access but
        also organized in a way that promotes clarity and efficiency for better decision-making
      </Typography>
    </Box>
  );
};

export default Description;

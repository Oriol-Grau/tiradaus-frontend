import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import styles from './Index.module.css';
import Header from '../components/Header';

export function Index() {
  return (
    <Container maxWidth="xl" disableGutters={true}>
      <Header/>
      <Box sx={{ height: styles.box.height }}>
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Welcome to Tiradaus!
        </Typography>
        <Typography variant="body1" component="p" sx={{ mb: 2 }}>
          This is the home page of the Tiradaus application.
        </Typography>
      </Box>
    </Container>
  );
}

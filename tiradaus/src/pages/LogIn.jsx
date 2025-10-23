import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import styles from "./LogIn.module.css";
import Header from "../components/Header";
import {
    Button,
  FormControl,
  FormControlLabel,
  FormGroup,
} from "@mui/material";

export function LogIn() {
  return (
    <Container maxWidth="xl" disableGutters={true}>
      <Header />
      <Box sx={{ height: styles.box.height }}>
        <Typography variant="h2" component="h1" sx={{ mb: 2 }}>
          Identifica't
        </Typography>
        <form>
          <FormGroup>
            <FormControlLabel label="User name" />
            <FormControl component="input" required={true} />
          </FormGroup>
          <FormGroup>
            <FormControlLabel label="Password" />
            <FormControl component="input" required={true} />
          </FormGroup>
          <Button type="submit">Enviar</Button>
        </form>
      </Box>
    </Container>
  );
}

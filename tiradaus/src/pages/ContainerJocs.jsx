import Header from "../components/Header";
import { Footer } from "../components/Footer";
import { Container } from "@mui/material";
import Jocs from "../components/Jocs";

export default function ContainerJocs() {

  return (
    <Container
      disableGutters={true}
      maxWidth="xl"
      sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Header />
      <Jocs />
      <Footer />
    </Container>
  );
}

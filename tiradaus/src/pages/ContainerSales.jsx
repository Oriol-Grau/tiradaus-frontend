import Header from "../components/Header";
import { Footer } from "../components/Footer";
import { Container } from "@mui/material";
import Sales from "../components/Sales";

export default function ContainerSales() {
  return (
    <Container
      disableGutters={true}
      maxWidth="xl"
      sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Header />
      <Sales />
      <Footer />
    </Container>
  );
}

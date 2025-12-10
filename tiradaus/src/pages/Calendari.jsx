import Container from "@mui/material/Container";
import Header from "../components/Header";
import { Footer } from "../components/Footer";
import Calendar from "../components/Calendari/Calendar";

export default function Calendari() {
  return (
    <Container
      disableGutters={true}
      maxWidth="xl"
      sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Header />
      <Calendar />
      <Footer />
    </Container>
  );
}

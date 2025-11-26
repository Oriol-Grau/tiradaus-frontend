import { Suspense } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { Footer } from "../components/Footer";
import { Container } from "@mui/material";
import { detallJoc } from "../services/games";
import Joc from "../components/Jocs/Joc";

export default function ContainerJoc() {
  const { id } = useParams();

  return (
    <Container
      disableGutters={true}
      maxWidth="xl"
      sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Header />
      <Container
        disableGutters={true}
        maxWidth="xl"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "background.main",
          overflowY: "auto",
        }}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <Joc jocPromise={detallJoc(id)} />
        </Suspense>
      </Container>
      <Footer />
    </Container>
  );
}

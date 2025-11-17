import { Suspense } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import { Footer } from "../components/Footer";
import { Container } from "@mui/material";
import Jocs from "../components/Jocs";
import { obtenirTotsJocs } from "../services/games";

export default function ContainerJocs() {
  const location = useLocation();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Container
        disableGutters={true}
        maxWidth="xl"
        sx={{ height: "100vh", display: "flex", flexDirection: "column" }}
      >
        <Header />
        <Jocs
          obtenirJocs={obtenirTotsJocs(
            location.pathname.includes("online") ? "ONLINE" : "PHYSICAL"
          )}
        />
        <Footer />
      </Container>
    </Suspense>
  );
}

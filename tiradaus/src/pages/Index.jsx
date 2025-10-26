import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import styles from "./Index.module.css";
import Header from "../components/Header";
import { Footer } from "../components/Footer";
import CssBaseline from "@mui/material/CssBaseline";

export default function Index() {
  return (
    <>
      <CssBaseline />
      <Container
        disableGutters={true}
        maxWidth="xl"
        sx={{ height: "100vh", display: "flex", flexDirection: "column" }}
      >
        <Header />
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "background.main",
          }}
        >
          <Box
            sx={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              p: 5,
            }}
          >
            <Typography
              variant="h3"
              component="h1"
              sx={{ color: "#FFFFFF" }}
            >
              Troba gent i fes <span style={{ color: "#CACE50" }}>amics</span> a
              traves dels{" "}
              <span style={{ color: "#CACE50" }}>
                jocs de taula i videojocs
              </span>
            </Typography>
          </Box>
          <Box
            sx={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              p: 5,
            }}
          >
            <img
              src="/assets/images/home-illustration.png"
              alt="Home Illustration"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              p: 5,
            }}
          >
            <img
              src="/assets/images/home-illustration.png"
              alt="Home Illustration"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </Box>
          <Box
            sx={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              p: 5,
            }}
          >
            <Typography variant="body1" component="p" sx={{ mb: 2 }}>
              Que es tiradaus?
              <br />
              Tiradaus es el{" "}
              <span style={{ color: "#A0A0EE" }}>
                nou planificador per buscar i trobar gent
              </span>{" "}
              amb els mateixos gustos que tu en quan a videojocs i jocs de
              taula. Ja sigui una partida on-line d'algun viodejoc o una partida
              IRL, a Tiradaus les pot's buscar i organitzar tu la teva própia
              partida. No et quedis amb ganes de probar algún joc de taula o
              videojoc per no tenir amb qui compartir-ho.
            </Typography>
          </Box>
        </Box>
        <Footer />
      </Container>
    </>
  );
}

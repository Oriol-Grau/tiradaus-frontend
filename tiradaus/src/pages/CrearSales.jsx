import { useActionState, useState, startTransition, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import routes from "../routes/routes.json";
import Header from "../components/Header";
import { Footer } from "../components/Footer";
import CssBaseline from "@mui/material/CssBaseline";
import { crearSala } from "../services/sales";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { obtenirTotsJocs } from "../services/games";
import { SalaForm } from "../components/Salas/SalaForm";

export default function CrearSales() {
  const [jocs, setJocs] = useState([]);
  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    description: "",
    location: "",
    players: "",
    startDate: "",
    endDate: "",
    eventMode: "",
    game: "",
  });
  const navigate = useNavigate();

  const fetchJocs = async () => {
    try {
      const jocsObtinguts = await obtenirTotsJocs();
      setJocs(jocsObtinguts);
    } catch (error) {
      console.error("Error obtenint jocs:", error);
    }
  };

  useEffect(() => {
    fetchJocs();
  }, []);

  const [error, submitAction, isPending] = useActionState(
    async (_, salaState) => {
      try {
        const auth = await crearSala({ ...salaState });
        const url =
          salaState.eventMode === "ONLINE"
            ? routes.sales.online
            : routes.sales.presencials;
        navigate(url || "/");
      } catch (err) {
        return err.response?.data?.error;
      }
      return null;
    },
    null
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("eventName") || "").trim(),
      description: String(fd.get("eventDescription") || "").trim(),
      location: String(fd.get("eventLocation") || "").trim(),
      players: String(fd.get("eventPlayers") || "").trim(),
      startDate: moment.utc(fd.get("startDate")).toISOString(),
      endDate: moment.utc(fd.get("endDate") || "").toISOString(),
      eventMode: String(fd.get("eventMode") || "").trim(),
      game: String(fd.get("gameId") || "").trim(),
    };

    startTransition(() => {
      submitAction(payload);
    });
  };

  return (
    <>
      <CssBaseline />
      <Container
        disableGutters={true}
        maxWidth="xl"
        sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <Header />
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "background.main",
          }}
        >
          <form onSubmit={handleSubmit}>
            <SalaForm
              fieldErrors={fieldErrors}
              isPending={isPending}
              error={error}
              jocs={jocs}
            />
          </form>
        </Box>
        <Footer />
      </Container>
    </>
  );
}

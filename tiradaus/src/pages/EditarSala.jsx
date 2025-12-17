import { useState, startTransition, useEffect, useActionState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import routes from "../routes/routes.json";
import Header from "../components/Header";
import { Footer } from "../components/Footer";
import CssBaseline from "@mui/material/CssBaseline";
import { Box, Container } from "@mui/material";
import { obtenirTotsJocs } from "../services/games";
import { actualitzarSala, detallSala } from "../services/sales";
import moment from "moment";
import { SalaForm } from "../components/Salas/SalaForm";

export default function EditarSala() {
  const [jocs, setJocs] = useState([]);
  const [sala, setSala] = useState(null);
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
  const { id } = useParams();

  const fetchJocs = async () => {
    try {
      const jocsObtinguts = await obtenirTotsJocs();
      setJocs(jocsObtinguts);
    } catch (error) {
      console.error("Error obtenint jocs:", error);
    }
  };

  const fetchSala = async () => {
    try {
      const salaData = await detallSala(id);
      setSala(salaData);
    } catch (error) {
      console.error("Error obtenint sala:", error);
    }
  };

  useEffect(() => {
    if (sala === null) {
      fetchSala();
    }
    if (jocs.length === 0) {
      fetchJocs();
    }
  }, [id]);

  const [error, submitAction, isPending] = useActionState(
    async (_, salaState) => {
      try {
        const auth = await actualitzarSala({ ...salaState, id });
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
    console.log("FormData:", Array.from(fd.entries()));
    const payload = {
      name: String(fd.get("eventName") || "").trim(),
      description: String(fd.get("eventDescription") || "").trim(),
      location: String(fd.get("eventLocation") || "").trim(),
      players: String(fd.get("eventPlayers") || "").trim(),
      startDate: moment.utc(fd.get("startDate")).toISOString(),
      endDate: moment.utc(fd.get("endDate") || "").toISOString(),
      eventMode: String(fd.get("eventMode") || "").trim(),
      gameId: Number(fd.get("gameId") || 0),
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
            {sala && (
              <SalaForm
                sala={sala}
                fieldErrors={fieldErrors}
                isPending={isPending}
                error={error}
                jocs={jocs}
              />
            )}
          </form>
        </Box>
        <Footer />
      </Container>
    </>
  );
}

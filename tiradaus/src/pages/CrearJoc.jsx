import { useActionState, useState, startTransition } from "react";
import { useNavigate } from "react-router-dom";
import routes from "../routes/routes.json";
import Header from "../components/Header";
import { Footer } from "../components/Footer";
import CssBaseline from "@mui/material/CssBaseline";
import { crearJoc } from "../services/games";
import JocForm from "../components/Jocs/JocForm";
import {
  Box,
  Container,
} from "@mui/material";

export default function CrearJoc() {
  const [fieldErrors, setFieldErrors] = useState({
    title: "",
    description: "",
    platform: "",
    minAge: "",
    gameType: "",
    imageUrl: "",
  });
  const navigate = useNavigate();

  const [error, submitAction, isPending] = useActionState(
    async (_, jocsState) => {
      try {
        await crearJoc({ ...jocsState });
        const url =
          jocsState.gameType === "physical"
            ? routes.jocs.presencials
            : routes.jocs.online;
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
      title: String(fd.get("title") || "").trim(),
      description: String(fd.get("description") || "").trim(),
      platform: String(fd.get("platform") || "").trim(),
      minAge: String(fd.get("minAge") || "").trim(),
      gameType: String(fd.get("gameType") || "").trim(),
      imageUrl: String(fd.get("imageUrl") || "").trim(),
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
            overflowY: "auto",
          }}
        >
          <form onSubmit={handleSubmit}>
            <JocForm
              error={error}
              isPending={isPending}
              fieldErrors={fieldErrors}
            />
          </form>
        </Box>
        <Footer />
      </Container>
    </>
  );
}

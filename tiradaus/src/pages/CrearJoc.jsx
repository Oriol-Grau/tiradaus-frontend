import { useActionState, useState, startTransition } from "react";
import { useNavigate } from "react-router-dom";
import routes from "../routes/routes.json";
import Header from "../components/Header";
import { Footer } from "../components/Footer";
import NumField from "../components/base/NumField";
import RadioGroupForm from "../components/base/RadioGroup";
import CssBaseline from "@mui/material/CssBaseline";
import { crearJoc } from "../services/games";
import {
  Button,
  Alert,
  TextField,
  Box,
  Container,
  Typography,
} from "@mui/material";

export default function CrearJoc() {
  const [fieldErrors, setFieldErrors] = useState({
    title: "",
    description: "",
    platform: "",
    minAge: "",
    gameType: "",
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
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "flex-start",
                bgcolor: "#FFFFFF",
                minHeight: 450,
                minWidth: 400,
                padding: 2,
                margin: 2,
              }}
            >
              <Typography variant="h4" component="h4">
                Crear Joc
              </Typography>
              {error && (
                <Alert severity="error" sx={{ m: 1, width: "100%", p: 1 }}>
                  {error}
                </Alert>
              )}
              <TextField
                name="title"
                label="Títol"
                required
                fullWidth
                error={!!fieldErrors.title}
                helperText={fieldErrors.title}
                defaultValue=""
                size="small"
                margin="dense"
              />
              <TextField
                name="description"
                label="Descripció"
                multiline
                rows={3}
                required
                fullWidth
                error={!!fieldErrors.description}
                helperText={fieldErrors.description}
                defaultValue=""
                size="small"
                margin="dense"
              />
              <TextField
                name="platform"
                label="Plataforma"
                required
                fullWidth
                error={!!fieldErrors.platform}
                helperText={fieldErrors.platform}
                defaultValue=""
                size="small"
                margin="dense"
              />
              <NumField
                name="minAge"
                label="Edat mínima"
                size="small"
                required
                fullWidth
                margin="dense"
              />
              <RadioGroupForm
                label="Tria un tipus"
                name="gameType"
                options={[
                  { value: "physical", label: "Presencial" },
                  { value: "online", label: "Online" },
                ]}
                size="small"
                required
              />
              <Button
                type="submit"
                disabled={isPending}
                fullWidth
                variant="contained"
                color="buttonPrimary"
              >
                Crear
              </Button>
            </Box>
          </form>
        </Box>
        <Footer />
      </Container>
    </>
  );
}

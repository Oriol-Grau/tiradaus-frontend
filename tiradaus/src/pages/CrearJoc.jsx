import { useActionState, useState, startTransition } from "react";
import { useNavigate } from "react-router-dom";
import routes from "../routes/routes.json";
import Header from "../components/Header";
import { Footer } from "../components/Footer";
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
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const [error, submitAction, isPending] = useActionState(
    async (previousState, loginState) => {
      try {
        const auth = await crearJoc({ ...loginState, gameType: "online" });
        navigate(routes.jocs.llista || "/");
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
      username: String(fd.get("username") || "").trim(),
      password: String(fd.get("password") || ""),
      email: String(fd.get("email") || "").trim(),
      firstName: String(fd.get("firstname") || "").trim(),
      lastName: String(fd.get("lastname") || "").trim(),
    };

    // call submitAction inside a transition so isPending updates correctly
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
        sx={{ height: "100vh", display: "flex", flexDirection: "column" }}
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
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "center",
                bgcolor: "#FFFFFF",
                height: 450,
                width: 400,
                padding: 3,
                margin: 2,
              }}
            >
              <Typography variant="h4" component="h4">
                Crear Joc Online
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
                error={!!fieldErrors.username}
                helperText={fieldErrors.username}
                defaultValue=""
              />
              <TextField
                name="description"
                label="Descripció"
                multiline
                rows={4}
                required
                fullWidth
                error={!!fieldErrors.firstname}
                helperText={fieldErrors.firstname}
                defaultValue=""
              />
              <TextField
                name="platform"
                label="Plataforma"
                required
                fullWidth
                error={!!fieldErrors.lastname}
                helperText={fieldErrors.lastname}
                defaultValue=""
              />
              <TextField
                name="minAge"
                label="Edat mínima"
                required
                fullWidth
                error={!!fieldErrors.lastname}
                helperText={fieldErrors.lastname}
                defaultValue=""
              />
              <Button
                type="submit"
                disabled={isPending}
                fullWidth
                variant="contained"
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

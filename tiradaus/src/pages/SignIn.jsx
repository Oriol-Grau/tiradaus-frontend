import { useActionState, useState, startTransition } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import routes from "../routes/routes.json";
import Header from "../components/Header";
import { Footer } from "../components/Footer";
import CssBaseline from "@mui/material/CssBaseline";
import { signIn } from "../services/account";
import {
  Button,
  Alert,
  TextField,
  Box,
  Container,
  Typography,
} from "@mui/material";

export default function SignIn() {
  const [fieldErrors, setFieldErrors] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, submitAction, isPending] = useActionState(
    async (previousState, loginState) => {
      try {
        const auth = await signIn(loginState.username, loginState.password);
        dispatch({ type: "auth/setAuth", payload: auth });
        navigate(routes.home?.index || "/");
      } catch (err) {
        return "Nom d'usuari o contrasenya incorrecte.";
      }
      return null;
    },
    null
  );

  const validarCamps = (values) => {
    const next = { username: "", password: "" };
    if (!values.username) next.username = "El nom d'usuari és obligatori.";
    if (!values.password) next.password = "La contrasenya és obligatòria.";
    setFieldErrors(next);
    return !next.username && !next.password;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      username: String(fd.get("username") || "").trim(),
      password: String(fd.get("password") || ""),
    };

    if (!validarCamps(payload)) return;

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
          <Typography variant="h3" component="h3" sx={{ color: "#FFFFFF" }}>
            Entra a Tiradaus
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "center",
                bgcolor: "#FFFFFF",
                height: 350,
                width: 400,
                padding: 4,
              }}
            >
              {error && <Alert severity="error">{error}</Alert>}
              <TextField
                name="username"
                label="Nom d'usuari"
                required
                fullWidth
                error={!!fieldErrors.username}
                helperText={fieldErrors.username}
                defaultValue=""
              />
              <TextField
                name="password"
                label="Contrasenya"
                type="password"
                required
                fullWidth
                error={!!fieldErrors.password}
                helperText={fieldErrors.password}
                defaultValue=""
              />
              <Button type="submit" disabled={isPending}>
                Entra
              </Button>
            </Box>
          </form>
        </Box>
        <Footer />
      </Container>
    </>
  );
}

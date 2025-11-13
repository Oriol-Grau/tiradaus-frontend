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
import { validarCampsRequerits, validarEmail } from "../utils/validacions";

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
        setFieldErrors({ username: "", password: "" });
        return "Nom d'usuari o contrasenya incorrecte.";
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
    };

    // const { isValid, errors } = validarCampsRequerits(payload);

    // if (!isValid) {
    //   setFieldErrors(errors);
    //   return;
    // }

    startTransition(() => {
      submitAction(payload);
    });
  };

  const handleRegister = () => {
    navigate(routes.account.register);
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
          <Typography variant="h4" component="h4" sx={{ color: "#FFFFFF" }}>
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
              {error && (
                <Alert severity="error" sx={{ m: 1, width: "100%", p: 1 }}>
                  {error}
                </Alert>
              )}
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
              <Button
                type="submit"
                disabled={isPending}
                fullWidth
                variant="contained"
              >
                Entra
              </Button>
              <Button onClick={handleRegister} fullWidth variant="contained">
                Registra't
              </Button>
            </Box>
          </form>
        </Box>
        <Footer />
      </Container>
    </>
  );
}

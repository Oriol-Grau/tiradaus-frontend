import { useActionState, useState, startTransition } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuth } from "../store/authSlice";
import routes from "../routes/routes.json";
import Header from "../components/Header";
import { Footer } from "../components/Footer";
import CssBaseline from "@mui/material/CssBaseline";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { actualitzarUsusari, obtenirUsusari } from "../services/account";
import { validarEmail } from "../utils/validacions";
import {
  Button,
  Alert,
  TextField,
  Box,
  Container,
  Typography,
} from "@mui/material";

export default function Perfil() {
  const [usuari, setUsusari] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const { data } = useSelector(selectAuth);

  useState(() => {
    const fetchUser = async () => {
      try {
        const userData = await obtenirUsusari(data.id);
        setUsusari(userData);
      } catch (error) {
        console.error("Error obtenint usuari:", error);
      }
    };

    if (data?.id) {
      fetchUser();
    }
  }, [data.id]);

  const [error, submitAction, isPending] = useActionState(
    async (previousState, loginState) => {
      try {
        const auth = await actualitzarUsusari(loginState);
        navigate(routes.account.login || "/");
      } catch (err) {
        return err.response?.data?.error;
      }
      return null;
    },
    null
  );

  const validarCamps = (values) => {
    const next = { username: "", password: "" };
    if (!values.username) next.username = "El nom d'usuari és obligatori.";
    if (!values.password) next.password = "La contrasenya és obligatòria.";
    if (!values.email) next.email = "L'email és obligatori.";
    if (!values.firstName) next.firstName = "El nom és obligatori.";
    if (!values.lastName) next.lastName = "Els cognoms són obligatoris.";
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
      email: String(fd.get("email") || "").trim(),
      firstName: String(fd.get("firstname") || "").trim(),
      lastName: String(fd.get("lastname") || "").trim(),
    };

    if (!validarCamps(payload)) return;

    const emailValidation = validarEmail(payload.email);
    if (!emailValidation.isValid) {
      setFieldErrors({ email: emailValidation.error });
      return;
    }

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
                bgcolor: "background.forms",
                borderRadius: 2,
                minHeight: 450,
                width: 400,
                padding: 2,
                margin: 2,
                overflowY: "auto",
              }}
            >
              <Typography variant="h4" component="h4">
                Perfil
              </Typography>
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
                defaultValue={usuari?.username || ""}
                size="small"
                sx={{ marginBottom: 1 }}
              />
              <TextField
                name="firstname"
                label="Nom"
                required
                fullWidth
                error={!!fieldErrors.firstname}
                helperText={fieldErrors.firstname}
                defaultValue={usuari?.firstName || ""}
                size="small"
                sx={{ marginBottom: 1 }}
              />
              <TextField
                name="lastname"
                label="Cognoms"
                required
                fullWidth
                error={!!fieldErrors.lastname}
                helperText={fieldErrors.lastname}
                defaultValue={usuari?.lastName || ""}
                size="small"
                sx={{ marginBottom: 1 }}
              />
              <TextField
                name="email"
                label="email"
                type="email"
                required
                fullWidth
                error={!!fieldErrors.email}
                helperText={fieldErrors.email}
                defaultValue={usuari?.email || ""}
                size="small"
                sx={{ marginBottom: 1 }}
              />
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DateTimePicker
                  name="birthDate"
                  label="Data de naixement *"
                  disablePast={true}
                  required
                  sx={{ width: '100%', marginBottom: 1 }}
                  size="small"
                  margin="dense"
                  defaultValue={
                    usuari?.birthDate ? moment.utc(usuari?.birthDate) : null
                  }
                />
              </LocalizationProvider>
              {/* <TextField
                name="password"
                label="Contrasenya"
                type="password"
                required
                fullWidth
                error={!!fieldErrors.password}
                helperText={fieldErrors.password}
                defaultValue={}
                size="small"
              /> */}
              <Button
                type="submit"
                disabled={isPending}
                fullWidth
                variant="contained"
                color="buttonPrimary"
              >
                Enviar
              </Button>
            </Box>
          </form>
        </Box>
        <Footer />
      </Container>
    </>
  );
}

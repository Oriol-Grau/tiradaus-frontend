import { useActionState, useState, startTransition } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAuth, updateUserName } from "../store/authSlice";
import Header from "../components/Header";
import { Footer } from "../components/Footer";
import CssBaseline from "@mui/material/CssBaseline";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CheckIcon from "@mui/icons-material/Check";
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
  const [message, setMessage] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const { data } = useSelector(selectAuth);

  const fetchUser = async () => {
    try {
      const userData = await obtenirUsusari(data.userId);
      setUsusari(userData);
    } catch (error) {
      console.error("Error obtenint usuari:", error);
    }
  };

  useState(() => {
    if (data?.userId) {
      fetchUser();
    }
  }, [data?.userId]);

  const [error, submitAction, isPending] = useActionState(
    async (_, userState) => {
      try {
        console.log("userState", userState);
        const auth = await actualitzarUsusari({
          userId: data?.userId,
          ...userState,
        });
        dispatch(updateUserName(auth.userName));
        setMessage(true);
      } catch (err) {
        return err.response?.data?.error;
      }
      return null;
    },
    null
  );

  const validarCamps = (values) => {
    const next = { userName: "", email: "" };
    if (!values.userName) next.userName = "El nom d'usuari és obligatori.";
    if (!values.email) next.email = "L'email és obligatori.";
    if (!values.firstName) next.firstName = "El nom és obligatori.";
    if (!values.lastName) next.lastName = "Els cognoms són obligatoris.";
    setFieldErrors(next);
    return !next.userName && !next.email;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      userName: String(fd.get("userName") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      firstName: String(fd.get("firstname") || "").trim(),
      lastName: String(fd.get("lastname") || "").trim(),
      birthDate: fd.get("birthDate")
        ? moment(fd.get("birthDate")).toDate()
        : null,
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
              {message && (
                <Alert
                  icon={<CheckIcon fontSize="inherit" />}
                  severity="success"
                >
                  Dades actualitzades correctament.
                </Alert>
              )}
              {usuari && (
                <>
                  <TextField
                    name="userName"
                    label="Nom d'usuari"
                    required
                    fullWidth
                    error={!!fieldErrors.username}
                    helperText={fieldErrors.username}
                    defaultValue={usuari?.userName || ""}
                    size="small"
                    sx={{ marginBottom: 1 }}
                    autoFocus={true}
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
                    <DatePicker
                      name="birthDate"
                      label="Data de naixement *"
                      disableFuture={true}
                      required
                      sx={{ width: "100%", marginBottom: 1 }}
                      slotProps={{
                        textField: { size: "small", margin: "dense" },
                      }}
                      defaultValue={
                        usuari?.birthDate
                          ? moment.utc(usuari?.birthDate)
                          : moment.utc(usuari?.birthDate)
                      }
                    />
                  </LocalizationProvider>
                </>
              )}
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

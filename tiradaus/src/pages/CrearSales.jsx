import { useActionState, useState, startTransition, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import moment from "moment";
import NumField from "../components/base/NumField";
import routes from "../routes/routes.json";
import Header from "../components/Header";
import { Footer } from "../components/Footer";
import CssBaseline from "@mui/material/CssBaseline";
import { crearSala } from "../services/sales";
import {
  Button,
  Alert,
  TextField,
  Box,
  Container,
  Typography,
  Grid,
} from "@mui/material";
import RadioGroupForm from "../components/base/RadioGroup";
import DropDown from "../components/base/DropDown";
import { obtenirTotsJocs } from "../services/games";

export default function CrearSales() {
  const [jocs, setJocs] = useState([]);
  const [fieldErrors, setFieldErrors] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const fetchJocs = async () => {
    const jocsObtinguts = await obtenirTotsJocs();
    // esOnline ? "ONLINE" : "PHYSICAL"
    setJocs(jocsObtinguts);
  };

  useEffect(() => {
    if (jocs.length === 0) {
      fetchJocs();
    }
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
      name: String(fd.get("name") || "").trim(),
      description: String(fd.get("description") || "").trim(),
      location: String(fd.get("location") || "").trim(),
      players: String(fd.get("players") || "").trim(),
      startDate: moment.utc(fd.get("startDate")).toISOString(),
      endDate: moment.utc(fd.get("endDate") || "").toISOString(),
      eventMode: String(fd.get("eventMode") || "").trim(),
      game: String(fd.get("game") || "").trim(),
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
            <Grid
              container
              spacing={0}
              justifyContent="center"
              alignItems="center"
              sx={{
                justifyContent: "space-around",
                alignItems: "center",
                bgcolor: "background.forms",
                borderRadius: 2,
                maxWidth: 730,
                padding: 1,
                margin: 2,
              }}
            >
              <Grid
                size={12}
                sx={{
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="h4"
                  component="h4"
                  sw={{ width: "100%", textAlign: "center" }}
                >
                  Crear Sala
                </Typography>
                {error && (
                  <Alert severity="error" sx={{ m: 1, width: "100%", p: 1 }}>
                    {error}
                  </Alert>
                )}
              </Grid>
              <Grid
                size={6}
                sx={{
                  justifyContent: "space-around",
                  alignItems: "center",
                  padding: 2,
                }}
              >
                <TextField
                  name="name"
                  label="Nom"
                  required
                  fullWidth
                  error={!!fieldErrors.username}
                  helperText={fieldErrors.username}
                  defaultValue=""
                  size="small"
                  margin="dense"
                  sx={{ marginTop: 0 }}
                />
                <TextField
                  name="description"
                  label="Descripció"
                  multiline
                  rows={3}
                  required
                  fullWidth
                  error={!!fieldErrors.firstname}
                  helperText={fieldErrors.firstname}
                  defaultValue=""
                  size="small"
                  margin="dense"
                />
                <TextField
                  name="location"
                  label="Localització"
                  required
                  fullWidth
                  error={!!fieldErrors.lastname}
                  helperText={fieldErrors.lastname}
                  defaultValue=""
                  size="small"
                  margin="dense"
                />
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DateTimePicker
                    name="startDate"
                    label="Data d'inici"
                    disablePast={true}
                    required
                    sx={{ marginTop: 1, marginBottom: 1 }}
                    size="small"
                    margin="dense"
                  />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DateTimePicker
                    name="endDate"
                    label="Data de finalització"
                    disablePast={true}
                    required
                    size="small"
                    margin="dense"
                  />
                </LocalizationProvider>
              </Grid>
              <Grid
                size={6}
                sx={{
                  justifyContent: "space-around",
                  alignSelf: "baseline",
                  padding: 2,
                }}
              >
                <NumField
                  name="players"
                  label="Participants"
                  required
                  fullWidth
                  size="small"
                  margin="dense"
                />
                <RadioGroupForm
                  label="Tria un tipus"
                  name="eventMode"
                  options={[
                    { value: "REAL_LIFE", label: "Cartes" },
                    { value: "ONLINE", label: "Videojocs" },
                  ]}
                  size="small"
                  margin="dense"
                />
                <DropDown
                  label="Tria un joc"
                  name="game"
                  options={jocs}
                  fullWidth
                  size="small"
                  margin="dense"
                />
              </Grid>
              <Button
                type="submit"
                disabled={isPending}
                fullWidth
                variant="contained"
                color="buttonPrimary"
              >
                Crear
              </Button>
            </Grid>
          </form>
        </Box>
        <Footer />
      </Container>
    </>
  );
}

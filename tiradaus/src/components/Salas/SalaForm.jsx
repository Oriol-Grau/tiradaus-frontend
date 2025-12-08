import { Alert, Box, Button, TextField, Typography, Grid } from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import NumField from "../base/NumField";
import RadioGroupForm from "../base/RadioGroupForm";
import DropDown from "../base/DropDown";
import moment from "moment";

export function SalaForm({ sala, fieldErrors, isPending, error, jocs = [] }) {
  const {
    name,
    description,
    location,
    players,
    startDate,
    endDate,
    eventMode,
    gameId = "",
  } = sala || {};
  const onCancel = () => {
    window.history.back();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "flex-start",
        bgcolor: "background.forms",
        borderRadius: 2,
        minHeight: 450,
        minWidth: 400,
        padding: 2,
        margin: 2,
      }}
    >
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
            {sala ? "Editar sala" : "Crear sala"}
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
            error={!!fieldErrors.name}
            helperText={fieldErrors.name}
            defaultValue={name || ""}
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
            error={!!fieldErrors.description}
            helperText={fieldErrors.description}
            defaultValue={description || ""}
            size="small"
            margin="dense"
          />
          <TextField
            name="location"
            label="Localització"
            required
            fullWidth
            error={!!fieldErrors.location}
            helperText={fieldErrors.location}
            defaultValue={location || ""}
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
              defaultValue={startDate ? moment.utc(startDate) : null}
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
              defaultValue={endDate ? moment.utc(endDate) : null}
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
            error={!!fieldErrors.players}
            helperText={fieldErrors.players}
            value={players || ""}
          />
          <RadioGroupForm
            label="Tria un tipus"
            name="eventMode"
            options={[
              { value: "REAL_LIFE", label: "Presencials" },
              { value: "ONLINE", label: "Online" },
            ]}
            size="small"
            margin="dense"
            required
            defaultValue={eventMode || ""}
          />
          <DropDown
            label="Tria un joc"
            name="game"
            options={jocs}
            fullWidth
            size="small"
            margin="dense"
            required
            value={gameId || ""}
          />
        </Grid>
        <Button
          disabled={isPending}
          variant="contained"
          color="buttonSecondary"
          onClick={onCancel}
        >
          Cancel·lar
        </Button>
        <Button
          type="submit"
          disabled={isPending}
          variant="contained"
          color="buttonPrimary"
        >
          Guardar
        </Button>
      </Grid>
    </Box>
  );
}

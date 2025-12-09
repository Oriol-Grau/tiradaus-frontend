import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import NumField from "../base/NumField";
import RadioGroupForm from "../base/RadioGroupForm";

export default function JocForm({ joc, error, isPending, fieldErrors }) {
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
      <Typography variant="h4" component="h4">
        {joc ? "Editar Joc" : "Crear Joc"}
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
        defaultValue={joc?.title || ""}
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
        defaultValue={joc?.description || ""}
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
        defaultValue={joc?.platform || ""}
        size="small"
        margin="dense"
      />
      <TextField
        name="imageUrl"
        label="Enllaç imatge"
        required
        fullWidth
        error={!!fieldErrors.imageUrl}
        helperText={fieldErrors.imageUrl}
        defaultValue={joc?.imageUrl || ""}
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
        defaultValue={joc?.minAge}
      />
      <RadioGroupForm
        label="Tria un tipus"
        name="gameType"
        options={[
          { value: "PHYSICAL", label: "Jocs de cartes" },
          { value: "ONLINE", label: "Videojocs" },
        ]}
        size="small"
        required
        defaultValue={joc?.gameType}
      />
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "10px",
          flex: 1,
          justifyContent: "space-between",
        }}
      >
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
      </div>
    </Box>
  );
}

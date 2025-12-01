import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
  DialogActions,
} from "@mui/material";

export default function Confirmacio({
  obrir,
  missatge,
  onConfirmar,
  onCancelar,
  ...other
}) {
  return (
    <Dialog
      sx={{
        "& .MuiDialog-paper": { width: "80%", maxHeight: 435 },
      }}
      maxWidth="xs"
      open={obrir}
      {...other}
    >
      <DialogTitle sx={{ bgcolor: "background.header" }}>
        <Typography variant="h4" gutterBottom sx={{ margin: 0}}>
          Confirmació
        </Typography>
      </DialogTitle>
      <DialogContent
        dividers
        sx={{ backgroundColor: "background.main", minHeight: 150 }}
      >
        <Typography gutterBottom variant="body1">
          {missatge}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ bgcolor: "background.footer" }}>
        <Button
          autoFocus
          onClick={onCancelar}
          color="buttonSecondary"
          variant="contained"
        >
          Cancel·lar
        </Button>
        <Button onClick={onConfirmar} color="buttonPrimary" variant="contained">
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

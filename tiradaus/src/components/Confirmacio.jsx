import { Dialog, DialogTitle, DialogContent, Typography, Button, DialogActions } from "@mui/material";

export default function Confirmacio({ obrir, missatge, onConfirmar, onCancelar, ...other }) {
  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
      maxWidth="xs"
      open={obrir}
      {...other}
    >
      <DialogTitle>Confirmació</DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom>{missatge}</Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onCancelar}>
          Cancel·lar
        </Button>
        <Button onClick={onConfirmar}>Confirmar</Button>
      </DialogActions>
    </Dialog>
  );
}

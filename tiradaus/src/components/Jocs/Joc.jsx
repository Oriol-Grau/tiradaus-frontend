import { use } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Button,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import { useSelector } from "react-redux";
import Confirmacio from "../Confirmacio";
import { isAdmin } from "../../store/authSlice";
import { esborrarJoc } from "../../services/games";
import routes from "../../routes/routes.json";

export default function Joc({ jocPromise }) {
  const joc = use(jocPromise);
  const [obrir, setObrir] = useState(false);
  const admin = useSelector(isAdmin);
  const navigate = useNavigate();
  const {
    id,
    title,
    description,
    minAge,
    platform,
    imageUrl = "/src/assets/zelda.jpg",
  } = joc;

  const tornarClick = () => {
    navigate(-1);
  };

  const onEsborrar = () => {
    setObrir(true);
  };

  const onDeleteGame = async () => {
    try {
      await esborrarJoc(id);
    } catch (error) {
      console.log("Error deleting game:", error);
    }
  };

  const onConfirmar = async () => {
    setObrir(false);
    await onDeleteGame();
    navigate(-1);
  };

  const onCancelar = () => {
    setObrir(false);
  };

  const onEditar = () => {
    navigate(routes.jocs.editar.replace(":id", id));
  };

  return (
    <>
      <Card sx={{ width: 700, m: 2, bgcolor: "background.forms" }}>
        <CardActions>
          <Button
            onClick={tornarClick}
            color="buttonPrimary"
            variant="contained"
            sx={{ alignSelf: "flex-start", m: 1 }}
            startIcon={<ArrowBackIcon />}
          >
            Tornar
          </Button>
          {admin && (
            <>
              <Button
                color="buttonSecondary"
                variant="contained"
                startIcon={<EditIcon />}
                onClick={onEditar}
              >
                Editar
              </Button>
              <Button
                color="error"
                variant="contained"
                startIcon={<DeleteIcon />}
                onClick={onEsborrar}
              >
                Esborrar
              </Button>
            </>
          )}
        </CardActions>
        <Grid container spacing={2} sx={{ flexWrap: "nowrap" }}>
          <Grid sx={{ flex: 1, xs: 12, md: imageUrl ? 8 : 12 }}>
            <CardContent>
              <Typography variant="h3" gutterBottom>
                {title}
              </Typography>

              {description && (
                <Typography variant="body1" paragraph>
                  {description}
                </Typography>
              )}

              {platform && (
                <Typography variant="body2">Plataforma: {platform}</Typography>
              )}
              {minAge && (
                <Typography variant="body2">Edat mínima: {minAge}+</Typography>
              )}
            </CardContent>
          </Grid>
          {imageUrl && (
            <Grid sx={{ xs: 12, md: 4 }}>
              <CardMedia
                component="img"
                image={imageUrl}
                alt={title}
                sx={{
                  maxHeight: 360,
                  maxWidth: 300,
                  objectFit: "contain",
                  p: 1,
                }}
              />
            </Grid>
          )}
        </Grid>
      </Card>
      <Confirmacio
        obrir={obrir}
        missatge="Estàs segur que vols continuar?"
        onConfirmar={onConfirmar}
        onCancelar={onCancelar}
      />
    </>
  );
}

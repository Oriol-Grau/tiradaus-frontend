import { use, useState } from "react";
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
import moment from "moment";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";
import Confirmacio from "../Confirmacio";
import { selectAuth } from "../../store/authSlice";
import { esborrarSala } from "../../services/sales";
import EditIcon from "@mui/icons-material/Edit";
import routes from "../../routes/routes.json";

export default function Sala({ salaPromise }) {
  const [obrir, setObrir] = useState(false);
  const { data } = useSelector(selectAuth);
  const sala = use(salaPromise);
  const navigate = useNavigate();
  const {
    id,
    name,
    description,
    players,
    startDate,
    endDate,
    location,
    imatge = "/src/assets/zelda.jpg",
    eventMode,
  } = sala;

  const tornarClick = () => {
    navigate(-1);
  };

  const onDeleteSala = async () => {
    try {
      await esborrarSala(id);
    } catch (error) {
      console.log("Error esborrant sala:", error);
    }
  };

  const onConfirmar = async () => {
    setObrir(false);
    await onDeleteSala();
    navigate(-1);
  };

  const onCancelar = () => {
    setObrir(false);
  };

  const onEsborrar = () => {
    setObrir(true);
  };

  const onEditar = () => {
    navigate(routes.sales.editar.replace(":id", id));
  };

  return (
    <>
      <Card
        id={id}
        sx={{ width: 700, m: 2, backgroundColor: "background.forms" }}
      >
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
          {data?.roleId === 1 && (
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
          <Grid sx={{ flex: 1 }} xs={12} md={imatge ? 8 : 12}>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                {name}
              </Typography>

              {description && (
                <Typography variant="body1">{description}</Typography>
              )}

              {location && (
                <Typography variant="body2">
                  Localització: {location}
                </Typography>
              )}
              {startDate && (
                <Typography variant="body2">
                  Data: {moment(startDate).format("DD/MM/YYYY HH:mm")} -{" "}
                  {moment(endDate).format("DD/MM/YYYY HH:mm")}
                </Typography>
              )}
              {players && (
                <Typography variant="body2">Jugadors: {players}</Typography>
              )}

              {eventMode && (
                <Typography variant="body2">
                  Tipus de sala: {eventMode === "REAL_LIFE" ? "presencials" : "online"}
                </Typography>
              )}
            </CardContent>
          </Grid>
          {imatge && (
            <Grid item xs={12} md={4}>
              <CardMedia
                component="img"
                image={imatge}
                alt={name}
                sx={{ maxHeight: 360, objectFit: "contain", p: 1 }}
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

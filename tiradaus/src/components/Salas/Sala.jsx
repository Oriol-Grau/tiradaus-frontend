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
import moment from "moment";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function Sala({ salaPromise }) {
  const sala = use(salaPromise);
  const navigate = useNavigate();
  const {
    name,
    description,
    players,
    startDate,
    endDate,
    location,
    imatge = "/src/assets/zelda.jpg",
  } = sala;

  const tornarClick = () => {
    navigate(-1);
  };

  return (
    <Card sx={{ width: 700, m: 2, backgroundColor: "#DDDDF0" }}>
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
      </CardActions>
      <Grid container spacing={2} sx={{ flexWrap: "nowrap" }}>
        <Grid item xs={12} md={imatge ? 8 : 12}>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              {name}
            </Typography>

            {description && (
              <Typography variant="body1" paragraph>
                {description}
              </Typography>
            )}

            {location && (
              <Typography variant="body2">Localització: {location}</Typography>
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
  );
}

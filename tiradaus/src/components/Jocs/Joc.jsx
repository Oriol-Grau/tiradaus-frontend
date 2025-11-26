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

export default function Joc({ jocPromise }) {
  const joc = use(jocPromise);
  const navigate = useNavigate();
  const {
    title,
    description,
    minAge,
    platform,
    imatge = "/src/assets/zelda.jpg",
  } = joc;

  const tornarClick = () => {
    navigate(-1);
  };

  return (
    <Card sx={{ width: 700, m: 2 }}>
      <CardActions>
        <Button
          onClick={tornarClick}
          color="buttonSecondary"
          variant="contained"
          sx={{ alignSelf: "flex-start", m: 1 }}
          startIcon={<ArrowBackIcon />}
        >
          Tornar
        </Button>
      </CardActions>
      <Grid container spacing={2} sx={{ flexWrap: 'nowrap' }}>
        <Grid item xs={12} md={imatge ? 8 : 12}>
          <CardContent>
            <Typography variant="h4" gutterBottom>
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
        {imatge && (
          <Grid item xs={12} md={4}>
            <CardMedia
              component="img"
              image={imatge}
              alt={title}
              sx={{ maxHeight: 360, objectFit: "contain", p: 1 }}
            />
          </Grid>
        )}
      </Grid>
    </Card>
  );
}

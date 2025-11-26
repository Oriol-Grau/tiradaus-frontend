import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import DeleteIcon from "@mui/icons-material/Delete";
import { Container, Grid, Paper, CardMedia, Typography } from "@mui/material";
import Confirmacio from "../Confirmacio";
import { selectAuth } from "../../store/authSlice";
import { obtenirTotsJocs, esborrarJoc } from "../../services/games";

export default function Jocs() {
  const location = useLocation();
  const navigate = useNavigate();
  const esOnline = location.pathname.includes("online");
  const [jocs, setJocs] = useState([]);
  const [obrir, setObrir] = useState(false);
  const [jocId, setJocId] = useState(null);
  const { data } = useSelector(selectAuth);

  const fetchJocs = async () => {
    const jocsObtinguts = await obtenirTotsJocs(
      esOnline ? "ONLINE" : "PHYSICAL"
    );
    setJocs(jocsObtinguts);
  };

  const onDeleteGame = async (jocId) => {
    try {
      await esborrarJoc(jocId);
      await fetchJocs();
    } catch (error) {
      console.log("Error deleting game:", error);
    }
  };

  useEffect(() => {
    fetchJocs();
  }, [esOnline]);

  const onConfirmar = async () => {
    setObrir(false);
    setJocId(null);
    onDeleteGame(jocId);
  };

  const onCancelar = () => {
    setObrir(false);
    setJocId(null);
  };

  const onEsborrar = (id) => {
    setJocId(id);
    setObrir(true);
  };

  const detallClick = (id) => {
    navigate(`/jocs/${id}`);
  };
  return (
    <Container
      disableGutters={true}
      maxWidth="xl"
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "background.main",
        overflowY: "auto",
      }}
    >
      <Typography variant="h3" gutterBottom sx={{ m: 1, color: 'white' }}>
        Llista de {esOnline ? "Videojocs" : "Jocs de taula"}
      </Typography>
      <List>
        {jocs?.map(
          ({
            id,
            title,
            description,
            platform,
            minAge,
            imatge = "/src/assets/zelda.jpg",
          }) => (
            <ListItem
              alignItems="flex-start"
              key={id}
              onClick={detallClick.bind(null, id)}
              sx={{ cursor: "pointer" }}
              secondaryAction={
                data?.roleId === 1 && (
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => onEsborrar(id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                )
              }
            >
              <Paper sx={{ width: 700, p: 2 }}>
                <Grid container spacing={2} sx={{ flexWrap: "nowrap" }}>
                  <Grid item xs={12} md={imatge ? 8 : 12}>
                    <Typography variant="h5" gutterBottom>
                      {title}
                    </Typography>

                    {description && (
                      <Typography variant="body1" paragraph>
                        {description}
                      </Typography>
                    )}

                    {platform && (
                      <Typography variant="body2">
                        Plataforma: {platform}
                      </Typography>
                    )}
                    {minAge && (
                      <Typography variant="body2">
                        Edat mínima: {minAge}+
                      </Typography>
                    )}
                  </Grid>
                  {imatge && (
                    <Grid item xs={12} md={4}>
                      <CardMedia
                        component="img"
                        image={imatge}
                        alt={title}
                        sx={{ maxHeight: 130, objectFit: "contain", p: 1 }}
                      />
                    </Grid>
                  )}
                </Grid>
              </Paper>
              {/* <ListItemText primary={title} secondary={description} /> */}
            </ListItem>
          )
        )}
      </List>
      <Confirmacio
        obrir={obrir}
        missatge="Estàs segur que vols continuar?"
        onConfirmar={onConfirmar}
        onCancelar={onCancelar}
      />
    </Container>
  );
}

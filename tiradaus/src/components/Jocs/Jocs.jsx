import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Container, Grid, Paper, CardMedia, Typography } from "@mui/material";
import { obtenirTotsJocs } from "../../services/games";

export default function Jocs() {
  const location = useLocation();
  const navigate = useNavigate();
  const esOnline = location.pathname.includes("online");
  const [jocs, setJocs] = useState([]);

  const fetchJocs = async () => {
    const jocsObtinguts = await obtenirTotsJocs(
      esOnline ? "ONLINE" : "PHYSICAL"
    );
    setJocs(jocsObtinguts);
  };

  useEffect(() => {
    fetchJocs();
  }, [esOnline]);

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
      <Typography variant="h3" gutterBottom sx={{ m: 1, color: "white" }}>
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
            imageUrl = "/src/assets/zelda.jpg",
          }) => (
            <ListItem
              alignItems="flex-start"
              key={id}
              onClick={detallClick.bind(null, id)}
              sx={{ cursor: "pointer" }}
            >
              <Paper sx={{ width: 700, p: 2, bgcolor: "background.forms" }}>
                <Grid container spacing={2} sx={{ flexWrap: "nowrap" }}>
                  <Grid sx={{ flex: "1", xs: 12, md: imageUrl ? 8 : 12 }}>
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
                  {imageUrl && (
                    <Grid>
                      <CardMedia
                        component="img"
                        image={imageUrl}
                        alt={title}
                        sx={{ maxHeight: 210, objectFit: "contain", p: 1, xs:12, md: 4 }}
                      />
                    </Grid>
                  )}
                </Grid>
              </Paper>
            </ListItem>
          )
        )}
      </List>
    </Container>
  );
}

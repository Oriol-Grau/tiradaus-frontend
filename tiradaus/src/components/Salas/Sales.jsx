import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import DeleteIcon from "@mui/icons-material/Delete";
import { Container, Grid, Paper, Typography } from "@mui/material";
import Confirmacio from "../Confirmacio";
import { selectAuth } from "../../store/authSlice";
import { obtenirSales } from "../../services/sales";
import { esborrarSala } from "../../services/sales";

export default function Sales() {
  const location = useLocation();
  const navigate = useNavigate();
  const esReal = location.pathname.includes("cartes");
  const [sales, setSales] = useState([]);
  const [obrir, setObrir] = useState(false);
  const [salaId, setSalaId] = useState(null);
  const { data } = useSelector(selectAuth);

  const fetchSales = async () => {
    const sales = await obtenirSales(esReal ? "REAL_LIFE" : "ONLINE");
    setSales(sales);
  };

  const onDeleteSala = async (salaId) => {
    try {
      await esborrarSala(salaId);
      await fetchSales();
    } catch (error) {
      console.log("Error esborrant sala:", error);
    }
  };

  useEffect(() => {
    fetchSales();
  }, [esReal]);

  const onConfirmar = async () => {
    setObrir(false);
    setSalaId(null);
    await onDeleteSala(salaId);
  };

  const onCancelar = () => {
    setObrir(false);
    setSalaId(null);
  };

  const onEsborrar = (id) => {
    setSalaId(id);
    setObrir(true);
  };

  const detallClick = (id) => {
    navigate(`/sales/${id}`);
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
        Llista de sales {esReal ? "presencials" : "online"}
      </Typography>
      <List>
        {sales?.map(
          ({
            id,
            name,
            description,
            players,
            location,
            startDate,
            endDate,
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
              <Paper sx={{ width: 700, p: 2, backgroundColor: "#DDDDF0" }}>
                <Grid container spacing={2} sx={{ flexWrap: "nowrap" }}>
                  <Grid item xs={12} md={12} sx={{ flex: "1" }}>
                    <Typography variant="h5" gutterBottom>
                      {name}
                    </Typography>

                    {description && (
                      <Typography variant="body1" paragraph>
                        {description}
                      </Typography>
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
                      <Typography variant="body2">
                        Jugadors: {players}
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </Paper>
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

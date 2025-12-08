import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Container, Grid, Paper, Typography } from "@mui/material";
import { obtenirSales } from "../../services/sales";

export default function Sales() {
  const location = useLocation();
  const navigate = useNavigate();
  const esReal = location.pathname.includes("cartes");
  const [sales, setSales] = useState([]);

  const fetchSales = async () => {
    try {
      const sales = await obtenirSales(esReal ? "REAL_LIFE" : "ONLINE");
      setSales(sales);
    } catch (error) {
      console.error("Error obtenint sales:", error);
    }
  };

  useEffect(() => {
    fetchSales();
  }, [esReal]);

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
            >
              <Paper sx={{ width: 700, p: 2, bgcolor: "background.forms" }}>
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
    </Container>
  );
}

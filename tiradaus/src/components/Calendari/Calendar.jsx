import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { obtenirSales } from "../../services/sales";
import moment from "moment";
import { dies, mesos } from "../../constants/app";

export default function Calendar() {
  const navigate = useNavigate();
  const [sales, setSales] = useState([]);

  const fetchSales = async () => {
    try {
      const sales = await obtenirSales();
      // Agrupem les sales per mes i any
      const calendari = sales.reduce((acc, sala) => {
        const clau = moment(sala.startDate).format("YYYY-MM");
        const index = new Date(sala.startDate).getMonth();
        const any = new Date(sala.startDate).getFullYear();
        const mes = `${mesos[index]} ${any}`;

        if (!acc[clau]) {
          acc[clau] = { mes, sales: [] };
        }
        acc[clau].sales.push(sala);
        return acc;
      }, {});

      const ordenat = Object.keys(calendari)
        .sort()
        .map((clau) => ({ clau, ...calendari[clau] }));

      setSales(ordenat);
    } catch (error) {
      console.error("Error obtenint sales:", error);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

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
        Calendari
      </Typography>
      <Paper sx={{ width: 700, p: 2, bgcolor: "background.forms" }}>
        {sales.map((clau) => (
          <>
            <Typography
              variant="h5"
              sx={{
                pb: 1,
                borderBottom: "1px solid",
                borderColor: "divider",
              }}
            >
              {clau.mes}
            </Typography>
            <List sx={{ width: "100%" }}>
              {clau.sales.map(({ id, name, startDate }) => (
                <ListItem
                  alignItems="flex-start"
                  key={id}
                  onClick={detallClick.bind(null, id)}
                  sx={{ cursor: "pointer" }}
                >
                  {startDate && (
                    <Typography variant="body1">
                      {dies[new Date(startDate).getDay()]},{" "}
                      {moment(startDate).format("DD")} -{" "}
                      {moment(startDate).format("HH:mm")}: {name}
                    </Typography>
                  )}
                </ListItem>
              ))}
            </List>
          </>
        ))}
      </Paper>
    </Container>
  );
}

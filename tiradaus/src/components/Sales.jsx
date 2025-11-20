import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@mui/icons-material/Delete";
import Divider from "@mui/material/Divider";
import { Container } from "@mui/material";
import Confirmacio from "../components/Confirmacio";
import { selectAuth } from "../store/authSlice";
import { obtenirSales } from "../services/sales";
import { esborrarSala } from "../services/sales";

export default function Sales() {
  const location = useLocation();
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
      <List sx={{bgcolor:'white'}}>
        {sales?.map(({ id, name, description }) => (
          <>
            <ListItem
              alignItems="flex-start"
              key={id}
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
              <ListItemText primary={name} secondary={description} />
            </ListItem>
            <Divider variant="inset" component="li" />
          </>
        ))}
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

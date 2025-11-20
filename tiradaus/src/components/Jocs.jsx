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
import { obtenirTotsJocs } from "../services/games";
import { esborrarJoc } from "../services/games";

export default function Jocs() {
  const location = useLocation();
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
        {jocs?.map(({ id, title, description }) => (
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
              <ListItemText primary={title} secondary={description} />
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

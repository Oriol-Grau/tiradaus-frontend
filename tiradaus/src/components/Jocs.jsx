import { use, useState } from "react";
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
import { esborrarJoc } from "../services/games";

export default function Jocs({ obtenirJocs }) {
  const [obrir, setObrir] = useState(false);
  const [jocId, setJocId] = useState(null);
  const jocs = use(obtenirJocs);
  const { data } = useSelector(selectAuth);

  const onConfirmar = () => {
    setObrir(false);
    esborrarJoc(jocId);
  };

  const onCancelar = () => {
    setObrir(false);
  };

  const onEsborrar = (id) => {
    setJocId(id);
    setObrir(true);
  };

  return (
    <Container
      disableGutters={true}
      maxWidth="xl"
      sx={{ height: "100vh", display: "flex", flexDirection: "column" }}
    >
      <List>
        {jocs.map(({ id, title, description }) => (
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

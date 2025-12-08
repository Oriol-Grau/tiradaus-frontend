import { useState, startTransition, useEffect, useActionState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import routes from "../routes/routes.json";
import Header from "../components/Header";
import { Footer } from "../components/Footer";
import CssBaseline from "@mui/material/CssBaseline";
import { actualitzarJoc, detallJoc } from "../services/games";
import { Box, Container } from "@mui/material";
import JocForm from "../components/Jocs/JocForm";

export default function EditarJoc() {
  const [fieldErrors, setFieldErrors] = useState({
    title: "",
    description: "",
    platform: "",
    minAge: "",
    gameType: "",
    imageUrl: "",
  });
  const [joc, setJoc] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchJoc = async () => {
      try {
        const jocData = await detallJoc(id);
        setJoc(jocData);
      } catch (error) {
        console.error("Error obtenint joc:", error);
      }
    };

    if (joc === null) {
      fetchJoc();
    }

  }, [id]);

  const [error, submitAction, isPending] = useActionState(
    async (_, jocsState) => {
      try {
        await actualitzarJoc({ ...jocsState, id });
        const url =
          jocsState.gameType === "physical"
            ? routes.jocs.presencials
            : routes.jocs.online;
        navigate(url || "/");
      } catch (err) {
        return err.response?.data?.error;
      }
      return null;
    },
    null
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      title: String(fd.get("title") || "").trim(),
      description: String(fd.get("description") || "").trim(),
      platform: String(fd.get("platform") || "").trim(),
      minAge: String(fd.get("minAge") || "").trim(),
      gameType: String(fd.get("gameType") || "").trim(),
      imageUrl: String(fd.get("imageUrl") || "").trim(),
    };

    startTransition(() => {
      submitAction(payload);
    });
  };

  return (
    <>
      <CssBaseline />
      <Container
        disableGutters={true}
        maxWidth="xl"
        sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <Header />
        <Box
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
          <form onSubmit={handleSubmit}>
            {joc && (
              <JocForm
                joc={joc}
                error={error}
                isPending={isPending}
                fieldErrors={fieldErrors}
              />
            )}
          </form>
        </Box>
        <Footer />
      </Container>
    </>
  );
}

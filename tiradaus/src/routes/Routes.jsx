import routes from "./routes.json";
import { Routes, Route } from "react-router-dom";
import Index from "../pages/Index.jsx";
import SignIn from "../pages/SignIn.jsx";
import Registre from "../pages/Registre.jsx";
import CrearJoc from "../pages/CrearJoc.jsx";
import CrearSales from "../pages/CrearSales.jsx";
import ContainerJocs from "../pages/ContainerJocs.jsx";
import ContainerSales from "../pages/ContainerSales.jsx";
import ContainerJoc from "../pages/ContainerJoc.jsx";
import ContainerSala from "../pages/ContainerSala.jsx";
import EditarJoc from "../pages/EditarJoc.jsx";
import EditarSala from "../pages/EditarSala.jsx";
import Perfil from "../pages/Perfil.jsx";
import Calendari from "../pages/Calendari.jsx";

export default function RoutesComponent() {
  return (
    <Routes>
      <Route path={routes.home.index} element={<Index />} />
      <Route path={routes.account.login} element={<SignIn />} />
      <Route path={routes.account.register} element={<Registre />} />
      <Route path={routes.jocs.crear} element={<CrearJoc />} />
      <Route path={routes.jocs.online} element={<ContainerJocs />} />
      <Route path={routes.jocs.presencials} element={<ContainerJocs />} />
      <Route path={routes.sales.online} element={<ContainerSales />} />
      <Route path={routes.sales.presencials} element={<ContainerSales />} />
      <Route path={routes.sales.crear} element={<CrearSales />} />
      <Route path={routes.jocs.detall} element={<ContainerJoc />} />
      <Route path={routes.sales.detall} element={<ContainerSala />} />
      <Route path={routes.jocs.editar} element={<EditarJoc />} />
      <Route path={routes.sales.editar} element={<EditarSala />} />
      <Route path={routes.account.profile} element={<Perfil />} />
      <Route path={routes.calendari} element={<Calendari />} />
      <Route path={'*'} element={<Index />} />
    </Routes>
  );
}

import routes from "./routes.json";
import { Routes, Route } from "react-router-dom";
import Index from "../pages/Index.jsx";
import SignIn from "../pages/SignIn.jsx";

export default function RoutesComponent() {
  return (
    <Routes>
      <Route path={routes.home.index} element={<Index />} />
      <Route path={routes.account.login} element={<SignIn />} />
    </Routes>
  );
}

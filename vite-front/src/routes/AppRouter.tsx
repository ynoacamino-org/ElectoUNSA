import { Routes, Route } from "react-router-dom";

import HomePage from "../pages/Home/HomePage";
import { ListsPage } from "../pages/Lists/ListsPage";
import { ListDetailPage } from "../pages/Lists/ListDetailPage";
import ElectoralProcessPage from "../pages/ElectoralProcess/ElectoralProcessPage";
import AccessPage from "../pages/Access/AccessPage";
import MyListPage from "../pages/MyList/MyListPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      {/* Listas */}
      <Route path="/listas" element={<ListsPage />} />
      <Route path="/listas/:id" element={<ListDetailPage />} />

      {/* Proceso electoral */}
      <Route path="/proceso" element={<ElectoralProcessPage />} />

      {/* Acceso */}
      <Route path="/acceso" element={<AccessPage />} />

      {/* Mi Lista */}
      <Route path="/mi-lista" element={<MyListPage />} />
    </Routes>
  );
}

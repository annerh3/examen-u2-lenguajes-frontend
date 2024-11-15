import { Navigate, Route, Routes } from "react-router";
import { SideBar } from "../components/SideBar";
import { Dashboard } from "../pages/Dashboard";
import { AccountsCatalog } from "../pages/AccountsCatalog";
import { Accounting } from "../pages/Accounting";
import LogsPage from "../pages/LogsPage";

export const JournalizerRouter = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar: adaptable a pantallas pequeñas */}
      <div className="w-20 md:w-64 bg-white shadow-lg border-r">
        <SideBar />
      </div>

      {/* Contenido principal */}
        <div className="flex-1 p-4 md:p-8 overflow-y-scroll">
          <Routes>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/catalogo' element={<AccountsCatalog />} />
            <Route path='/partidas-contables' element={<Accounting />} />
            <Route path='/logs' element={<LogsPage />} />
            <Route path='/*' element={<Navigate to="/dashboard" />} />
          </Routes>
        </div>
    </div>
  );
};

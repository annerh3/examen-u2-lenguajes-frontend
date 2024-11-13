import { Navigate, Route, Routes } from "react-router-dom";
import { SecurityRouter } from "../features/security/routes";
import { JournalizerRouter } from "../features/app/routes";
import { useAuthStore } from "../features/security/store/useAuthStore";

export const AppRouter = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <Routes>
      {!isAuthenticated ? (
        // Si está autenticado, ir al JournalizerRouter
        <Route path="/*" element={<JournalizerRouter />} />
      ) : (
        // Si no está autenticado, redirigir al login
        <Route path="/*" element={<Navigate to="/security/login"/>} />
      )}

      {/* Rutas de seguridad */}
      <Route path="/security/*" element={<SecurityRouter />} />
    </Routes>
  );
};

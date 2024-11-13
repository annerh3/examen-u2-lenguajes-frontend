import { Navigate, Route, Routes } from "react-router"
import { SideBar } from "../components/SideBar"
import { Dashboard } from "../pages/Dashboard"
import {AccountsCatalog} from "../pages/AccountsCatalog"
import {Accounting} from "../pages/Accounting"

export const JournalizerRouter = () => {
  return (
    <div className="flex h-screen">
      <div className="w-64">
        <SideBar />
      </div>

      <div className="flex-1 p-4 bg-gray-100 overflow-y-scroll">
        <Routes>
          <Route path= '/dashboard' element={<Dashboard />} />
          <Route path= '/catalogo' element={<AccountsCatalog />} />
          <Route path= '/partidas-contables' element={<Accounting />} />
          <Route path= '/*' element={<Navigate to="/dashboard" />} />
          
        </Routes>
      </div>
    </div>
  )
}

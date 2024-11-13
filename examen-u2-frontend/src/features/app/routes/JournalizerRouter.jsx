import { Route, Routes } from "react-router"
import { SideBar } from "../components/SideBar"
import { Dashboard } from "../pages/Dashboard"
import AccountsCatalog from "../pages/AccountsCatalog"

export const JournalizerRouter = () => {
  return (
    <div className="flex h-screen">
      <div className="w-64">
        <SideBar />
      </div>

      <div className="flex-1 p-4 bg-gray-100">
        <Routes>
          <Route path= '/*' element={<Dashboard />} />
          <Route path= '/catalogo' element={<AccountsCatalog />} />
          
        </Routes>
      </div>
    </div>
  )
}

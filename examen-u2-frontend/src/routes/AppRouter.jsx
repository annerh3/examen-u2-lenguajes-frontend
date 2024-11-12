import { Navigate, Route, Routes } from "react-router-dom"
//import { ARouter } from "../features/app/routes/ARouter"
import { SecurityRouter } from "../features/security/routes"

export const AppRouter = () => {
  console.log('AppRouter.jsx')
  return (
    <Routes>
        <Route path="/security/*" element={<SecurityRouter />} />
        <Route path="*" element={<Navigate to="/security" />} />
        {/* <Route path="/*" element={<ARouter />} /> */}
     
    </Routes>
  )
}

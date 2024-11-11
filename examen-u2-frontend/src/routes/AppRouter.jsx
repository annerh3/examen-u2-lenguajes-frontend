import { Route, Routes } from "react-router-dom"
import { ARouter } from "../features/app/routes/ARouter"

export const AppRouter = () => {
  return (
    <Routes>
        {/* <Route path="/security/*" element={<SecurityRouter />} /> */}
        <Route path="/*" element={<ARouter />} />
     
    </Routes>
  )
}

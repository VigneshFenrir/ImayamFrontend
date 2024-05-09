import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Register from "./pages/Register";
import DashBoard from "./pages/DashBoard";
import Welcome from "./pages/Welcome";
import AddEmployee from "./views/AddEmployee";
import ViewEmployee from "./views/ViewEmployee";
import EditEmployee from "./views/EditEmployee";
import PagesNotFound from "./pages/PagesNotFound";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/dashboard" element={<DashBoard />}>
          <Route index path="" element={<Welcome />}></Route>
          <Route path="employee">
            <Route path="add" element={<AddEmployee />}></Route>
            <Route index path="view" element={<ViewEmployee />}></Route>
            <Route path="edit/:id" element={<EditEmployee />}></Route>
          </Route>
        </Route>
        <Route path="/*" element={<PagesNotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;

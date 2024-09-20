import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Register from "./pages/Register";
import DashBoard from "./pages/DashBoard";
import Welcome from "./pages/Welcome";
import AddUser from "./views/AddUser";
import ViewUser from "./views/ViewUser";
import EditUser from "./views/EditUser";
import PagesNotFound from "./pages/PagesNotFound";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/dashboard" element={<DashBoard />}>
          <Route index path="" element={<Welcome />}></Route>
          <Route path="user">
            <Route path="add" element={<AddUser />}></Route>
            <Route index path="view" element={<ViewUser />}></Route>
            <Route path="edit/:id" element={<EditUser />}></Route>
          </Route>
        </Route>
        <Route path="/*" element={<PagesNotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;

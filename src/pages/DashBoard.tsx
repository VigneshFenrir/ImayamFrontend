import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const DashBoard = () => {
  return (
    <>
      <div className="container-fluid">
        <Header />
        <Outlet />
      </div>
    </>
  );
};

export default DashBoard;

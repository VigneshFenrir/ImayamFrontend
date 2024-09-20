import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-info text-white p-3 ">
        <a className="navbar-brand text-white" href="#">
          Emayam
        </a>

        <div
          className="collapse navbar-collapse justify-content-center  "
          id="navbarNav"
        >
          <ul className="navbar-nav  rounded-5 ">
            <li className="nav-item active ">
              <Link className="nav-link text-white " to={"/dashboard"}>
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/dashboard/user/view"} className="nav-link text-white">
                users
              </Link>
            </li>
          </ul>
        </div>
        <div className="back ">
          <button className="btn btn-secondary">
            <Link
              to={".."}
              className="btn btn-secondary rounded"
              onClick={(e) => {
                e.preventDefault();
                navigate(-1);
              }}
            >
              back
            </Link>
          </button>
        </div>
      </nav>
    </>
  );
};

export default Header;

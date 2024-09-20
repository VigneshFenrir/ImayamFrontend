import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { FaMessage, FaTrash } from "react-icons/fa6";
import { Link } from "react-router-dom";

interface User {
  _id: string;
  username: string;
  role: string;
}
const ViewUser = () => {
  const [user, setuser] = useState<User[]>([]);
  const [Currentuser, setCurrentuser] = useState("");
  const [msg, setMsg] = useState();
  const [error, setError] = useState("");
  const [pageLinks, setPagelinks] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalitem, setTotalitem] = useState("");
  const [query, setQuery] = useState("");
  const userRole = localStorage.getItem("role");
  const usersPerPage = 10;
  var pageRange = [];
  useEffect(() => {
    Listuser(1);
    pagination();
  }, []);

  const pageLinkClick = (page: number) => {
    Listuser(page);
  };

  //pagination
  async function pagination() {
    try {
      let totalCount = await axios.get("http://localhost:5000/users/userTotal");
      const totalitems = totalCount.data;
      setTotalitem(totalCount.data);

      let pgCount = Math.ceil(totalitems / usersPerPage);

      pageRange = [...Array(pgCount).keys()].map((i) => i + 1);

      setPagelinks(pageRange);
    } catch (err) {
      console.log(err);
    }
  }

  async function Listuser(page: number) {
    try {
      setCurrentPage(page);
      console.log(query);
      let Emp = await axios.get(
        `http://localhost:5000/users?page=${page}&search=${query}`
      );
      console.log(Emp);
      setuser(Emp.data);
    } catch (err: any) {
      console.log(err.message);
      setError(err.message);
    }
  }
  const handledelete = (user: any) => {
    setCurrentuser(user);
    deleteitem();
  };
  const deleteitem = async () => {
    let results = await axios.delete(
      "http://localhost:5000/users/delete" + Currentuser
    );
    console.log(results);
    console.log("result:", results.data);
    setMsg(results.data);
    Listuser(1);
  };
  const handleInputChange = (event: any) => {
    setQuery(event.target.value);
    console.log(event.target.value);
    if (!event.target.value) {
      console.log("if");
      Listuser(1);
    }
  };
  const searchofbatch = (e: FormEvent) => {
    e.preventDefault();
    console.log(query);
    Listuser(1);
  };
  console.log(userRole, "check");
  return (
    <>
      <div className="border">
        <div className="container ">
          <h2 className="text-center">Users</h2>
          <div className="row justify-content-between">
            {(userRole === "admin" || userRole === "editor") && (
              <div className="col-4 p-3 align-self-center">
                <Link className="btn btn-info " to={"/dashboard/user/add"}>
                  Create User
                </Link>
              </div>
            )}
            <div className="col-4 p-3 align-self-end">
              <div className="">
                <form
                  className="  d-flex  justify-content-between "
                  onSubmit={searchofbatch}
                >
                  <input
                    type="search"
                    placeholder="search"
                    onChange={handleInputChange}
                    className="form-control  "
                  />
                  <button className="btn btn-primary ms-2">search</button>
                </form>
              </div>
            </div>
            <div className="col-4  p-3">
              <div className="h3 text-end">Total Users : {totalitem}</div>
            </div>
          </div>
        </div>
        <div className="container mt-3">
          {msg && <p className="alert alert-success">{msg}</p>}
          {error && <p className="alert alert-danger">{error}</p>}
          <table className="table text-center">
            <thead>
              <tr>
                <th className="text-center">Unique Id</th>
                <th className="text-center">UserName</th>
                <th className="text-center">Role</th>

                {(userRole === "admin" || userRole === "editor") && (
                  <th className="text-center">Action</th>
                )}
              </tr>
            </thead>
            <tbody>
              {user.map((user) => (
                <tr key={user._id}>
                  <td className="text-center">{user._id}</td>
                  <td className="text-center">{user.username}</td>
                  <td className="text-center">{user.role}</td>

                  {(userRole === "admin" || userRole === "editor") && (
                    <td className="text-center">
                      <Link
                        to={`/dashboard/user/edit/${user._id}`}
                        className="text-start me-2"
                      >
                        <FaMessage />
                      </Link>
                      <Link
                        to={""}
                        className="text-end ms-2"
                        onClick={() => handledelete(user._id)}
                      >
                        <FaTrash color="red" />
                      </Link>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination justify-content-center  ">
            {pageLinks.map((pageNumber) => (
              <button
                key={pageNumber}
                className={`page-button m-1 px-2 ${
                  currentPage === pageNumber ? "bg-dark" : ""
                } text-info  rounded-2`}
                onClick={() => pageLinkClick(pageNumber)}
              >
                {pageNumber}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewUser;

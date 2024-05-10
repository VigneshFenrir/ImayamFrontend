import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { FaMessage, FaTrash } from "react-icons/fa6";
import { Link } from "react-router-dom";

interface Employ {
  _id: string;
  name: string;
  email: string;
  mobile: number;
  designation: string;
  course: string;
  gender: string;
  Date: string;
}
const ViewEmployee = () => {
  const [employ, setEmploy] = useState<Employ[]>([]);
  const [Currentemploye, setCurrentemploye] = useState("");
  const [msg, setMsg] = useState();
  const [error, setError] = useState("");
  const [pageLinks, setPagelinks] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalitem, setTotalitem] = useState("");
  const [query, setQuery] = useState("");
  const usersPerPage = 10;
  var pageRange = [];
  useEffect(() => {
    ListEmployee(1);
    pagination();
  }, []);

  const pageLinkClick = (page: number) => {
    ListEmployee(page);
  };

  //pagination
  async function pagination() {
    try {
      let totalCount = await axios.get(
        "http://localhost:6001/employee/employeeTotal"
      );
      const totalitems = totalCount.data;
      setTotalitem(totalCount.data);

      let pgCount = Math.ceil(totalitems / usersPerPage);

      pageRange = [...Array(pgCount).keys()].map((i) => i + 1);

      setPagelinks(pageRange);
    } catch (err) {
      console.log(err);
    }
  }

  async function ListEmployee(page: number) {
    try {
      setCurrentPage(page);
      console.log(query);
      let Emp = await axios.get(
        `http://localhost:6001/employee?page=${page}&search=${query}`
      );
      console.log(Emp);
      setEmploy(Emp.data);
    } catch (err: any) {
      console.log(err.message);
      setError(err.message);
    }
  }
  const handledelete = (user: any) => {
    setCurrentemploye(user);
    deleteitem();
  };
  const deleteitem = async () => {
    let results = await axios.delete(
      "http://localhost:6001/employee/delete" + Currentemploye
    );
    console.log(results);
    console.log("result:", results.data);
    setMsg(results.data);
    ListEmployee(1);
  };
  const handleInputChange = (event: any) => {
    // event.preventdefault();
    setQuery(event.target.value);
    console.log(event.target.value);
    if (!event.target.value) {
      console.log("if");
      //   setQuery("");
      ListEmployee(1);
    }
  };
  const searchofbatch = (e: FormEvent) => {
    e.preventDefault();
    console.log(query);
    ListEmployee(1);
  };

  return (
    <>
      <div className="border">
        <div className="container ">
          <h2 className="text-center">Employee</h2>
          <div className="row">
            <div className="col-4 p-3 align-self-center">
              <Link className="btn btn-info " to={"/dashboard/employee/add"}>
                Create Employee
              </Link>
            </div>
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
              <div className="h3 text-end">Total Employees -{totalitem}</div>
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
                <th className="text-center">Name</th>
                <th className="text-center">E-mail</th>
                <th className="text-center">Mobile No.</th>
                <th className="text-center">Desigination</th>
                <th className="text-center">Gender</th>
                <th className="text-center">Course</th>
                <th className="text-center">Create Date</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {employ.map((employe) => (
                <tr key={employe._id}>
                  <td className="text-center">{employe._id}</td>
                  <td className="text-center">{employe.name}</td>
                  <td className="text-center">{employe.email}</td>
                  <td className="text-center">{employe.mobile}</td>
                  <td className="text-center">{employe.designation}</td>
                  <td className="text-center">{employe.gender}</td>
                  <td className="text-center">{employe.course}</td>
                  <td className="text-center">{employe.Date}</td>

                  <td className="text-center">
                    <Link
                      to={`/dashboard/employee/edit/${employe._id}`}
                      className="text-start me-2"
                    >
                      <FaMessage />
                    </Link>
                    <Link
                      to={""}
                      className="text-end ms-2"
                      onClick={() => handledelete(employe._id)}
                    >
                      <FaTrash color="red" />
                    </Link>
                  </td>
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

export default ViewEmployee;

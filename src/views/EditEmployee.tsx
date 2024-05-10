import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditEmployee = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  const [employ, setEmploy] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    course: [""],
    gender: "",
  });

  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    getEmployee();
  }, []);

  async function getEmployee() {
    try {
      let result = await axios.get("http://localhost:6001/employee/one" + id);
      console.log("result:", result);
      setEmploy(result.data);
      console.log(employ);
    } catch (err: any) {
      console.log(err.message);
    }
  }

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      const updatedInterests = checked
        ? [...employ.course, value]
        : employ.course.filter((course) => course !== value);

      setEmploy({
        ...employ,
        course: updatedInterests,
      });
    } else {
      setEmploy({
        ...employ,
        [name]: value,
      });
    }
  };
  const updateEmployee = (e: FormEvent) => {
    e.preventDefault();
    console.log("update");
    update();
    if (!error) {
      msg && navigate("/dashboard/employee");
    }
  };
  async function update() {
    try {
      let employed = await axios.put(
        "http://localhost:6001/employee/update" + id,
        employ
      );
      console.log(employed);
      setMsg(employed.data);
    } catch (error: any) {
      console.log(error);
      console.log("error:", error.response.data);
      setError(error.response.data);
    }
  }

  return (
    <>
      <div className="container  border my-5 py-3 rounded">
        {msg && <p className="alert alert-success">{msg}</p>}
        {error && <p className="alert alert-danger">{error}</p>}
        <h1 className="text-center my-3">Sign In</h1>
        <form action="post" onSubmit={updateEmployee}>
          <div className="row flex-column align-items-center">
            <div className="form-group col-5">
              <label htmlFor="" className="form-label text-secondary ">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                value={employ.name}
                placeholder={employ.name}
                onChange={(e) => setEmploy({ ...employ, name: e.target.value })}
              />
            </div>
            <div className="form-group col-5">
              <label htmlFor="" className="form-label text-secondary ">
                E-Mail
              </label>
              <input
                type="email"
                className="form-control"
                value={employ.email}
                placeholder={employ.email}
                onChange={(e) =>
                  setEmploy({ ...employ, email: e.target.value })
                }
              />
            </div>
            <div className="form-group col-5">
              <label htmlFor="" className="form-label text-secondary ">
                Mobile
              </label>
              <input
                type="phone"
                className="form-control"
                value={employ.mobile}
                placeholder={employ.mobile}
                onChange={(e) =>
                  setEmploy({ ...employ, mobile: e.target.value })
                }
              />
            </div>
            <div className="form-group col-5">
              <label htmlFor="" className="form-label text-secondary">
                Designation
              </label>
              <select
                name=""
                id=""
                value={employ.designation}
                className="form-select"
                onChange={(e) =>
                  setEmploy({ ...employ, designation: e.target.value })
                }
              >
                <option>select</option>
                <option value="Manager">Manager</option>
                <option value="Hr">Hr</option>
                <option value="Sales">Sales</option>
              </select>
            </div>
            <div className="form-check col-5 ">
              <div className="form-group my-3">
                <label htmlFor="" className="form-label text-secondary ">
                  Gender :
                </label>
                <label className="ps-2">
                  Male
                  <input
                    type="radio"
                    value="male"
                    className="ms-2"
                    checked={employ.gender === "male"}
                    onChange={(event) =>
                      setEmploy({ ...employ, gender: event.target.value })
                    }
                  />
                </label>

                <label className="ps-2">
                  Female
                  <input
                    type="radio"
                    value="female"
                    className="ms-2"
                    checked={employ.gender === "female"}
                    onChange={(event) =>
                      setEmploy({ ...employ, gender: event.target.value })
                    }
                  />
                </label>
              </div>

              <div className="form-group ">
                <label htmlFor="" className="form-label text-secondary ">
                  Course :
                </label>
                <label className="ps-2">
                  msc
                  <input
                    type="checkbox"
                    name="course"
                    className="ms-2"
                    value=" msc"
                    checked={employ.course.includes(" msc")}
                    onChange={handleChange}
                  />
                </label>

                <label className="ps-2">
                  bsc
                  <input
                    type="checkbox"
                    name="course"
                    value=" bsc"
                    className="ms-2"
                    checked={employ.course.includes(" bsc")}
                    onChange={handleChange}
                  />
                </label>
                <label className="ps-2">
                  bca
                  <input
                    type="checkbox"
                    name="course"
                    className="ms-2"
                    value=" bca"
                    checked={employ.course.includes(" bca")}
                    onChange={handleChange}
                  />
                </label>
              </div>

              <div className=" text-center m-5">
                <button className="btn btn-primary  me-4">Submit</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditEmployee;

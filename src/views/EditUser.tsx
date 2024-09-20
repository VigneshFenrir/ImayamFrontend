import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  const [user, setuser] = useState({
    username: "",
    role: "",
  });

  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    getuser();
  }, []);

  async function getuser() {
    try {
      let result = await axios.get("http://localhost:5000/users/one" + id);
      console.log("result:", result);
      setuser(result.data);
      console.log(user);
    } catch (err: any) {
      console.log(err.message);
    }
  }

  const updateuseree = (e: FormEvent) => {
    e.preventDefault();
    update();
    if (!error) {
      msg && navigate("/dashboard/user/view");
    }
  };
  async function update() {
    try {
      let usered = await axios.put(
        "http://localhost:5000/users/update" + id,
        user
      );

      setMsg(usered.data);
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
        <form action="post" onSubmit={updateuseree}>
          <div className="row flex-column align-items-center">
            <div className="form-group col-5">
              <label htmlFor="" className="form-label text-secondary ">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                value={user.username}
                placeholder={user.username}
                onChange={(e) => setuser({ ...user, username: e.target.value })}
              />
            </div>

            <div className="form-group col-5">
              <label htmlFor="" className="form-label text-secondary">
                Role
              </label>
              <select
                name="role"
                id=""
                value={user.role}
                className="form-select"
                onChange={(e) => setuser({ ...user, role: e.target.value })}
              >
                <option>select</option>
                <option value="admin">admin</option>
                <option value="editor">editor</option>
                <option value="viewer">viewer</option>
              </select>
            </div>
            <div className="form-check col-5 ">
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

export default EditUser;

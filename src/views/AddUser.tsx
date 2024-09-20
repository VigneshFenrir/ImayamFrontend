import axios from "axios";
import { FormEvent, useState } from "react";

const AddUser = () => {
  const [user, setUser] = useState({
    username: "",
    role: "",
    password: "",
    confirm_password: "",
  });
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const reg = (e: FormEvent) => {
    e.preventDefault();

    if (user.password !== user.confirm_password) {
      setError("Password & Confirmpassword are not same");
      return;
    }
    async function userCheck() {
      try {
        let result = await axios.post("http://localhost:5000/users", {
          username: user.username,
          role: user.role,
          password: user.password,
        });
        console.log(result);
        setMsg(result.data);
        setUser({
          username: "",
          role: "",
          password: "",
          confirm_password: "",
        });
      } catch (err: any) {
        console.log(err);
        setError(err.response.data);
        setUser({
          username: "",
          role: "",
          password: "",
          confirm_password: "",
        });
      }
    }
    userCheck();
  };
  return (
    <>
      <div className="container  border my-5 py-3 rounded">
        <h1 className="text-center my-3">Add User</h1>
        <form action="post" onSubmit={reg}>
          <div className="row flex-column align-items-center">
            <div className="form-group col-5">
              <label htmlFor="" className="form-label text-secondary ">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
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
                onChange={(e) => setUser({ ...user, role: e.target.value })}
              >
                <option>select</option>
                <option value="admin">admin</option>
                <option value="editor">editor</option>
                <option value="viewer">viewer</option>
              </select>
            </div>

            <div className="form-group col-5">
              <label htmlFor="" className="form-label text-secondary">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </div>
            <div className="form-group col-5">
              <label htmlFor="" className="form-label text-secondary ">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                value={user.confirm_password}
                onChange={(e) =>
                  setUser({ ...user, confirm_password: e.target.value })
                }
              />
              <div className="text-center">
                {msg && <p className="text-success">{msg}</p>}
                {!msg && <p className="text-danger">{error}</p>}
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

export default AddUser;

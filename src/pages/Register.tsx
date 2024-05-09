import axios from "axios";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    mobile: "",
    password: "",
    confirm_password: "",
  });
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const reg = (e: FormEvent) => {
    e.preventDefault();
    // console.log("hiiiii");
    if (user.password !== user.confirm_password) {
      setError("Password & Confirmpassword are not same");
      return;
    }
    async function userCheck() {
      try {
        console.log("hiiiii");
        let result = await axios.post("http://localhost:6001/users", user);
        console.log(result);
        setMsg(result.data);
        navigate("/");
      } catch (err: any) {
        console.log(err);
        setError(err.response.data);
        setUser({
          username: "",
          email: "",
          mobile: "",
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
        <h1 className="text-center my-3">Sign In</h1>
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
              <label htmlFor="" className="form-label text-secondary ">
                E-Mail
              </label>
              <input
                type="email"
                className="form-control"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>
            <div className="form-group col-5">
              <label htmlFor="" className="form-label text-secondary ">
                Mobile
              </label>
              <input
                type="phone"
                className="form-control"
                value={user.mobile}
                onChange={(e) => setUser({ ...user, mobile: e.target.value })}
              />
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
        <div className="row">
          <div className="text-end">
            <Link className="btn btn-info text-white me-4" to={"/"}>
              Log In
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;

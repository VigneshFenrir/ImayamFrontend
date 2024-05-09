import axios from "axios";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const log = (e: FormEvent) => {
    e.preventDefault();

    async function loginCheck() {
      try {
        console.log("hiiiii");
        let result = await axios.post("http://localhost:6001/login", login);
        console.log(result);
        setMsg(result.data);
        navigate("/dashboard");
      } catch (err: any) {
        console.log(err);
        setError(err.response.data);
        setLogin({
          username: "",
          password: "",
        });
      }
    }
    loginCheck();
  };

  return (
    <>
      <div className="container bg-info w-50 my-5 py-3 rounded">
        <h1 className="text-center my-3">Login</h1>
        <form action="post" onSubmit={log}>
          <div className="row flex-column align-items-center">
            <div className="form-group col-5">
              <label htmlFor="" className="form-label text-secondary ">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                value={login.username}
                onChange={(e) =>
                  setLogin({ ...login, username: e.target.value })
                }
              />
            </div>
            <div className="form-group col-5">
              <label htmlFor="" className="form-label text-secondary">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                value={login.password}
                onChange={(e) =>
                  setLogin({ ...login, password: e.target.value })
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
            <Link to={"/register"} className="btn btn-light text-danger me-4">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState([]);

  useEffect(() => {
    const authenticate = async () => {
      try {
        await axios.get(
          `${import.meta.env.VITE_SERVER_AUTH_URL}/authenticate`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        navigate("/");
      } catch (error) {
        console.log(error);
        navigate("/login");
      }
    };

    authenticate();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = await axios.post(
        `${import.meta.env.VITE_SERVER_AUTH_URL}/login`,
        loginData
      );
      localStorage.setItem("token", payload.data.token);
      navigate("/");
    } catch (error) {
      setLoginError(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <div className="login flex flex-col items-center justify-center h-lvh">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl pb-8">
        Log in
      </h1>
      <form
        onSubmit={handleSubmit}
        className="form-field grid w-full max-w-sm items-center gap-1.5"
      >
        <Input
          name="username"
          type="text"
          id="username"
          placeholder="Username"
          onChange={(e) =>
            setLoginData({ ...loginData, username: e.target.value })
          }
        />
        <Input
          name="password"
          type="password"
          id="password"
          placeholder="Password"
          onChange={(e) =>
            setLoginData({ ...loginData, password: e.target.value })
          }
        />
        <Button>Log in</Button>
        {loginError ? (
          <span className=" text-red-600">{loginError}</span>
        ) : (
          <></>
        )}
      </form>
      <div>
        <span>
          Don't have an account?{" "}
          <Link className="underline" to={"/register"}>
            Register here.
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Login;

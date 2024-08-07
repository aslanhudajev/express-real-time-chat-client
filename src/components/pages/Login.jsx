import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { useNavigate } from "react-router-dom";
import { Label } from "@radix-ui/react-label";
import { useState, useEffect } from "react";
import { AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState();

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
        <Label htmlFor="username">Username</Label>
        <Input
          name="username"
          type="text"
          id="username"
          placeholder="Username"
          onChange={(e) =>
            setLoginData({ ...loginData, username: e.target.value })
          }
          required
        />
        <Label htmlFor="password">Password</Label>
        <Input
          name="password"
          type="password"
          id="password"
          placeholder="Password"
          onChange={(e) =>
            setLoginData({ ...loginData, password: e.target.value })
          }
          required
        />
        <Button className="mt-4" type="submit">
          Log in
        </Button>
        <span className="text-center">
          Don't have an account?&nbsp;
          <Link className="underline" to={"/register"}>
            Register here
          </Link>
        </span>

        {loginError ? (
          <div className="flex flex-col items-center text-sm mt-4 gap-4">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>{"Error"}</AlertTitle>
              <AlertDescription>{loginError}</AlertDescription>
            </Alert>
          </div>
        ) : (
          <></>
        )}
      </form>
    </div>
  );
};

export default Login;

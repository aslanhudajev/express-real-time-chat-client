import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Input } from "../ui/input";
import { Button } from "../ui/button";

const Register = () => {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    username: "",
    password: "",
    "password-confirm": "",
  });
  const [registerError, setRegisterError] = useState([]);

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
        navigate("/register");
      }
    };

    authenticate();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        `${import.meta.env.VITE_SERVER_AUTH_URL}/register`,
        registerData
      );
      console.log(result.data);
      navigate("/login");
    } catch (error) {
      setRegisterError(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <div className="login flex flex-col items-center justify-center h-lvh">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl pb-8">
        Register
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
            setRegisterData({ ...registerData, username: e.target.value })
          }
        />
        <Input
          name="password"
          type="password"
          id="password"
          placeholder="Password"
          onChange={(e) =>
            setRegisterData({ ...registerData, password: e.target.value })
          }
        />
        <Input
          name="password-confirm"
          type="password"
          id="password-confirm"
          placeholder="Confirm password"
          onChange={(e) =>
            setRegisterData({
              ...registerData,
              "password-register": e.target.value,
            })
          }
        />
        <Button>Register</Button>
        {registerError ? (
          <span className=" text-red-600">{registerError}</span>
        ) : (
          <></>
        )}
      </form>
    </div>
  );
};

export default Register;

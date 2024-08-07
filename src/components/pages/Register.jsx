import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { useNavigate } from "react-router-dom";
import { Label } from "@radix-ui/react-label";
import { useState, useEffect } from "react";
import { AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Terminal } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    username: "",
    password: "",
    passwordConfirm: "",
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
      setRegisterError(error.response.data.errors);
      console.log(error);
    }
  };

  return (
    <div className="register flex flex-col items-center justify-center h-lvh">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl pb-8">
        Register
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
            setRegisterData({ ...registerData, username: e.target.value })
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
            setRegisterData({ ...registerData, password: e.target.value })
          }
          required
        />
        <Label htmlFor="passwordConfirm">Confirm password</Label>
        <Input
          name="passwordConfirm"
          type="password"
          id="passwordConfirm"
          placeholder="Confirm password"
          onChange={(e) =>
            setRegisterData({
              ...registerData,
              passwordConfirm: e.target.value,
            })
          }
          required
        />
        <Button className="mt-4" type="submit">
          Register
        </Button>
        <span className="text-center">
          Already have an account?&nbsp;
          <Link className="underline" to={"/login"}>
            Log in here
          </Link>
        </span>
        <Alert className="mt-4">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Password requirements</AlertTitle>
          <AlertDescription>
            <ul>
              <li>- At least 8 characters long</li>
              <li>- At least 1 number</li>
              <li>- At least 1 uppercase character</li>
            </ul>
          </AlertDescription>
        </Alert>
      </form>

      {registerError ? (
        <div className="flex flex-col items-center text-sm mt-4 gap-4">
          {registerError.map((error) => (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>{`Error ${error.path}`}</AlertTitle>
              <AlertDescription>{error.msg}</AlertDescription>
            </Alert>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Register;

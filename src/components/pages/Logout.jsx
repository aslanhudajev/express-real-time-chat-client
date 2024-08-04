import { Button } from "../ui/button";
import { useNavigate, Link } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    window.location.href("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <section className="error flex flex-col justify-center items-center h-svh gap-4">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Are you sure you want to log out?
      </h1>
      <div className="flex flex-row gap-4">
        <Link to={"/"} reloadDocument={true}>
          <Button>Go back</Button>
        </Link>
        <Button onClick={handleLogout} variant="secondary">
          Log out
        </Button>
      </div>
    </section>
  );
};

export default Logout;

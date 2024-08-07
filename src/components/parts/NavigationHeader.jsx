/* eslint-disable react/prop-types */
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import axios from "axios";

const NavHeader = () => {
  const navigate = useNavigate();

  const { isPending, error, data } = useQuery({
    queryKey: ["requestAmount"],
    queryFn: async () => {
      try {
        const result = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/requests/count`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        console.log(result.data);
        return result.data;
      } catch (error) {
        navigate("/login");
        console.log(error);
      }
    },
  });

  if (error) return "An error has occurred: " + error.message;

  return (
    <nav className="w-full p-4 shadow-sm sticky top-0 z-50 bg-white flex flex-row items-center justify-between">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <h2 className="logo scroll-m-20 text-3xl font-semibold tracking-tight mr-4">
              Litecord
            </h2>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/requests" className={navigationMenuTriggerStyle()}>
              {data ? `Requests (${data})` : "Requests"}
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Socials</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[350px] gap-3 p-4">
                <ListItem
                  to="https://github.com/aslanhudajev?tab=repositories"
                  title="Github"
                >
                  My Github account
                </ListItem>
                <ListItem
                  to="https://github.com/aslanhudajev?tab=repositories"
                  title="LinkedIn"
                >
                  My LinkedIn profile
                </ListItem>
                <ListItem
                  to="https://github.com/aslanhudajev?tab=repositories"
                  title="LeetCode"
                >
                  My LeetCode solutions
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/aboutme" className={navigationMenuTriggerStyle()}>
              About
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link to="/logout" className={navigationMenuTriggerStyle()}>
              Logout
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
};

export default NavHeader;

const ListItem = ({ to, title, children, className, ...props }) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          href={to}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
};

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
import { cn } from "@/lib/utils";

import { Link } from "react-router-dom";

const NavHeader = () => {
  return (
    <nav className="w-full p-4 shadow-sm sticky top-0 z-50 bg-white">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <h2 className="logo scroll-m-20 text-3xl font-semibold tracking-tight mr-4">
              Litecord
            </h2>
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

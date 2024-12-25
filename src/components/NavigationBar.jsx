import { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
} from "@nextui-org/react";
import { Logout } from "iconsax-react";
import { useTheme } from "../contexts/themeContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const NavigationBar = ({ currentPage, setCurrentPage }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = ["Stats", "Records", "Cards", "Settings"];

  const { isDark } = useTheme();

  const handleUserLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userId");
    toast.success("You have successfully logged out");
    navigate("/login");
  };

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="font-medium text-inherit font-clashDisplay">
            Expense Tracker
          </p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex gap-4 font-clashDisplay"
        justify="center"
      >
        {menuItems.map((item) => (
          <NavbarItem key={item} isActive={currentPage === item}>
            <Link
              color={currentPage === item ? "primary" : "foreground"}
              href="#"
              onPress={() => setCurrentPage(item)}
            >
              {item}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end" className="font-clashDisplay">
        <NavbarItem>
          <Button
            color="danger"
            href="#"
            variant="flat"
            onPress={handleUserLogout}
            endContent={<Logout size={24} weight="thin" variant="Broken" />}
          >
            Log Out
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu
        className={isDark ? "dark" : ""}
        style={isDark ? { color: "white" } : {}}
      >
        {menuItems.map((item, index) => (
          <NavbarMenuItem
            key={`${item}-${index}`}
            isActive={currentPage === item}
          >
            <Link
              color={
                currentPage === item
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              className="w-full font-clashDisplay"
              href="#"
              onPress={() => setCurrentPage(item)}
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default NavigationBar;

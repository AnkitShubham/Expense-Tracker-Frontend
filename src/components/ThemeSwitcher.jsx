import { useTheme } from "../contexts/themeContext";
import { Switch } from "@nextui-org/react";
import { Sun1, Moon } from "iconsax-react";

const ThemeSwitcher = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="theme-switcher">
      <Switch
        checked={isDark}
        onChange={toggleTheme}
        startContent={<Sun1 size={16} variant="Broken" />}
        endContent={<Moon size={16} variant="Broken" />}
      />
    </div>
  );
};

export default ThemeSwitcher;

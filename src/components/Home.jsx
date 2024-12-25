import { useState } from "react";
import NavigationBar from "./NavigationBar";
import Stats from "./Stats";
import Records from "./Records";
import CardsPage from "./CardsPage";
import Settings from "./Settings";
import useAuthCheck from "../hooks/useAuthCheck";

const Home = () => {
  const [currentPage, setCurrentPage] = useState("Stats");

  useAuthCheck();

  const renderPage = () => {
    switch (currentPage) {
      case "Stats":
        return <Stats />;
      case "Records":
        return <Records />;
      case "Cards":
        return <CardsPage />;
      case "Settings":
        return <Settings />;
      default:
        return <Stats />;
    }
  };

  return (
    <div className="min-h-[100vh]">
      <NavigationBar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <div className="content">{renderPage()}</div>
    </div>
  );
};

export default Home;

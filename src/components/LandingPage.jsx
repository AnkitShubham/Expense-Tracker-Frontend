import { useEffect } from "react";
import HeroImg from "../assets/images/hero-image-landing-page.png";
import { Link, Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");
    const email = localStorage.getItem("email");
    const userId = localStorage.getItem("userId");

    if (jwtToken || email || userId) {
      navigate("/home");
    }
  });
  return (
    <div className="font-clashDisplay flex flex-col h-[100vh] w-[100vw]">
      <header className="text-4xl font-bold p-4 absolute top-0 left-0 w-full text-center">
        Expense Tracker
      </header>
      <div className="flex flex-1 justify-center items-center">
        <div className="flex flex-col md:flex-row justify-center items-center gap-16">
          <div>
            <img
              src={HeroImg}
              alt="expense-tracer"
              className="md:h-[50vh] md:w-[40vw] h-[50vw] w-[40vh]"
            />
          </div>
          <div className="flex flex-col gap-4 text-center md:text-left">
            <h1 className="font-bold text-4xl tracking-wide">
              Track your expenses{" "}
              <span className="text-[#006FEE]">effortlessly</span>
            </h1>
            <p className="text-base md:text-lg">
              Easily manage your expenses, budget smarter, and reach your
              financial goals.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
              <Button
                variant="bordered"
                color="primary"
                href="/login"
                as={Link}
              >
                Login
              </Button>
              <Button
                variant="bordered"
                color="primary"
                href="/signup"
                as={Link}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

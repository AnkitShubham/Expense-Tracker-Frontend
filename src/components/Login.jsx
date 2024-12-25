import { useState } from "react";
import { Button, Divider, Input } from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeSlash, PasswordCheck, Sms } from "iconsax-react";
import { login } from "../api/authService";
import userService from "../api/userService";
import useAuthCheck from "../hooks/useAuthCheck";
import { toast } from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();

  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  useAuthCheck();

  // Notify for success
  const notifySuccess = (msg) => toast.success(msg);

  // Notify for any errors
  const notifyError = (msg) => toast.error(msg);

  // Function to handle password visibility
  const toggleVisibility = () => setIsVisible(!isVisible);

  // Function to handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setSubmitButtonDisabled(true);

    // Checks for any empty fields
    if (!email || !password) {
      notifyError("Fill in all the fields!");
      setSubmitButtonDisabled(false);
      return;
    }

    try {
      // Perform login and get the JWT token
      await login({ email, password });

      // Fetch user details
      const userDetails = await userService.getUserData(email);

      // Save user details to local storage
      localStorage.setItem("userId", userDetails.id);
      localStorage.setItem("email", userDetails.email);

      notifySuccess("Login successful");

      // Navigate to the home page
      navigate("/home");
    } catch (error) {
      if (error.response?.status === 404) {
        notifyError("User not found!");
      } else {
        notifyError("An error occurred during login!");
      }
      console.error("Login error:", error);
    } finally {
      setEmail("");
      setPassword("");
      setSubmitButtonDisabled(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-[100vw] h-[100vh] font-clashDisplay">
      <h1 className="font-bold text-3xl mb-14">Login</h1>
      <div className="flex flex-col justify-center items-center gap-4 w-full">
        <Input
          className="max-w-xs"
          type="email"
          label="Email"
          labelPlacement="outside"
          placeholder="Enter your email"
          radius="sm"
          size="lg"
          startContent={<Sms size={28} variant="Broken" />}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          className="max-w-xs"
          type={isVisible ? "text" : "password"}
          label="Password"
          labelPlacement="outside"
          placeholder="Enter your password"
          radius="sm"
          size="lg"
          startContent={<PasswordCheck size={28} variant="Broken" />}
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
              aria-label="toggle password visibility"
            >
              {isVisible ? (
                <EyeSlash size={24} variant="Broken" />
              ) : (
                <Eye size={24} variant="Broken" />
              )}
            </button>
          }
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          color="primary"
          radius="sm"
          size="lg"
          fullWidth="true"
          className="max-w-xs"
          onClick={handleLogin}
          isDisabled={submitButtonDisabled}
        >
          Login
        </Button>
        <Divider className="max-w-xs" />
        <Link to="/signup" className="no-underline">
          Don&apos;t have an account? SignUp
        </Link>
      </div>
    </div>
  );
};

export default Login;

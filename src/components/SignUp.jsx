import { useState, useEffect } from "react";
import { Button, Divider, Input } from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeSlash,
  PasswordCheck,
  ProfileCircle,
  Sms,
} from "iconsax-react";
import { toast, Toaster } from "react-hot-toast";
import { signup } from "../api/authService";
import { nanoid } from "nanoid";

const SignUp = () => {
  const navigate = useNavigate();

  const [isVisible, setIsVisible] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmedPassword] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");
    const email = localStorage.getItem("email");
    const userId = localStorage.getItem("userId");

    if (jwtToken || email || userId) {
      navigate("/home");
    }
  }, [navigate]);

  const toggleVisibility = () => setIsVisible(!isVisible);

  // Function to handle signup
  const handleSignup = async (e) => {
    e.preventDefault();

    setSubmitButtonDisabled(true);

    // Checks for any empty fields
    if (!fullName || !email || !password || !confirmPassword) {
      toast.error("Please fill in all the details!");
      setSubmitButtonDisabled(false);
      return;
    }

    // Checks if both passwords match or not
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      setSubmitButtonDisabled(false);
      return;
    }

    const id = nanoid();

    try {
      // Call the signup API
      const response = await signup({ id, fullName, email, password });

      if (response.status == 201) {
        // Show success notification
        toast.success("Signup successful, please login");
        navigate("/login");
      }

      // Navigate to the login page
      navigate("/login");
    } catch (error) {
      // Handle signup errors
      if (error.response?.status === 409) {
        toast.error("Email already exists, please login");
      } else {
        toast.error("An unexpected error occurred!");
      }
    } finally {
      setSubmitButtonDisabled(false);
      setFullName();
      setEmail("");
      setPassword("");
      setConfirmedPassword("");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-[100vw] h-[100vh] font-clashDisplay">
      <h1 className="font-bold text-3xl mb-14">Sign Up</h1>
      <div className="flex flex-col justify-center items-center gap-4 w-full">
        <Input
          className="max-w-xs"
          type="text"
          label="Full Name"
          labelPlacement="outside"
          placeholder="Enter your full name"
          radius="sm"
          size="lg"
          startContent={<ProfileCircle size={32} variant="Broken" />}
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
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
          label="Password"
          className="max-w-xs"
          type={isVisible ? "text" : "password"}
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
        <Input
          label="Confirm Password"
          className="max-w-xs"
          type={isVisible ? "text" : "password"}
          labelPlacement="outside"
          placeholder="Confirm your password"
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
          value={confirmPassword}
          onChange={(e) => setConfirmedPassword(e.target.value)}
        />
        <Button
          color="primary"
          radius="sm"
          size="lg"
          fullWidth="true"
          className="max-w-xs"
          onClick={handleSignup}
          isDisabled={submitButtonDisabled}
        >
          Sign Up
        </Button>
        <Divider className="max-w-xs" />
        <Link to="/login" className="no-underline">
          Already have an account? Login
        </Link>
      </div>
      <Toaster />
    </div>
  );
};

export default SignUp;

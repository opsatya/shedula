import SheduleLoginForm from "@/components/SheduleLoginForm";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  
  const handleLogin = (data: any) => {
    // Handle login logic here
    console.log("Login data:", data);
    navigate("/otp");
  };

  const handleGoogleLogin = () => {
    // Handle Google login
    console.log("Google login");
    navigate("/otp");
  };

  const handleForgotPassword = () => {
    // Handle forgot password
    console.log("Forgot password");
  };

  const handleSignUp = () => {
    // Handle sign up
    console.log("Sign up");
  };

  return (
    <SheduleLoginForm
      onSubmit={handleLogin}
      onGoogleLogin={handleGoogleLogin}
      onForgotPassword={handleForgotPassword}
      onSignUp={handleSignUp}
    />
  );
}
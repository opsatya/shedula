import SheduleLoginForm, { LoginFormData } from "@/components/SheduleLoginForm";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();

  const handleLogin = (data: LoginFormData) => {
    toast({
      title: "Login Attempted",
      description: `Email/Phone: ${data.emailOrPhone}, Remember Me: ${data.rememberMe}`,
    });
  };

  const handleGoogleLogin = () => {
    toast({
      title: "Google Login",
      description: "Google OAuth integration would be implemented here",
    });
  };

  const handleForgotPassword = () => {
    toast({
      title: "Forgot Password",
      description: "Password recovery flow would be implemented here",
    });
  };

  const handleSignUp = () => {
    toast({
      title: "Sign Up",
      description: "Registration flow would be implemented here",
    });
  };

  return (
    <SheduleLoginForm
      onSubmit={handleLogin}
      onGoogleLogin={handleGoogleLogin}
      onForgotPassword={handleForgotPassword}
      onSignUp={handleSignUp}
    />
  );
};

export default Index;

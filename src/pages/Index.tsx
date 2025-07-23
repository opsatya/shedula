import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Index() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-background font-poppins flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-6">
        <h1 className="text-3xl font-bold text-text-primary">
          Welcome to <span className="text-shedula-brand">Shedula</span>
        </h1>
        <p className="text-text-secondary">
          Your healthcare appointment management app
        </p>
        <div className="space-y-4">
          <Button
            onClick={() => navigate("/login")}
            className="w-full h-12 bg-shedula-brand hover:bg-shedula-brand/90 text-white font-semibold text-base rounded-xl"
          >
            Go to Login
          </Button>
        </div>
      </div>
    </div>
  );
}

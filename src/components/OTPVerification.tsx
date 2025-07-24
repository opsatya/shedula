import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export default function OTPVerification() {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(55);
  const [canResend, setCanResend] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleVerify = () => {
    if (otp.length === 4) {
      toast({
        title: "Verification Successful",
        description: "OTP verified successfully!",
      });
      // Add your verification logic here
    } else {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 4-digit OTP code.",
        variant: "destructive",
      });
    }
  };

  const handleResend = () => {
    if (canResend) {
      setTimer(55);
      setCanResend(false);
      setOtp("");
      toast({
        title: "Code Resent",
        description: "A new OTP code has been sent to your phone.",
      });
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-background font-poppins max-w-sm mx-auto">
      {/* Top Bar / Header */}
      <div className="flex items-center justify-between p-4 pt-12">
        <button
          onClick={handleBack}
          className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-accent transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-text-primary" />
        </button>
        <h1 className="text-lg font-semibold text-text-primary absolute left-1/2 transform -translate-x-1/2">
          OTP Code Verification
        </h1>
        <div className="w-10" /> {/* Spacer for balance */}
      </div>

      {/* Main Content */}
      <div className="px-5 pt-16 pb-6">
        {/* Instructional Message */}
        <div className="text-center mb-8">
          <p className="text-text-primary text-base font-normal">
            Code has been sent to +91 111 ******99
          </p>
        </div>

        {/* OTP Input Fields */}
        <div className="flex justify-center mb-6">
          <InputOTP
            maxLength={4}
            value={otp}
            onChange={(value) => setOtp(value)}
            className="gap-3"
          >
            <InputOTPGroup className="gap-3">
              <InputOTPSlot 
                index={0} 
                className="w-12 h-12 text-lg font-semibold border-input-border bg-input-bg data-[is-active=true]:border-shedula-brand data-[is-active=true]:ring-2 data-[is-active=true]:ring-shedula-brand/20 rounded-xl"
              />
              <InputOTPSlot 
                index={1} 
                className="w-12 h-12 text-lg font-semibold border-input-border bg-input-bg data-[is-active=true]:border-shedula-brand data-[is-active=true]:ring-2 data-[is-active=true]:ring-shedula-brand/20 rounded-xl"
              />
              <InputOTPSlot 
                index={2} 
                className="w-12 h-12 text-lg font-semibold border-input-border bg-input-bg data-[is-active=true]:border-shedula-brand data-[is-active=true]:ring-2 data-[is-active=true]:ring-shedula-brand/20 rounded-xl"
              />
              <InputOTPSlot 
                index={3} 
                className="w-12 h-12 text-lg font-semibold border-input-border bg-input-bg data-[is-active=true]:border-shedula-brand data-[is-active=true]:ring-2 data-[is-active=true]:ring-shedula-brand/20 rounded-xl"
              />
            </InputOTPGroup>
          </InputOTP>
        </div>

        {/* Timer Text */}
        <div className="text-center mb-8">
          <p className="text-sm text-text-secondary">
            {canResend ? (
              <button
                onClick={handleResend}
                className="text-shedula-brand font-medium hover:underline"
              >
                Resend Code
              </button>
            ) : (
              <>
                Resend code in{" "}
                <span className="text-shedula-brand font-medium">{timer} s</span>
              </>
            )}
          </p>
        </div>

        {/* Verify Button */}
        <Button
          onClick={handleVerify}
          disabled={otp.length !== 4}
          className="w-full h-12 bg-shedula-brand hover:bg-shedula-brand/90 text-white font-medium text-base rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Verify
        </Button>
      </div>
    </div>
  );
}
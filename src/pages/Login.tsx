import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [isResetMode, setIsResetMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isResetMode) {
        const { error } = await supabase.auth.resetPasswordForEmail(credentials.email, {
          redirectTo: `${window.location.origin}/update-password`,
        });
        
        if (error) {
          toast.error(error.message);
        } else {
          toast.success("Password reset instructions sent to your email");
          setIsResetMode(false);
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: credentials.email,
          password: credentials.password,
        });

        if (error) {
          toast.error(error.message);
        } else {
          toast.success("Login successful");
        }
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-military-navy/10">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-military-navy">
            Military Personnel System
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Email"
                value={credentials.email}
                onChange={(e) =>
                  setCredentials({ ...credentials, email: e.target.value })
                }
                className="w-full"
                disabled={loading}
              />
            </div>
            {!isResetMode && (
              <div className="space-y-2">
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={credentials.password}
                    onChange={(e) =>
                      setCredentials({ ...credentials, password: e.target.value })
                    }
                    className="w-full pr-10"
                    disabled={loading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </Button>
                </div>
              </div>
            )}
            <Button
              type="submit"
              className="w-full bg-military-navy hover:bg-military-navy/90"
              disabled={loading}
            >
              {loading 
                ? isResetMode ? "Sending..." : "Logging in..." 
                : isResetMode ? "Send Reset Instructions" : "Login"
              }
            </Button>
            <div className="flex justify-between items-center mt-4">
              <Button
                type="button"
                variant="link"
                onClick={() => setIsResetMode(!isResetMode)}
                className="text-military-navy"
                disabled={loading}
              >
                {isResetMode ? "Back to Login" : "Forgot Password?"}
              </Button>
              {!isResetMode && (
                <Button
                  type="button"
                  variant="link"
                  onClick={handleRegister}
                  className="text-military-navy"
                  disabled={loading}
                >
                  Register
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
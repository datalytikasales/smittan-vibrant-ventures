import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if user is already logged in
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        // If session exists, check if user is admin before redirecting
        const { data: profile } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', session.user.id)
          .single();
        
        if (profile?.is_admin) {
          navigate("/admin/leads");
        }
      }
    };
    
    checkSession();
  }, [navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isRegistering) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/admin/leads`,
          },
        });
        if (error) throw error;

        toast({
          title: "Registration successful",
          description: "Please check your email to verify your account.",
        });
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          // Handle specific error cases
          if (error.message.includes("Invalid login credentials")) {
            toast({
              variant: "destructive",
              title: "Login failed",
              description: "Invalid email or password. Please try again.",
            });
          } else {
            throw error;
          }
          return;
        }

        // Check if user is admin before redirecting
        if (data.session) {
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('is_admin')
            .eq('id', data.session.user.id)
            .single();
          
          if (profileError) throw profileError;

          if (!profile?.is_admin) {
            toast({
              variant: "destructive",
              title: "Access denied",
              description: "You don't have admin privileges.",
            });
            await supabase.auth.signOut();
            return;
          }

          navigate("/admin/leads");
        }
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter your email address",
      });
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;

      toast({
        title: "Success",
        description: "Password reset instructions sent to your email",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            {isRegistering ? "Register" : "Admin Login"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAuth} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email">Email</label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password">Password</label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait...
                </>
              ) : (
                isRegistering ? "Register" : "Login"
              )}
            </Button>
            <div className="flex justify-between">
              <Button
                type="button"
                variant="link"
                onClick={() => setIsRegistering(!isRegistering)}
                disabled={isLoading}
              >
                {isRegistering ? "Back to Login" : "Need an account?"}
              </Button>
              {!isRegistering && (
                <Button
                  type="button"
                  variant="link"
                  onClick={handleResetPassword}
                  disabled={isLoading}
                >
                  Forgot Password?
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
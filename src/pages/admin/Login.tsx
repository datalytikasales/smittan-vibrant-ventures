import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";
import { PasswordResetDialog } from "@/components/auth/PasswordResetDialog";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [isResetMode, setIsResetMode] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if we're in password reset mode by looking for the access_token in the URL
    const hash = window.location.hash;
    if (hash && hash.includes('access_token')) {
      setIsResetMode(true);
    }

    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('is_admin')
            .eq('id', session.user.id)
            .single();
          
          if (profileError) throw profileError;

          if (profile?.is_admin) {
            navigate("/admin/leads");
          } else {
            await supabase.auth.signOut();
            toast({
              variant: "destructive",
              title: "Access Denied",
              description: "You don't have admin privileges.",
            });
          }
        }
      } catch (error: any) {
        console.error('Session check error:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to check session status.",
        });
      } finally {
        setIsCheckingSession(false);
      }
    };
    
    checkSession();
  }, [navigate, toast]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim(),
      });

      if (error) {
        if (error.message.includes("Email not confirmed")) {
          toast({
            variant: "destructive",
            title: "Email not verified",
            description: "Please check your email and verify your account before logging in.",
          });
        } else {
          toast({
            variant: "destructive",
            title: "Login failed",
            description: "Invalid email or password. Please try again.",
          });
        }
        return;
      }

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

        toast({
          title: "Success",
          description: "Logged in successfully",
        });
        navigate("/admin/leads");
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "An unexpected error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({ 
        password: newPassword 
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Password updated successfully. Please log in with your new password.",
      });
      
      // Clear the URL hash and return to login mode
      window.location.hash = '';
      setIsResetMode(false);
      
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to update password",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isCheckingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            {isResetMode ? "Reset Password" : "Admin Login"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isResetMode ? (
            <form onSubmit={handlePasswordReset} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="new-password">New Password</label>
                <Input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  minLength={6}
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
                    Updating password...
                  </>
                ) : (
                  "Update Password"
                )}
              </Button>
            </form>
          ) : (
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
                  "Login"
                )}
              </Button>
            </form>
          )}
          
          {!isResetMode && (
            <div className="mt-4 text-center">
              <PasswordResetDialog />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
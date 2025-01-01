import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { supabase } from "@/lib/supabase";

export const PasswordResetDialog = () => {
  const [resetEmail, setResetEmail] = useState("");
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [cooldownTime, setCooldownTime] = useState(0);
  const { toast } = useToast();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cooldownTime > 0) {
      toast({
        variant: "destructive",
        title: "Please wait",
        description: `You can request another reset email in ${cooldownTime} seconds.`,
      });
      return;
    }

    setIsResettingPassword(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail.trim(), {
        redirectTo: `${window.location.origin}/admin`,
      });

      if (error) throw error;

      toast({
        title: "Password reset email sent",
        description: "Check your email for the password reset link",
      });
      
      // Start cooldown timer
      setCooldownTime(42);
      const timer = setInterval(() => {
        setCooldownTime((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

    } catch (error: any) {
      if (error.message.includes("rate_limit")) {
        toast({
          variant: "destructive",
          title: "Too many requests",
          description: "Please wait before requesting another reset email.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message || "Failed to send reset email",
        });
      }
    } finally {
      setIsResettingPassword(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="text-sm">
          Forgot Password?
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reset Password</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleResetPassword} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="reset-email">Email</label>
            <Input
              id="reset-email"
              type="email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              required
              disabled={isResettingPassword}
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={isResettingPassword || cooldownTime > 0}
          >
            {isResettingPassword ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending reset link...
              </>
            ) : cooldownTime > 0 ? (
              `Wait ${cooldownTime}s to resend`
            ) : (
              "Send Reset Link"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
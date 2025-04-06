"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuthDetailsContext } from "@/contexts/authContext";
import { supabase } from "@/utils/supabase";
import Link from "next/link";
import { Loader } from "lucide-react";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const { customerDetails } = useAuthDetailsContext();
  console.log(customerDetails);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    setLoading(true);

    // Here you would typically make an API call to authenticate the user
    // For this example, we'll just simulate a successful login
    try {
      // Simulating an API call
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      console.log({ data, error: error?.message });

      // If login is successful, redirect to the home page
      if (!error) router.push("/");
      else setError(error?.message);
    } catch (err) {
      setError("Invalid email or password");
      return err;
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
              placeholder="Enter your password"
            />
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Button
            disabled={loading}
            type="submit"
            className="w-full bg-[#2B7A0B] hover:bg-[#236108]"
          >
            Log In
            {loading && <Loader className="animate-spin" />}
          </Button>
        </form>
        <div className="mt-4 text-center">
          <a href="#" className="text-sm text-[#2B7A0B] hover:underline">
            Forgot password?
          </a>
        </div>
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            {`Don't have an account?`}
            <Link href="/signup" className="text-[#2B7A0B] hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

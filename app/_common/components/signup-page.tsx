"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/utils/supabase";
import Link from "next/link";
import { Loader } from "lucide-react";

export default function SignupPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!firstName || !lastName || !phone || !password) {
      setError("Please fill in all fields");
      return;
    }
    setLoading(true);
    // Here you would typically make an API call to register the user
    // For this example, we'll just simulate a successful registration
    try {
      const { data: authDetails, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) {
        setError(error?.message);
        setLoading(false);
        return null;
      }
      const { error: customerError } = await supabase
        .from("customers")
        .insert({
          first_name: firstName,
          last_name: lastName,
          phone: phone,
          email: email,
          user_id: authDetails?.user?.id,
        })
        .select()
        .single()
        .throwOnError();

      // If registration is successful, redirect to the login page
      if (!customerError) router.push("/");
      else setError(customerError?.message);
    } catch (error) {
      setError("An error occurred during registration. Please try again.");
      return error;
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full"
              placeholder="Enter your first name"
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full"
              placeholder="Enter your last name"
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full"
              placeholder="Enter your phone number"
            />
          </div>
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
              placeholder="Create a password"
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
            Sign Up
            {loading && <Loader className="animate-spin" />}
          </Button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-[#2B7A0B] hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";
import AuthForm from "../AuthForm";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e, email, password) => {
    e.preventDefault();
    const supabase = createClientComponentClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/api/auth/callback`,
      },
    });
    if (error) {
      setError(error.message);
    }

    if (!error) {
      router.push("/verify");
    }
  };
  return (
    <main>
      <h2 className="text-center">Sign up</h2>
      <AuthForm handleSubmit={handleSubmit} />
      {error && <div className="error">{error}</div>}
    </main>
  );
}

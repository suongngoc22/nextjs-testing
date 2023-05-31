"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Form from "@/components/Form";
import Nav from "@/components/Nav";
import { useAuth } from "./AuthContext";

export default function Home() {
  const router = useRouter();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      router.push("/login");
      return;
    }
    router.push("/");
  }, [currentUser]);

  return (
    <main className="w-full">
      <Nav />
      <Form />
    </main>
  );
}

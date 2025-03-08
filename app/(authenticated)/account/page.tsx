"use client";
import Link from "next/link";
import { User } from "lucide-react";
import Header from "@/app/_common/components/header";
import Footer from "@/app/_common/components/footer";

export default function AccountPage() {
  return (
    <>
      <Header />
      <div className="container max-w-6xl py-12 px-4">
        <h1 className="text-4xl font-bold mb-4">Account</h1>

        <div className="flex items-center gap-2 mb-12">
          <User className="h-4 w-4" />
          <Link href="/login" className="text-sm hover:underline">
            Log out
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">Order history</h2>
            <p className="text-muted-foreground">
              You haven&apos;t placed any orders yet.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Account details</h2>
            <Link href="/account/addresses" className="text-sm hover:underline">
              View addresses (0)
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

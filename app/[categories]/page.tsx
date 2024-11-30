"use client";
import React from "react";
import CementPage from "../_common/components/cement-page";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";

function CategoriesPage() {
  const param = useParams();
  const categories = param?.categories;
  if (categories === "cement") {
    return (
      <div>
        <CementPage />
      </div>
    );
  } else {
    return (
      <div className="container mx-auto px-4 gap-4 py-6 h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl">coming soon...</h1>
        <Link href={"/"}>
          <Button className="">Go to Home</Button>
        </Link>
      </div>
    );
  }
}

export default CategoriesPage;

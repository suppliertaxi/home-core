"use client";
import { useParams } from "next/navigation";
import CementPage from "../_common/components/cement-page";
import Footer from "../_common/components/footer";
import Header from "../_common/components/header";
import TilingPage from "../_common/components/tiling-page";

function CategoriesPage() {
  const param = useParams();
  const categories = param?.categories;
  return (
    <>
      {/* Header */}
      <Header />
      {categories === "cement" && <CementPage />}
      {categories === "tiling" && <TilingPage />}
      <Footer />
    </>
  );
}

export default CategoriesPage;

/* eslint-disable @next/next/no-img-element */
"use client";
import { Button } from "@/components/ui/button";
import { useAuthDetailsContext } from "@/contexts/authContext";
import { ArrowLeft, Minus, Plus } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Footer from "../_common/components/footer";
import Header from "../_common/components/header";

function CategoriesPage() {
  const param = useParams();
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("id");
  console.log(categoryId);
  const categories = param?.categories;
  const { items } = useAuthDetailsContext();
  const products =
    items?.filter(({ category_id }) => category_id === categoryId) || [];
  console.log(param, products);

  const [quantities, setQuantities] = useState<{ [key: string]: number }>(
    products.reduce((acc, product) => ({ ...acc, [product.id]: 1 }), {})
  );

  // const categoryId = "5a67sd6asdb8asd8bad8afa";
  // const items = await supabase
  //   .from("items")
  //   .select()
  //   .eq("category_id", categoryId);

  const handleQuantityChange = (productId: string, change: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, prev[productId] + change),
    }));
  };
  const router = useRouter();
  return (
    <>
      {/* Header */}
      <Header />
      <>
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-row items-center gap-2 ">
            <ArrowLeft
              onClick={() => {
                router.replace("/");
              }}
            />
            <h1 className="text-2xl font-bold">
              {decodeURIComponent(String(categories).toLocaleUpperCase())}
            </h1>
          </div>
          {/* <p className="text-sm text-muted-foreground mt-1">
            PPC & OPC53 cement from top brands. Always fresh stock.
          </p> */}

          <div className="flex justify-end mt-6 mb-8">
            <div className="text-sm text-muted-foreground">
              {products.length} products
            </div>
          </div>

          <div className="grid grid-cols-1 max-sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="flex flex-col">
                <div className="relative aspect-[3/4] mb-4">
                  <img
                    src={
                      product.image ||
                      "https://ykrhsjtpgljjxgxgffoh.supabase.co/storage/v1/object/public/cements/Category/product-jpeg-500x500.webp"
                    }
                    alt={product.name || ""}
                    // width={350}
                    // height={477}
                    className="object-cover w-full h-full max-w-[358px] max-h-[477px]"
                  />
                </div>
                <h3 className="font-medium text-sm">{product.name}</h3>
                {/* <p className="text-sm text-muted-foreground">{product.price}</p> */}
                <div className="flex items-baseline gap-2 mt-1">
                  <div className="flex items-center gap-1">
                    <span className="text-sm">Rs.</span>
                    <span className="font-medium">{product?.price}</span>
                  </div>
                  {/* {product.originalPrice && (
                    <>
                      <span className="text-sm text-muted-foreground line-through">
                        Rs. {product.originalPrice.toFixed(2)}
                      </span>
                      <span className="text-sm text-green-600">
                        From Rs. {product.price.toFixed(2)}
                      </span>
                    </>
                  )} */}
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <div className="flex items-center border rounded">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleQuantityChange(product.id, -1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center text-sm">
                      {quantities[product.id]}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleQuantityChange(product.id, 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  <Button className="flex-1 h-8 bg-[#2B7A0B] hover:bg-[#236108] text-sm">
                    ADD
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
      <Footer />
    </>
  );
}

export default CategoriesPage;

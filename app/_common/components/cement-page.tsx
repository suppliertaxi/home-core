"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import * as React from "react";

interface Product {
  id: string;
  name: string;
  weight: string;
  price: number;
  originalPrice?: number;
  image: string;
}

const products: Product[] = [
  {
    id: "1",
    name: "Maha Cement PPC Cement",
    weight: "50 Kg Bag",
    price: 320.0,
    image: "/cements/maha_cement.webp",
  },
  {
    id: "2",
    name: "Priya PPC Cement",
    weight: "50 Kg Bag",
    price: 320.0,
    image: "/cements/priya_cement.webp",
  },
  {
    id: "3",
    name: "UltraTech PPC Cement",
    weight: "50 Kg Bag",
    price: 285.0,
    image: "/cements/ultratech_cement.webp",
  },
  {
    id: "4",
    name: "Birla White Cement",
    weight: "50 Kg Bag",
    price: 35.0,
    originalPrice: 40.0,
    image: "/cements/birla_white_cement1.png",
  },
  {
    id: "5",
    name: "Ramco Supergrade PPC Cement",
    weight: "50 Kg Bag",
    price: 265.0,
    image: "/cements/ramco_cement.webp",
  },
  {
    id: "6",
    name: "Birla Super OPC 53 Grade Cement",
    weight: "50 Kg Bag",
    price: 320.0,
    image: "/cements/birla_super_cement.webp",
  },
  {
    id: "7",
    name: "Maha Cement OPC 53 Grade Cement",
    weight: "50 Kg Bag",
    price: 320.0,
    image: "/cements/maha_cement_53.webp",
  },
  {
    id: "8",
    name: "JSW Enduro Plus Ready Mix Plaster",
    weight: "40 Kg Bag",
    price: 280.0,
    image: "/cements/jsw_cement.webp",
  },
];

export default function CementPage() {
  const [quantities, setQuantities] = React.useState<{ [key: string]: number }>(
    products.reduce((acc, product) => ({ ...acc, [product.id]: 1 }), {})
  );

  const handleQuantityChange = (productId: string, change: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, prev[productId] + change),
    }));
  };
  const router = useRouter();
  return (
    <>
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-row items-center gap-2 ">
          <ArrowLeft
            onClick={() => {
              router.replace("/");
            }}
          />
          <h1 className="text-2xl font-bold">Cement</h1>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          PPC & OPC53 cement from top brands. Always fresh stock.
        </p>

        <div className="flex justify-end mt-6 mb-8">
          <div className="text-sm text-muted-foreground">
            {products.length} products
          </div>
        </div>

        <div className="grid grid-cols-1 max-sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="flex flex-col">
              <div className="relative aspect-[3/4] mb-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={350}
                  height={477}
                  className="object-cover w-full h-full max-w-[358px] max-h-[477px]"
                />
              </div>
              <h3 className="font-medium text-sm">{product.name}</h3>
              <p className="text-sm text-muted-foreground">{product.weight}</p>
              <div className="flex items-baseline gap-2 mt-1">
                <div className="flex items-center gap-1">
                  <span className="text-sm">Rs.</span>
                  <span className="font-medium">
                    {product.price.toFixed(2)}
                  </span>
                </div>
                {product.originalPrice && (
                  <>
                    <span className="text-sm text-muted-foreground line-through">
                      Rs. {product.originalPrice.toFixed(2)}
                    </span>
                    <span className="text-sm text-green-600">
                      From Rs. {product.price.toFixed(2)}
                    </span>
                  </>
                )}
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
  );
}

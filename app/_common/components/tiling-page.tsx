"use client";

import * as React from "react";
import { ArrowLeft, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  hasSize?: boolean;
  hasColor?: boolean;
  size?: string;
  color?: string;
  sizeOptions?: { value: string; price: number }[];
  colorOptions?: { value: string; price: number }[];
}

const products: Product[] = [
  {
    id: "1",
    name: "Roff T01 NCA Floor & Wall Tile Adhesive, Grey, 30 Kg Bag",
    price: 415.0,
    originalPrice: 440.0,
    image: "/tillings/roff_t1.png",
  },
  {
    id: "2",
    name: "MYK Laticrete Latafix 305 Floor & Wall Tile Adhesive, Grey, 30 Kg Bag",
    price: 380.0,
    originalPrice: 400.0,
    image: "/tillings/myk_305.png",
  },
  {
    id: "3",
    name: "Roff T02 NSA Floor & Wall Tile Adhesive, Grey, 30 Kg Bag",
    price: 700.0,
    originalPrice: 720.0,
    image: "/tillings/roff_t2.webp",
  },
  {
    id: "4",
    name: "MYK Laticrete 315 Plus Floor & Wall Tile Adhesive White, 20 Kg Bag",
    price: 660.0,
    originalPrice: 700.0,
    image: "/tillings/myk_315.png",
  },
  {
    id: "5",
    name: "Roff T16 Cera Tile & Ceramic Cleaner",
    price: 180.0,
    hasSize: true,
    size: "1 Litre",
    sizeOptions: [{ value: "1 Litre", price: 180.0 }],
    image: "/tillings/roff_t16.png",
  },
  {
    id: "6",
    name: "MYK Laticrete SP-100 Epoxy Tile Grout",
    price: 675.0,
    hasSize: true,
    hasColor: true,
    size: "1 Kg",
    color: "61 Parchment",
    sizeOptions: [{ value: "1 Kg", price: 675.0 }],
    colorOptions: [{ value: "61 Parchment", price: 750.0 }],
    image: "/tillings/sp_100.png",
  },
  {
    id: "7",
    name: "MYK Laticrete 315 Plus Floor & Wall Tile Adhesive, Grey, 20 Kg Bag",
    price: 550.0,
    originalPrice: 600.0,
    image: "/tillings/myk_315.png",
  },
  {
    id: "8",
    name: "Roff Tiles Spacer, 100 Nos/Pack",
    price: 80.0,
    hasSize: true,
    size: "2mm",
    sizeOptions: [{ value: "2mm", price: 80.0 }],
    image: "/tillings/roff_tiles_spacer.png",
  },
];

export default function TilingPage() {
  const [quantities, setQuantities] = React.useState<{ [key: string]: number }>(
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
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-row items-center gap-2 ">
        <ArrowLeft
          onClick={() => {
            router.replace("/");
          }}
        />
        <h1 className="text-2xl font-bold">Tiling</h1>
      </div>
      <p className="text-sm text-muted-foreground mt-1">
        Tile adhesives, grouts & hardware for all your interior & exterior Tile
        & Stone installation needs.
      </p>

      <div className="flex justify-end mt-6 mb-8">
        <div className="text-sm text-muted-foreground">
          {products.length} products
        </div>
      </div>

      <div className="grid grid-cols-1 max-sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="flex flex-col">
            <div className="relative aspect-square mb-4">
              <Image
                src={product.image}
                alt={product.name}
                width={350}
                height={477}
                className="object-cover w-full h-full max-w-[358px] max-h-[477px]"
              />
            </div>
            <h3 className="font-medium text-sm leading-tight mb-1">
              {product.name}
            </h3>
            <div className="flex items-baseline gap-2 mb-2">
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  Rs. {product.originalPrice.toFixed(2)}
                </span>
              )}
              <div className="flex items-center gap-1">
                {product.hasSize || product.hasColor ? (
                  <span className="text-sm font-medium">
                    From Rs. {product.price.toFixed(2)}
                  </span>
                ) : (
                  <span className="text-sm font-medium">
                    Rs. {product.price.toFixed(2)}
                  </span>
                )}
              </div>
            </div>
            {(product.hasSize || product.hasColor) && (
              <div className="flex flex-col gap-2 mb-2">
                {product.hasSize && (
                  <div className="relative">
                    <Select defaultValue={product.size}>
                      <SelectTrigger className="h-8 text-sm w-full">
                        <SelectValue>
                          {`${product.size} - Rs. ${product.sizeOptions
                            ?.find((opt) => opt.value === product.size)
                            ?.price.toFixed(2)}`}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {product.sizeOptions?.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {`${option.value} - Rs. ${option.price.toFixed(2)}`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                {product.hasColor && (
                  <div className="relative">
                    <Select defaultValue={product.color}>
                      <SelectTrigger className="h-8 text-sm w-full">
                        <SelectValue>
                          {`${product.color} - Rs. ${product.colorOptions
                            ?.find((opt) => opt.value === product.color)
                            ?.price.toFixed(2)}`}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {product.colorOptions?.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {`${option.value} - Rs. ${option.price.toFixed(2)}`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            )}
            <div className="flex items-center gap-2 mt-auto">
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
  );
}

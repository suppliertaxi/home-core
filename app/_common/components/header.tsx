import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Globe, Search, ShoppingCart, User } from "lucide-react";
import Image from "next/image";
import React from "react";

function Header() {
  return (
    <>
      <div className="border-b">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-[#30a6f4] rounded">
              <div className="w-6 h-6">
                <Image width={30} height={30} alt="logo" src={"/logo.jpeg"} />
              </div>
            </div>
            <span className="font-bold text-xl">Suppliertaxi</span>
          </div>

          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden md:flex items-center gap-1"
                >
                  <Globe className="h-4 w-4" />
                  English
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>English</DropdownMenuItem>
                <DropdownMenuItem>Hindi</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              // className="hidden md:inline-flex"
            >
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 p-2 container mx-auto">
        <div className="bg-green-600 text-white px-2 py-1 rounded-md text-sm flex items-center">
          <span className="font-bold">60</span>
          <span className="text-xs ml-1">Mins</span>
        </div>
        <Button variant="ghost" className="text-sm flex items-center gap-1">
          Deliver To
          <span className="font-semibold">560043</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>

      {/* Main Navigation - Desktop Only */}
      <nav className="border-b hidden md:block">
        <div className="container mx-auto px-4">
          <ul className="flex items-center gap-6 overflow-x-auto py-4">
            {[
              "Cement",
              "Electrical Wires",
              "Electrical Conduits & Fittings",
              "Gypsum Partition & False Ceiling",
              "Hardware",
              "Switches & Sockets",
              "Painting",
              "Plumbing",
              "Tiling",
            ].map((item) => (
              <li key={item}>
                <Button variant="ghost" className="text-sm font-medium">
                  {item}
                </Button>
              </li>
            ))}
            <li>
              <Button
                variant="ghost"
                className="text-sm font-medium flex items-center gap-1"
              >
                <Globe className="h-4 w-4" />
                Knowledge Base
              </Button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Free Delivery Banner */}
      <div className="bg-gray-100 py-2 text-center text-sm">
        🎁 Free delivery on orders of ₹4500 or more 🎁
      </div>
    </>
  );
}

export default Header;

"use client";

import { useState } from "react";
import {
  ShoppingCart,
  Search,
  User,
  ChevronDown,
  Globe,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Footer from "./_common/components/footer";

export default function Component() {
  const [bannerIndex, setBannerIndex] = useState(0);
  const banners = [
    "Superfast delivery in minutes ⚡",
    "Get 10% off on your first order!",
    "Free installation on select items",
  ];

  const categories = [
    { name: "Cement", image: "/home_page/cement.png" },
    { name: "Tiling", image: "/home_page/tilings.png" },
    { name: "Painting", image: "/home_page/paintings.png" },
    { name: "Water Proofing", image: "/home_page/water_proofing.png" },
    {
      name: "Plywood, MDF & HDHMR",
      image: "/home_page/playwoods.png",
    },
    { name: "Fevicol", image: "/home_page/fevicols.png" },
    {
      name: "Hettich Hardware",
      image: "/home_page/hettich_hardware.png",
    },
    { name: "Plumbing", image: "/home_page/plumbings.png" },
  ];

  const electricalCategories = [
    {
      name: "Conduits & GI Boxes",
      image: "/home_page/conduits.png",
    },
    { name: "Wires", image: "/home_page/wire.png" },
    {
      name: "Switches & Sockets",
      image: "/home_page/switches.png",
    },
    { name: "Lighting", image: "/home_page/lightings.png" },
  ];

  const features = [
    { title: "Delivery in Minutes", icon: "⚡" },
    { title: "Low Prices", icon: "💰" },
    { title: "Pay on Delivery", icon: "💳" },
    { title: "No Minimum Order", icon: "📦" },
  ];

  const promotionalCards = [
    {
      title: "Hettich Hardware",
      description: "Hinges, Channels at great prices",
      bgColor: "bg-yellow-50",
      image: "/home_page/tools_bar/hettich_hardware.jpg",
    },
    {
      title: "Protection from rain, moisture & leaks",
      description: "Get Dr. Fixit & Asian waterproofing products",
      bgColor: "bg-green-50",
      image: "/home_page/tools_bar/rain_protection.jpg",
    },
    {
      title: "Fevicol for all your needs",
      description: "SH, Marine, HeatX, Hi-PER",
      bgColor: "bg-orange-50",
      image: "/home_page/tools_bar/favicols.jpg",
    },
    {
      title: "Putty & Primers from top brands",
      description: "Get guaranteed lowest prices",
      bgColor: "bg-pink-50",
      image: "/home_page/tools_bar/putty.jpg",
    },
    {
      title: "Fire Retardant Electrical Piping",
      description: "VIP Conduits, metal boxes & fittings",
      bgColor: "bg-purple-50",
      image: "/home_page/tools_bar/piping.jpg",
    },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Yellow Banner - Mobile Only */}
      <div className="md:hidden bg-[#30a6f4] px-4 py-2 flex items-center justify-between">
        <ChevronLeft
          className="h-5 w-5"
          onClick={() =>
            setBannerIndex(
              (prev) => (prev - 1 + banners.length) % banners.length
            )
          }
        />
        <span className="text-sm font-medium">{banners[bannerIndex]}</span>
        <ChevronRight
          className="h-5 w-5"
          onClick={() => setBannerIndex((prev) => (prev + 1) % banners.length)}
        />
      </div>

      {/* Header */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-[#30a6f4] p-2 rounded">
              <div className="w-6 h-6">⚡</div>
            </div>
            <span className="font-bold text-xl">HomeCore</span>
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
              className="hidden md:inline-flex"
            >
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 p-2">
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

      {/* Category Grid */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Civil & Interiors</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <div key={category.name}>
              <div className="bg-white rounded-lg p-2 mb-2 w-full aspect-square flex items-center justify-center">
                <Image
                  src={category.image}
                  alt={category.name}
                  width={180}
                  height={180}
                  className="object-contain"
                />
              </div>
              <div className="text-xs md:text-sm font-medium text-center align-middle justify-center w-full">
                {category.name}
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-6 mt-8">Electrical & Lighting</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {electricalCategories.map((category) => (
            <div key={category.name}>
              <div className="bg-white rounded-lg p-2 mb-2 w-full aspect-square flex items-center justify-center">
                <Image
                  src={category.image}
                  alt={category.name}
                  width={180}
                  height={180}
                  className="object-contain"
                />
              </div>
              <div className="text-xs md:text-sm font-medium text-center align-middle justify-center w-full">
                {category.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Banner - Desktop */}
      <div className="hidden md:block bg-green-50 py-4 z-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {features.map((feature) => (
              <div key={feature.title} className="flex items-center gap-2">
                <span className="text-2xl">{feature.icon}</span>
                <span className="text-sm font-medium">{feature.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Banner - Mobile Only */}
      <div className="md:hidden bg-green-50 py-4 z-20">
        <div className="grid grid-cols-4 gap-2">
          {features.map((feature) => (
            <div key={feature.title} className="flex flex-col items-center">
              <span className="text-xl mb-1">{feature.icon}</span>
              <span className="text-[10px] text-center leading-tight">
                {feature.title}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Promotional Cards Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {promotionalCards.map((card, index) => (
            <div
              key={index}
              className={`${card.bgColor} rounded-lg p-6 flex flex-col justify-between min-h-[200px] relative overflow-hidden`}
            >
              <div className="relative z-10">
                <h3 className="font-semibold text-lg mb-2">{card.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{card.description}</p>
                <Button
                  variant="secondary"
                  className="bg-black text-white hover:bg-gray-800"
                >
                  Shop Now
                </Button>
              </div>
              <div className="absolute right-0 bottom-0 w-32 h-32">
                <Image
                  src={card.image}
                  alt={card.title}
                  width={228}
                  height={228}
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

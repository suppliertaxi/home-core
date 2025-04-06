      import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Instagram } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#30a6f4] py-8">
      <div className="container px-4 mx-auto">
        {/* Newsletter Section */}
        <div className="flex flex-col items-center mb-8 text-center">
          <h2 className="text-lg mb-4">
            Get a first peek at New Products, Special Offers, and so much more.
          </h2>
          <div className="flex w-full max-w-sm gap-2">
            <Input
              type="email"
              placeholder="Email"
              className="bg-transparent border-black/20"
            />
            <Button
              type="submit"
              variant="outline"
              className="border-black/20 hover:bg-black/5"
            >
              →
            </Button>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-4 mb-8">
          <Link href="#" className="hover:opacity-70">
            <Facebook className="h-6 w-6" />
            <span className="sr-only">Facebook</span>
          </Link>
          <Link href="#" className="hover:opacity-70">
            <Instagram className="h-6 w-6" />
            <span className="sr-only">Instagram</span>
          </Link>
        </div>

        {/* Bottom Links */}
        <div className="flex flex-wrap justify-center items-center gap-2 text-sm text-black/80">
          <span>© 2024, suppliertaxi</span>
          <Link href="#" className="hover:underline">
            Powered by Shopify
          </Link>
          <span className="hidden sm:inline">•</span>
          <Link href="#" className="hover:underline">
            Refund policy
          </Link>
          <span className="hidden sm:inline">•</span>
          <Link href="#" className="hover:underline">
            Privacy policy
          </Link>
          <span className="hidden sm:inline">•</span>
          <Link href="#" className="hover:underline">
            Terms of service
          </Link>
          <span className="hidden sm:inline">•</span>
          <Link href="#" className="hover:underline">
            Shipping policy
          </Link>
          <span className="hidden sm:inline">•</span>
          <Link href="#" className="hover:underline">
            Contact information
          </Link>
        </div>
      </div>
    </footer>
  );
}

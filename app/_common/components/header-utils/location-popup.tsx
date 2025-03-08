"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ChevronDown, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/utils/supabse";

export default function DeliveryTimePopup() {
  const [open, setOpen] = useState(false);
  const [currPinCode, setCurrPinCode] = useState<null | string>("");
  const [pincode, setPinCode] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (window != undefined && localStorage) {
      setCurrPinCode(localStorage.getItem("pincode"));
    }
  }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    // Handle the pincode submission logic here
    const { data: store, error } = await supabase
      .from("stores")
      .select("pin")
      .eq("pin", pincode);
    if (error) {
      setErrorMessage(error.message);
      return;
    }
    if (store.length === 0) {
      setErrorMessage("Our stores are not available!");
      return;
    }
    if (store.length) {
      localStorage.setItem("pincode", String(pincode));
      setCurrPinCode(String(pincode));
      setOpen(false);
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center p-6">
      <Button
        onClick={() => setOpen(true)}
        variant="ghost"
        className="text-sm flex items-center gap-1"
      >
        Deliver To
        <span className="font-semibold">{currPinCode || "560046"}</span>
        <ChevronDown className="h-4 w-4" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Delivery Time
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground mb-4">
              Please enter Pincode to check delivery time & serviceability
            </p>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Input
                placeholder="Enter Pincode ex:560046"
                className="flex-1"
                type="text"
                pattern="[0-9]*"
                inputMode="numeric"
                onChange={(e) => {
                  setErrorMessage(e.target.validationMessage);
                  setPinCode(Number(e.target.value));
                  setLoading(false);
                }}
              />

              <Button
                disabled={
                  pincode.toString().length !== 6 || !!errorMessage || loading
                }
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Apply
                {loading && <Loader2 />}
              </Button>
            </form>
            <br />
            {errorMessage && (
              <Alert variant="destructive">
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

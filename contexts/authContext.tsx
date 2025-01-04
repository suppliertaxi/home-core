"use client";
import { Tables } from "@/database.types";
import { supabase } from "@/utils/supabse";
import { Loader2 } from "lucide-react";
import { createContext, useContext, useEffect, useState } from "react";

interface ContextValue {
  fetching: false | true;
  setFetching: (_x: false | true) => void;
  customerDetails: null | Tables<"customers">;
  setCustomerDetails: (_x: Tables<"customers">) => void;
}

const defaultProvider: ContextValue = {
  fetching: true,
  setFetching: () => {},
  customerDetails: null,
  setCustomerDetails: () => {},
};
const AuthDetailsContext = createContext<ContextValue>(defaultProvider);
const useAuthDetailsContext = () => useContext(AuthDetailsContext);
function AuthDetailsProvider({ children }: { children: React.ReactNode }) {
  const [fetching, setFetching] = useState<false | true>(true);
  const [customerDetails, setCustomerDetails] =
    useState<Tables<"customers"> | null>(null);

  const getAuthDetails = async () => {
    const { data: authDetails } = await supabase.auth.getUser();
    if (authDetails.user?.id) {
      console.log(authDetails.user?.id);
      const { data } = await supabase
        .from("customers")
        .select()
        .eq("user_id", authDetails.user?.id)
        .single()
        .throwOnError();

      setCustomerDetails(data);
      setFetching(false);
    } else {
      setFetching(false);
    }
  };

  useEffect(() => {
    getAuthDetails();
  }, []);
  if (fetching)
    return (
      <div className="h-[100vh] w-full justify-center align-middle items-center flex ">
        <p>
          <Loader2 className="animate-spin text-[#30a6f4]" />
        </p>
      </div>
    );
  return (
    <AuthDetailsContext.Provider
      value={{
        fetching,
        setFetching,
        customerDetails,
        setCustomerDetails,
      }}
    >
      {children}
    </AuthDetailsContext.Provider>
  );
}

export { AuthDetailsProvider, useAuthDetailsContext };

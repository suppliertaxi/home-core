"use client";
import { Tables } from "@/database.types";
import { supabase } from "@/utils/supabase";
import { createContext, useContext, useEffect, useState } from "react";

interface ContextValue {
  fetching: false | true;
  setFetching: (_x: false | true) => void;
  customerDetails: null | Tables<"customers">;
  setCustomerDetails: (_x: Tables<"customers">) => void;
  categories: null | Tables<"categories">[];
  setCategories: (_x: Tables<"categories">[] | null) => void;
  items: null | Tables<"items">[];
  setItems: (_x: Tables<"items">[]) => void;
}

const defaultProvider: ContextValue = {
  fetching: true,
  setFetching: () => {},
  customerDetails: null,
  setCustomerDetails: () => {},
  categories: null,
  setCategories: () => {},
  items: null,
  setItems: () => {},
};

const AuthDetailsContext = createContext<ContextValue>(defaultProvider);
const useAuthDetailsContext = () => useContext(AuthDetailsContext);
function AuthDetailsProvider({ children }: { children: React.ReactNode }) {
  const [fetching, setFetching] = useState<false | true>(true);
  const [customerDetails, setCustomerDetails] =
    useState<Tables<"customers"> | null>(null);

  const [categories, setCategories] = useState<Tables<"categories">[] | null>(
    null
  );
  const [items, setItems] = useState<Tables<"items">[] | null>(null);

  const getAuthDetails = async () => {
    const { data: authDetails } = await supabase.auth.getUser();
    if (authDetails.user?.id) {
      const { data: cus } = await supabase
        .from("customers")
        .select()
        .eq("user_id", authDetails.user?.id)
        .single()
        .throwOnError();

      setCustomerDetails(cus);
      await supabase
        .from("categories")
        .select()
        .then(({ data }) => {
          setCategories(data);
        });

      await supabase
        .from("items")
        .select()
        .then(({ data }) => {
          setItems(data);
        });

      setFetching(false);
    } else {
      setFetching(false);
    }
  };

  useEffect(() => {
    getAuthDetails();
  }, []);

  return (
    <AuthDetailsContext.Provider
      value={{
        fetching,
        setFetching,
        customerDetails,
        setCustomerDetails,
        categories,
        setCategories,
        items,
        setItems,
      }}
    >
      {children}
    </AuthDetailsContext.Provider>
  );
}

export { AuthDetailsProvider, useAuthDetailsContext };

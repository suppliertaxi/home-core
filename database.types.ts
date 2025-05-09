export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      cards: {
        Row: {
          created_at: string
          customer_id: string
          id: string
          item_id: string
          quantity: string
        }
        Insert: {
          created_at?: string
          customer_id?: string
          id?: string
          item_id?: string
          quantity: string
        }
        Update: {
          created_at?: string
          customer_id?: string
          id?: string
          item_id?: string
          quantity?: string
        }
        Relationships: [
          {
            foreignKeyName: "cards_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cards_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "items"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          image: string | null
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          image?: string | null
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          image?: string | null
          name?: string
        }
        Relationships: []
      }
      customers: {
        Row: {
          created_at: string
          delivery_loc_id: string | null
          email: string
          first_name: string
          id: string
          last_name: string
          phone: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          delivery_loc_id?: string | null
          email: string
          first_name: string
          id?: string
          last_name: string
          phone: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          delivery_loc_id?: string | null
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          phone?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customers_delivery_loc_id_fkey"
            columns: ["delivery_loc_id"]
            isOneToOne: false
            referencedRelation: "delivery_loc"
            referencedColumns: ["id"]
          },
        ]
      }
      delivery_loc: {
        Row: {
          address: string
          city: string
          created_at: string
          id: string
          near_by: string
          pincode: number
          state: string
        }
        Insert: {
          address: string
          city: string
          created_at?: string
          id?: string
          near_by: string
          pincode: number
          state: string
        }
        Update: {
          address?: string
          city?: string
          created_at?: string
          id?: string
          near_by?: string
          pincode?: number
          state?: string
        }
        Relationships: []
      }
      delivery_loc_relation: {
        Row: {
          customer_id: string | null
          delivery_loc_id: string | null
          id: string | null
        }
        Insert: {
          customer_id?: string | null
          delivery_loc_id?: string | null
          id?: string | null
        }
        Update: {
          customer_id?: string | null
          delivery_loc_id?: string | null
          id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "delivery_loc_relation_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "delivery_loc_relation_delivery_loc_id_fkey"
            columns: ["delivery_loc_id"]
            isOneToOne: false
            referencedRelation: "delivery_loc"
            referencedColumns: ["id"]
          },
        ]
      }
      items: {
        Row: {
          category_id: string | null
          created_at: string
          description: string | null
          discount: string | null
          id: string
          image: string | null
          name: string | null
          price: string | null
        }
        Insert: {
          category_id?: string | null
          created_at?: string
          description?: string | null
          discount?: string | null
          id?: string
          image?: string | null
          name?: string | null
          price?: string | null
        }
        Update: {
          category_id?: string | null
          created_at?: string
          description?: string | null
          discount?: string | null
          id?: string
          image?: string | null
          name?: string | null
          price?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "items_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      stores: {
        Row: {
          created_at: string
          id: number
          location: string | null
          name: string | null
          near_by: string | null
          pin: number | null
          store_admin_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          location?: string | null
          name?: string | null
          near_by?: string | null
          pin?: number | null
          store_admin_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          location?: string | null
          name?: string | null
          near_by?: string | null
          pin?: number | null
          store_admin_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

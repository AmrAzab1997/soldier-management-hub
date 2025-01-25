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
      announcements: {
        Row: {
          content: string
          created_at: string
          created_by: string | null
          id: string
          priority: string | null
          status: string | null
          title: string
        }
        Insert: {
          content: string
          created_at?: string
          created_by?: string | null
          id?: string
          priority?: string | null
          status?: string | null
          title: string
        }
        Update: {
          content?: string
          created_at?: string
          created_by?: string | null
          id?: string
          priority?: string | null
          status?: string | null
          title?: string
        }
        Relationships: []
      }
      cases: {
        Row: {
          assigned_to: string | null
          case_number: string
          created_at: string
          created_by: string | null
          custom_fields: Json | null
          description: string | null
          id: string
          priority: string | null
          status: string | null
          title: string
        }
        Insert: {
          assigned_to?: string | null
          case_number: string
          created_at?: string
          created_by?: string | null
          custom_fields?: Json | null
          description?: string | null
          id?: string
          priority?: string | null
          status?: string | null
          title: string
        }
        Update: {
          assigned_to?: string | null
          case_number?: string
          created_at?: string
          created_by?: string | null
          custom_fields?: Json | null
          description?: string | null
          id?: string
          priority?: string | null
          status?: string | null
          title?: string
        }
        Relationships: []
      }
      custom_fields: {
        Row: {
          created_at: string
          created_by: string | null
          entity_type: string
          field_label: string
          field_name: string
          field_type: string
          id: string
          is_required: boolean | null
          options: Json | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          entity_type: string
          field_label: string
          field_name: string
          field_type: string
          id?: string
          is_required?: boolean | null
          options?: Json | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          entity_type?: string
          field_label?: string
          field_name?: string
          field_type?: string
          id?: string
          is_required?: boolean | null
          options?: Json | null
        }
        Relationships: []
      }
      officers: {
        Row: {
          badge_number: string
          created_at: string
          created_by: string | null
          custom_fields: Json | null
          department: string | null
          first_name: string
          id: string
          last_name: string
          rank: string
          status: string | null
        }
        Insert: {
          badge_number: string
          created_at?: string
          created_by?: string | null
          custom_fields?: Json | null
          department?: string | null
          first_name: string
          id?: string
          last_name: string
          rank: string
          status?: string | null
        }
        Update: {
          badge_number?: string
          created_at?: string
          created_by?: string | null
          custom_fields?: Json | null
          department?: string | null
          first_name?: string
          id?: string
          last_name?: string
          rank?: string
          status?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
        }
        Insert: {
          created_at?: string
          first_name?: string | null
          id: string
          last_name?: string | null
        }
        Update: {
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
        }
        Relationships: []
      }
      soldiers: {
        Row: {
          created_at: string
          created_by: string | null
          custom_fields: Json | null
          first_name: string
          id: string
          last_name: string
          rank: string
          service_number: string
          status: string | null
          unit: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          custom_fields?: Json | null
          first_name: string
          id?: string
          last_name: string
          rank: string
          service_number: string
          status?: string | null
          unit?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          custom_fields?: Json | null
          first_name?: string
          id?: string
          last_name?: string
          rank?: string
          service_number?: string
          status?: string | null
          unit?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: {
          user_id: string
        }
        Returns: Database["public"]["Enums"]["app_role"]
      }
    }
    Enums: {
      app_role: "developer" | "admin" | "user"
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

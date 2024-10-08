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
      appointments: {
        Row: {
          barber_id: number | null
          id: number
          profiles_id: string | null
          service_id: number | null
          time: string
        }
        Insert: {
          barber_id?: number | null
          id?: number
          profiles_id?: string | null
          service_id?: number | null
          time: string
        }
        Update: {
          barber_id?: number | null
          id?: number
          profiles_id?: string | null
          service_id?: number | null
          time?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointments_barber_id_fkey"
            columns: ["barber_id"]
            isOneToOne: false
            referencedRelation: "barbers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_profiles_id_fkey"
            columns: ["profiles_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      barbers: {
        Row: {
          days_off: string[] | null
          email: string
          id: number
          image: string | null
          name: string
          phoneNumber: number
          work_end_time: string | null
          work_start_time: string | null
        }
        Insert: {
          days_off?: string[] | null
          email: string
          id?: number
          image?: string | null
          name: string
          phoneNumber: number
          work_end_time?: string | null
          work_start_time?: string | null
        }
        Update: {
          days_off?: string[] | null
          email?: string
          id?: number
          image?: string | null
          name?: string
          phoneNumber?: number
          work_end_time?: string | null
          work_start_time?: string | null
        }
        Relationships: []
      }
      news: {
        Row: {
          desc: string
          id: number
          timestamp: string
          title: string
        }
        Insert: {
          desc: string
          id?: number
          timestamp: string
          title: string
        }
        Update: {
          desc?: string
          id?: number
          timestamp?: string
          title?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          created_at: string
          id: number
          image: string | null
          name: string
          price: number
          description: string
        }
        Insert: {
          created_at?: string
          id?: number
          image?: string | null
          name: string
          price: number
          description: string
        }
        Update: {
          created_at?: string
          id?: number
          image?: string | null
          name?: string
          price?: number
          description: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          email: string | null
          full_name: string | null
          group: string
          id: string
          phonenumber: string | null
          username: string | null
        }
        Insert: {
          email?: string | null
          full_name?: string | null
          group?: string
          id: string
          phonenumber?: string | null
          username?: string | null
        }
        Update: {
          email?: string | null
          full_name?: string | null
          group?: string
          id?: string
          phonenumber?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          id: number
          image: string | null
          name: string
          price: number
          service_time: number | null
          description: string
        }
        Insert: {
          id?: number
          image?: string | null
          name: string
          price: number
          service_time?: number | null
          description: string
        }
        Update: {
          id?: number
          image?: string | null
          name?: string
          price?: number
          service_time?: number | null
          description: string
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

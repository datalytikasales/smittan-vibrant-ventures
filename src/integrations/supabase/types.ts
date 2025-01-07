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
      company_documents: {
        Row: {
          document_type: string
          file_url: string
          id: string
          original_filename: string
          updated_at: string | null
          uploaded_at: string | null
        }
        Insert: {
          document_type: string
          file_url: string
          id?: string
          original_filename: string
          updated_at?: string | null
          uploaded_at?: string | null
        }
        Update: {
          document_type?: string
          file_url?: string
          id?: string
          original_filename?: string
          updated_at?: string | null
          uploaded_at?: string | null
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          phone: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
        }
        Relationships: []
      }
      gallery_images: {
        Row: {
          caption: string | null
          created_at: string | null
          id: string
          image_url: string
          order_index: number | null
          project_gallery_id: string
        }
        Insert: {
          caption?: string | null
          created_at?: string | null
          id?: string
          image_url: string
          order_index?: number | null
          project_gallery_id: string
        }
        Update: {
          caption?: string | null
          created_at?: string | null
          id?: string
          image_url?: string
          order_index?: number | null
          project_gallery_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "gallery_images_project_gallery_id_fkey"
            columns: ["project_gallery_id"]
            isOneToOne: false
            referencedRelation: "project_gallery"
            referencedColumns: ["id"]
          },
        ]
      }
      job_applicants: {
        Row: {
          applied_at: string | null
          email: string
          id: string
          job_posting_id: string
          name: string
          phone_number: string | null
          resume_url: string
        }
        Insert: {
          applied_at?: string | null
          email: string
          id?: string
          job_posting_id: string
          name: string
          phone_number?: string | null
          resume_url: string
        }
        Update: {
          applied_at?: string | null
          email?: string
          id?: string
          job_posting_id?: string
          name?: string
          phone_number?: string | null
          resume_url?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_applicants_job_posting_id_fkey"
            columns: ["job_posting_id"]
            isOneToOne: false
            referencedRelation: "job_postings"
            referencedColumns: ["id"]
          },
        ]
      }
      job_postings: {
        Row: {
          description: string
          id: string
          is_active: boolean | null
          posted_at: string | null
          qualifications: string
          title: string
          updated_at: string | null
        }
        Insert: {
          description: string
          id?: string
          is_active?: boolean | null
          posted_at?: string | null
          qualifications: string
          title: string
          updated_at?: string | null
        }
        Update: {
          description?: string
          id?: string
          is_active?: boolean | null
          posted_at?: string | null
          qualifications?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          id: string
          is_admin: boolean | null
          updated_at: string | null
        }
        Insert: {
          id: string
          is_admin?: boolean | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          is_admin?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      project_gallery: {
        Row: {
          created_at: string | null
          date: string | null
          description: string | null
          id: string
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          date?: string | null
          description?: string | null
          id?: string
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          date?: string | null
          description?: string | null
          id?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      services_sections: {
        Row: {
          created_at: string | null
          description: string | null
          features: string[] | null
          icon: string | null
          id: string
          order_index: number | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          features?: string[] | null
          icon?: string | null
          id?: string
          order_index?: number | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          features?: string[] | null
          icon?: string | null
          id?: string
          order_index?: number | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          content: string
          created_at: string | null
          id: string
          image_url: string | null
          name: string
          order_index: number | null
          role: string | null
          updated_at: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          image_url?: string | null
          name: string
          order_index?: number | null
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          image_url?: string | null
          name?: string
          order_index?: number | null
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      set_claim: {
        Args: {
          uid: string
          claim: string
          value: string
        }
        Returns: undefined
      }
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

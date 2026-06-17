export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type UserRole = "user" | "mentor" | "admin";
export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";
export type DayOfWeek =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          role: UserRole;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          name: string;
          role?: UserRole;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          role?: UserRole;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "users_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      categories: {
        Row: {
          id: string;
          name: string;
          description: string;
          icon: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          name: string;
          description?: string;
          icon?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          icon?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      mentors: {
        Row: {
          id: string;
          user_id: string | null;
          slug: string;
          name: string;
          profile_image: string;
          profession: string;
          years_experience: number;
          hourly_rate: number;
          currency: string;
          bio: string;
          skills: string[];
          rating: number;
          total_sessions: number;
          location: string;
          featured: boolean;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          slug: string;
          name: string;
          profile_image: string;
          profession: string;
          years_experience: number;
          hourly_rate: number;
          currency?: string;
          bio: string;
          skills?: string[];
          rating?: number;
          total_sessions?: number;
          location?: string;
          featured?: boolean;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          slug?: string;
          name?: string;
          profile_image?: string;
          profession?: string;
          years_experience?: number;
          hourly_rate?: number;
          currency?: string;
          bio?: string;
          skills?: string[];
          rating?: number;
          total_sessions?: number;
          location?: string;
          featured?: boolean;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "mentors_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      mentor_categories: {
        Row: {
          mentor_id: string;
          category_id: string;
        };
        Insert: {
          mentor_id: string;
          category_id: string;
        };
        Update: {
          mentor_id?: string;
          category_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "mentor_categories_mentor_id_fkey";
            columns: ["mentor_id"];
            isOneToOne: false;
            referencedRelation: "mentors";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "mentor_categories_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          },
        ];
      };
      mentor_availability: {
        Row: {
          id: string;
          mentor_id: string;
          day_of_week: DayOfWeek;
          start_time: string;
          end_time: string;
        };
        Insert: {
          id?: string;
          mentor_id: string;
          day_of_week: DayOfWeek;
          start_time: string;
          end_time: string;
        };
        Update: {
          id?: string;
          mentor_id?: string;
          day_of_week?: DayOfWeek;
          start_time?: string;
          end_time?: string;
        };
        Relationships: [
          {
            foreignKeyName: "mentor_availability_mentor_id_fkey";
            columns: ["mentor_id"];
            isOneToOne: false;
            referencedRelation: "mentors";
            referencedColumns: ["id"];
          },
        ];
      };
      bookings: {
        Row: {
          id: string;
          mentor_id: string;
          user_id: string;
          date: string;
          start_time: string;
          end_time: string;
          duration_minutes: number;
          topic: string;
          goals: string;
          status: BookingStatus;
          total_price: number;
          currency: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          mentor_id: string;
          user_id: string;
          date: string;
          start_time: string;
          end_time: string;
          duration_minutes: number;
          topic: string;
          goals: string;
          status?: BookingStatus;
          total_price: number;
          currency?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          mentor_id?: string;
          user_id?: string;
          date?: string;
          start_time?: string;
          end_time?: string;
          duration_minutes?: number;
          topic?: string;
          goals?: string;
          status?: BookingStatus;
          total_price?: number;
          currency?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "bookings_mentor_id_fkey";
            columns: ["mentor_id"];
            isOneToOne: false;
            referencedRelation: "mentors";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "bookings_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      reviews: {
        Row: {
          id: string;
          mentor_id: string;
          user_id: string | null;
          booking_id: string | null;
          author_name: string;
          rating: number;
          comment: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          mentor_id: string;
          user_id?: string | null;
          booking_id?: string | null;
          author_name: string;
          rating: number;
          comment: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          mentor_id?: string;
          user_id?: string | null;
          booking_id?: string | null;
          author_name?: string;
          rating?: number;
          comment?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "reviews_mentor_id_fkey";
            columns: ["mentor_id"];
            isOneToOne: false;
            referencedRelation: "mentors";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "reviews_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "reviews_booking_id_fkey";
            columns: ["booking_id"];
            isOneToOne: true;
            referencedRelation: "bookings";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      user_role: UserRole;
      booking_status: BookingStatus;
      day_of_week: DayOfWeek;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

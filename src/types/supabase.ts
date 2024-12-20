export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          avatar_url?: string | null
          updated_at?: string
        }
      }
      memories: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          image_url: string
          date: string
          privacy: 'public' | 'private' | 'shared'
          category: 'milestone' | 'event' | 'daily'
          metadata: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          title: string
          description?: string | null
          image_url: string
          date: string
          privacy?: 'public' | 'private' | 'shared'
          category?: 'milestone' | 'event' | 'daily'
          metadata?: Json
        }
        Update: {
          title?: string
          description?: string | null
          image_url?: string
          date?: string
          privacy?: 'public' | 'private' | 'shared'
          category?: 'milestone' | 'event' | 'daily'
          metadata?: Json
        }
      }
      tags: {
        Row: {
          id: string
          name: string
          user_id: string
          created_at: string
        }
        Insert: {
          name: string
          user_id: string
        }
        Update: {
          name?: string
        }
      }
      memory_tags: {
        Row: {
          memory_id: string
          tag_id: string
        }
        Insert: {
          memory_id: string
          tag_id: string
        }
        Update: {
          memory_id?: string
          tag_id?: string
        }
      }
    }
  }
}
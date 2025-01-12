export type User = {
  id: string
  email: string
  name: string | null
  avatar_url: string | null
  created_at: string
  role: 'user' | 'admin'
}

export type Profile = {
  id: string
  user_id: string
  bio: string | null
  website: string | null
  location: string | null
}

export type Track = {
  id: string
  title: string
  description: string | null
  url: string
  image_url: string | null
  user_id: string
  created_at: string
  updated_at: string
}

export type Database = {
  public: {
    Tables: {
      users: {
        Row: User
        Insert: Omit<User, 'id' | 'created_at'>
        Update: Partial<Omit<User, 'id' | 'created_at'>>
      }
      profiles: {
        Row: Profile
        Insert: Omit<Profile, 'id'>
        Update: Partial<Omit<Profile, 'id'>>
      }
      tracks: {
        Row: Track
        Insert: Omit<Track, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Track, 'id' | 'created_at' | 'updated_at'>>
      }
    }
  }
} 
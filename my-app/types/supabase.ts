export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          user_type: string | null
          // Add other columns as needed
        }
      }
      // Add other tables as needed
    }
  }
}


// Define an interface for the Task model
export interface task {
  task_id: string; // Custom task identifier (optional)
  title: string;
  description?: string;
  assigned_to?: {
    id: string;
    name: string; // Name of the assigned user
    avatar_url: string; // Avatar URL of the assigned user
  };
  status: string;
  user_id: string;
  due_date?: Date;
  priority: string;
}

export interface taskDoc extends Document {
  created_at: Date;
  updated_at: Date;
}

export interface User {
  id: number;
  name: string;
  university_name: string;
  email: string;
  role: 'student' | 'teacher';
  date_joined: string;
}

export interface Resource {
  id: number;
  title: string;
  description: string;
  file: string;
  uploader: User;
  subject: string;
  topic: string;
  course_code: string;
  tags: Tag[];
  upload_date: string;
  average_rating: number;
}

export interface Tag {
  id: number;
  name: string;
}

export interface Rating {
  id: number;
  resource: number;
  user: User;
  rating_value: number;
}

export interface Comment {
  id: number;
  resource: number;
  user: User;
  content: string;
  created_at: string;
}

export interface AuthResponse {
  user: User;
  access: string;
  refresh: string;
}
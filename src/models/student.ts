export interface Student {
  id?: string;
  name: string;
  age: number;
  mark: number;
  gender: 'male' | 'female';
  city: string;
  created_at?: string;
  updated_at?: string;
}

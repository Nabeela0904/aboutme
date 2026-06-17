export type UserRole = "mentee" | "mentor" | "admin";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: string;
}

export interface AuthSession {
  user: User;
  token: string;
}

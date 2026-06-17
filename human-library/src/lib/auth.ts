import type { Profile, User, UserRole } from "@/types";

export function mapProfileToUser(profile: Profile): User {
  return {
    id: profile.id,
    email: profile.email,
    name: profile.name,
    role: profile.role,
    avatarUrl: profile.avatar_url ?? undefined,
    createdAt: profile.created_at,
  };
}

export function isAdmin(user: User): boolean {
  return user.role === "admin";
}

export function isMentor(user: User): boolean {
  return user.role === "mentor";
}

export function isUser(user: User): boolean {
  return user.role === "user";
}

export function hasRole(user: User, role: UserRole): boolean {
  return user.role === role;
}

export function parseUserRole(value: unknown): UserRole {
  if (value === "user" || value === "mentor" || value === "admin") {
    return value;
  }
  return "user";
}

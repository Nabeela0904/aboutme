import type { User, UserRole } from "@/types";
import { mapUserRowToUser } from "@/types/user";
import { createClient } from "@/lib/supabase/client";

export async function fetchUserById(userId: string): Promise<User | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (error || !data) return null;
  return mapUserRowToUser(data);
}

export async function upsertUser(input: {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}): Promise<User | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("users")
    .upsert({
      id: input.id,
      email: input.email,
      name: input.name,
      role: input.role,
    })
    .select("*")
    .single();

  if (error || !data) return null;
  return mapUserRowToUser(data);
}

/** @deprecated Use fetchUserById */
export const fetchUserProfile = fetchUserById;

/** @deprecated Use upsertUser */
export const upsertUserProfile = upsertUser;

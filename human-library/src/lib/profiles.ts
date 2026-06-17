import type { User, UserRole } from "@/types";
import { mapProfileToUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/client";

export async function fetchUserProfile(userId: string): Promise<User | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error || !data) return null;
  return mapProfileToUser(data);
}

export async function upsertUserProfile(input: {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}): Promise<User | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .upsert({
      id: input.id,
      email: input.email,
      name: input.name,
      role: input.role,
    })
    .select("*")
    .single();

  if (error || !data) return null;
  return mapProfileToUser(data);
}

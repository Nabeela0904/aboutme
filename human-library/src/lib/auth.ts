import type { RegisterInput } from "@/lib/validations";
import type { AuthSession, User } from "@/types";

const USERS_KEY = "hl_users";
const SESSION_KEY = "hl_session";

const DEMO_ADMIN: User = {
  id: "admin-1",
  email: "admin@humanlibrary.app",
  name: "Platform Admin",
  role: "admin",
  createdAt: "2025-01-01T00:00:00Z",
};

function readUsers(): Array<User & { passwordHash: string }> {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(USERS_KEY);
  if (!raw) {
    const seed = [
      { ...DEMO_ADMIN, passwordHash: hashPassword("Admin123!") },
      {
        id: "u-demo-1",
        email: "demo@humanlibrary.app",
        name: "Demo User",
        role: "mentee" as const,
        createdAt: "2025-06-01T00:00:00Z",
        passwordHash: hashPassword("Demo1234"),
      },
    ];
    localStorage.setItem(USERS_KEY, JSON.stringify(seed));
    return seed;
  }
  return JSON.parse(raw);
}

function writeUsers(users: Array<User & { passwordHash: string }>): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function hashPassword(password: string): string {
  return btoa(password);
}

function generateToken(): string {
  return `hl_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
}

export function registerUser(input: RegisterInput): { user: User } | { error: string } {
  const users = readUsers();
  if (users.some((u) => u.email === input.email)) {
    return { error: "An account with this email already exists" };
  }

  const user: User = {
    id: `u-${Date.now()}`,
    email: input.email,
    name: input.name,
    role: input.role,
    createdAt: new Date().toISOString(),
  };

  users.push({ ...user, passwordHash: hashPassword(input.password) });
  writeUsers(users);
  return { user };
}

export function loginUser(
  email: string,
  password: string
): { session: AuthSession } | { error: string } {
  const users = readUsers();
  const match = users.find(
    (u) => u.email === email && u.passwordHash === hashPassword(password)
  );

  if (!match) {
    return { error: "Invalid email or password" };
  }

  const { passwordHash: _password, ...user } = match;
  void _password;
  const session: AuthSession = { user, token: generateToken() };
  if (typeof window !== "undefined") {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }
  return { session };
}

export function getSession(): AuthSession | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  return JSON.parse(raw) as AuthSession;
}

export function saveSession(session: AuthSession): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SESSION_KEY);
}

export function isAdmin(user: User): boolean {
  return user.role === "admin";
}

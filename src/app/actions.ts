'use server';

import { z } from 'zod';
import { cookies } from 'next/headers';

const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export async function login(credentials: z.infer<typeof loginSchema>) {
  const parsedCredentials = loginSchema.safeParse(credentials);

  if (!parsedCredentials.success) {
    return { success: false, error: 'Invalid credentials format.' };
  }

  const { username, password } = parsedCredentials.data;

  // In a real application, these would be in environment variables
  const adminUsername = 'ADMIN';
  const adminPassword = 'Sanu@123';

  if (username === adminUsername && password === adminPassword) {
    cookies().set('auth', 'true', { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    return { success: true };
  }

  return { success: false, error: 'Invalid username or password.' };
}

export async function logout() {
  cookies().delete('auth');
}

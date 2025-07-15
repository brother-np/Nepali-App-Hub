import { cookies } from 'next/headers';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { User, LogOut } from 'lucide-react';
import { logout } from '@/app/actions';
import { redirect } from 'next/navigation';

async function handleLogout() {
  'use server';
  await logout();
  redirect('/login');
}

export function UserStatus() {
  const isAuthenticated = cookies().get('auth')?.value === 'true';

  if (isAuthenticated) {
    return (
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <User className="h-4 w-4" />
          <span>isadmin</span>
        </div>
        <form action={handleLogout}>
          <Button type="submit" variant="ghost" size="sm">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </form>
      </div>
    );
  }

  return (
    <Button asChild variant="ghost">
      <Link href="/login">Admin</Link>
    </Button>
  );
}

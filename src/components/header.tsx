import Link from 'next/link';
import { Button } from './ui/button';
import { PanelsTopLeft } from 'lucide-react';
import { UserStatus } from './admin/user-status';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <PanelsTopLeft className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline sm:inline-block">
              Nepali App Hub
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
            <UserStatus />
        </div>
      </div>
    </header>
  );
}

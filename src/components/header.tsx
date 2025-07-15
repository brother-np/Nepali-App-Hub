import Link from 'next/link';
import { Button } from './ui/button';
import { UserStatus } from './admin/user-status';

const Logo = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 0H100V60H0V0Z"
      fill="#C41E24"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 60H100V100H0V60Z"
      fill="#003594"
    />
    <path
      d="M50 8L25 45H75L50 8Z"
      transform="matrix(1 0 0 -1 0 53)"
      fill="white"
    />
    <path
      d="M2.5 70L50 97.5L97.5 70L50 42.5L2.5 70Z"
      stroke="white"
      strokeWidth="5"
    />
    <path
      d="M2.5 70L50 97.5L97.5 70H2.5Z"
      fill="#003594"
    />
    <path
      d="M25 80L50 92.5L75 80L50 67.5L25 80Z"
      fill="white"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M50 45L-1.90735e-06 82.5V100H100V82.5L50 45ZM20 82.5L50 67.5L80 82.5L50 97.5L20 82.5Z"
      fill="#FFFFFF"
    />
  </svg>
);


export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo />
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

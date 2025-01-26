'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Gift } from 'lucide-react';

export function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path ? 'text-orange-500 underline' : 'text-gray-600 hover:text-orange-500';
  };

  const handleSignUp = () => {
    alert('Sign Up button clicked!');
  };

  const handleLogIn = () => {
    alert('Log In button clicked!');
  };

  return (
    <nav className="bg-white shadow-md py-4 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-orange-500">
          TravelEasy
        </Link>
        <div className="flex items-center space-x-6">
          <Link href="/destinations" className={isActive('/destinations')}>
            Destinations
          </Link>
          <Link href="/travel-agencies" className={isActive('/travel-agencies')}>
            Travel Agencies
          </Link>
          <Link href="/guides" className={isActive('/guides')}>
            Guides
          </Link>
          <Link href="/your-trip" className={isActive('/your-trip')}>
            Your Trip
          </Link>
          <Link href="/win-trip" className={isActive('/win-trip')}>
            <Gift className="w-4 h-4 mr-1 inline-block" />
            Win Trip
          </Link>
          <Link href="/events" className={isActive('/events')}>
            Events
          </Link>
          <Link href="/community" className={isActive('/community')}>
            Community
          </Link>
          <div className="space-x-2">
            <Button variant="outline" onClick={handleSignUp}>Sign Up</Button>
            <Button onClick={handleLogIn}>Log In</Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
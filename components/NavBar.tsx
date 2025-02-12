import Link from 'next/link';

export default function NavBar() {
  return (
    <nav>
      <ul>
        <li><Link href="/login">Login</Link></li>
        <li><Link href="/signup">Sign Up</Link></li>
        <li><Link href="/destinations">Destinations</Link></li>
        <li><Link href="/events">Events</Link></li>
        <li><Link href="/guides">Guides</Link></li>
        <li><Link href="/travel-agencies">Travel Agencies</Link></li>
        <li><Link href="/your-trip">Your Trip</Link></li>
        <li><Link href="/win-trip">Win Trip</Link></li>
        <li><Link href="/community">Community</Link></li>
      </ul>
    </nav>
  );
}
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { href: '/', label: 'Beranda' },
    { href: '/about', label: 'Tentang' },
    { href: '/contact', label: 'Kontak' },
    { href: '/products', label: 'Produk' }, // ✅ Perbaikan
  ];

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>MyApp</div>

      <button className={styles.toggle} onClick={toggleMenu}>
        ☰
      </button>

      <ul className={`${styles.menu} ${isOpen ? styles.show : ''}`}>
        {navItems.map(({ href, label }) => (
          <li
            key={href}
            className={pathname === href ? styles.active : ''}
            onClick={() => setIsOpen(false)} // close menu after click (on mobile)
          >
            <Link href={href}>{label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

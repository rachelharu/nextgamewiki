import Image from 'next/image';
import Link from 'next/link';
import SearchBar from '@/components/SearchBar';
import styles from './Navbar.module.css';

interface NavbarProps {
    showSearch?: boolean;
}

export default function Navbar({ showSearch = true }: NavbarProps) {
    return (
      <div className="hero-head">
      <nav className="navbar">
        <div className="container" id="nav">
          <div className={`navbar-brand ${styles.logoContainer}`}>
            <Link className="navbar-item" href="/">
              <Image 
                id="logo"
                src="/game-control.png"
                alt="Logo"
                width={0}
                height={0}
                style={{ width: 'auto', height: 'auto' }}
              />
            </Link>
            <div className={styles.slideMenu}>
              <Link href="/" className="navbar-item">Home</Link>
              <Link href="/trending" className="navbar-item">Trending</Link>
            </div>
          </div>
          {showSearch && (
            <div className="navbar-end">
              <div className="navbar-item">
                <SearchBar variant="navbar" />
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
    );
}
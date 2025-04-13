import Image from 'next/image';
import Link from 'next/link';
import SearchBar from '@/components/SearchBar';

interface NavbarProps {
    showSearch?: boolean;
}

export default function Navbar({ showSearch = true }: NavbarProps) {
    return (
      <div className="hero-head">
      <nav className="navbar">
        <div className="container" id="nav">
          <div className="navbar-brand">
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
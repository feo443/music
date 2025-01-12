"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-foreground">
            MusicPro
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/discover" className="text-foreground/80 hover:text-foreground">
              Discover
            </Link>
            <Link href="/" className="text-foreground/80 hover:text-foreground">
              Pricing
            </Link>
            <Link href="/community" className="text-foreground/80 hover:text-foreground">
              Community
            </Link>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-background hover:bg-accent"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-4">
              <Link href="/discover" className="text-foreground/80 hover:text-foreground">
                Discover
              </Link>
              <Link href="/upload" className="text-foreground/80 hover:text-foreground">
                Upload
              </Link>
              <Link href="/community" className="text-foreground/80 hover:text-foreground">
                Community
              </Link>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-background hover:bg-accent text-left"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 
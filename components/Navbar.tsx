"use client";

import { useEffect, useRef, useState } from "react";
import logo from "@/public/logo.png";
import { UserProfile } from "@/types/user";

interface Props {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  user: UserProfile;
}

const getInitials = (fullName: string) => {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "U";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
};

export default function Navbar({ searchTerm, onSearchChange, user }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement | null>(null);
  const showDropdown = isHovered || isOpen;

  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (event: MouseEvent) => {
      if (!profileRef.current) return;
      if (!profileRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen]);

  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900">
      <img className="h-8" src={logo.src} alt="WDS" />

      <div className="flex-1 mx-8 relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="w-4 h-4"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </span>
        <input
          type="text"
          id="search"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search..."
          className="w-full bg-zinc-800 text-zinc-200 pl-10 pr-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-sky-600"
        />
      </div>

      <div
        ref={profileRef}
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button
          type="button"
          aria-label="Open profile menu"
          onClick={() => setIsOpen((prev) => !prev)}
          className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center border-2 border-zinc-500 bg-zinc-800 text-zinc-100 font-semibold cursor-pointer"
        >
          {user.avatarUrl ? (
            <img src={user.avatarUrl} alt={user.fullName} className="w-full h-full object-cover" />
          ) : (
            <span>{getInitials(user.fullName)}</span>
          )}
        </button>

        {showDropdown && (
          <div className="absolute right-0 mt-2 w-72 rounded-xl border border-zinc-700 bg-zinc-900 shadow-xl p-4 z-20">
            <p className="text-xs text-zinc-400 mb-1">Full Name</p>
            <p className="text-sm text-zinc-100 mb-3">{user.fullName}</p>
            <p className="text-xs text-zinc-400 mb-1">Username</p>
            <p className="text-sm text-zinc-100 mb-3">@{user.username}</p>
            <p className="text-xs text-zinc-400 mb-1">Email</p>
            <p className="text-sm text-zinc-100 break-all">{user.email}</p>
          </div>
        )}
      </div>
    </div>
  );
}

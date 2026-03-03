"use client";

import logo from "@/public/logo.png";

interface Props {
    searchTerm: string;
    onSearchChange: (value: string) => void;
}

export default function Navbar({ searchTerm, onSearchChange }: Props) {

    return (
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900">
            {/* Logo */}
            <img className="h-8" src={logo.src} alt="WDS" />

            {/* Search */}
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

            {/* Profile */}
            <div className="w-9 h-9 rounded-full flex items-center justify-center border-2 border-zinc-500 cursor-pointer">

            </div>
        </div>
    );
}

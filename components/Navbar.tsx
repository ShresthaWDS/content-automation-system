"use client";

import { useState } from "react";
import logo from "@/public/logo.png";

export default function Navbar() {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900">
            {/* Logo */}
            <img className="h-8" src={logo.src} alt="WDS" />

            {/* Search */}
            <div className="flex-1 mx-8">
                <input
                    type="text"
                    id="search"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Search..."
                    className="w-full bg-zinc-800 text-zinc-200 px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            {/* Profile */}
            <div className="w-9 h-9 rounded-full flex items-center justify-center border-2 border-zinc-500 cursor-pointer">

            </div>
        </div>
    );
}
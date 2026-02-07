"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
    const { data: session } = useSession();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#1a1a1a]">
            <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-[#e50914] text-xl">⚡</span>
                    <span className="text-lg font-bold text-[#e50914] uppercase tracking-wide">CampusHub</span>
                </Link>

                {/* Navigation Links */}
                <div className="hidden md:flex items-center gap-8">
                    <Link href="/events" className="text-[#a0a0a0] hover:text-white transition-colors text-sm">
                        Events
                    </Link>
                    <Link href="/leaderboard" className="text-[#a0a0a0] hover:text-white transition-colors text-sm">
                        Leaderboard
                    </Link>
                    {session && (
                        <Link href="/dashboard" className="text-[#a0a0a0] hover:text-white transition-colors text-sm">
                            Dashboard
                        </Link>
                    )}
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-4">
                    {/* Search Bar */}
                    <div className="hidden sm:flex items-center gap-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#666]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-transparent text-white text-sm placeholder-[#666] outline-none w-40"
                        />
                    </div>

                    {/* Auth Buttons */}
                    {session ? (
                        <div className="flex items-center gap-3">
                            <Link href="/dashboard" className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-[#e50914] rounded-full flex items-center justify-center text-white font-bold text-sm">
                                    {session.user?.name?.charAt(0) || "U"}
                                </div>
                            </Link>
                            <button
                                onClick={() => signOut({ callbackUrl: "/" })}
                                className="px-3 py-1.5 text-[#888] hover:text-white text-sm transition-colors"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link
                            href="/login"
                            className="px-4 py-2 bg-[#e50914] hover:bg-[#b91c1c] text-white text-sm font-medium rounded-lg transition-colors"
                        >
                            LOGIN
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}

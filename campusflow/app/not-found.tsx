"use client";

import Link from "next/link";

export default function NotFound() {
    return (
        <div
            className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center relative overflow-hidden"
            style={{ transform: 'rotate(180deg)' }}
        >
            {/* Floating particles/ash */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-white/20 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                            animationDelay: `${Math.random() * 2}s`,
                        }}
                    />
                ))}
            </div>

            {/* Navbar (inverted at bottom) */}
            <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-md border-t border-[#1a1a1a] py-3 px-6"
                style={{ transform: 'rotate(180deg)' }}>
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-[#e50914] text-xl">⚡</span>
                        <span className="text-lg font-bold text-[#e50914] uppercase tracking-wide">CampusHub</span>
                        <span className="text-[#666] text-xs ml-2">© 1986</span>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-[#666]">
                        <span>Privacy</span>
                        <span>Terms</span>
                        <span>Help</span>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="text-center px-6 relative z-10" style={{ transform: 'rotate(180deg)' }}>
                {/* Large 404 */}
                <div className="text-[12rem] md:text-[16rem] font-black text-[#e50914]/20 leading-none select-none">
                    404
                </div>

                {/* Portal Icon */}
                <div className="text-[#e50914] text-5xl mb-6">
                    ⦿
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-wider">
                    THE <span className="text-[#e50914]">UPSIDE DOWN</span>
                </h1>

                {/* Error Message */}
                <p className="text-[#666] text-sm uppercase tracking-wider mb-2">
                    ERROR: RIFT_NOT_FOUND
                </p>
                <p className="text-[#888] mb-8">
                    This page doesn&apos;t exist in our dimension.
                </p>

                {/* Return Button */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-8 py-4 border-2 border-[#e50914]/50 text-[#e50914] font-bold uppercase tracking-wider hover:bg-[#e50914]/10 transition-colors"
                >
                    ← RETURN TO HAWKINS
                </Link>
            </div>

            {/* Footer becomes Header (at top when inverted) */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#1a1a1a] py-3 px-6"
                style={{ transform: 'rotate(180deg)' }}>
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button className="w-9 h-9 rounded-full bg-[#333] flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#a0a0a0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </button>
                        <div className="hidden sm:flex items-center gap-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#666]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <span className="text-[#666] text-sm">Search...</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-6 text-[#666] text-sm">
                        <span>Profile</span>
                        <span>Map</span>
                        <span>Events</span>
                    </div>
                </div>
            </header>

            <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.2; }
          50% { transform: translateY(-20px) translateX(10px); opacity: 0.5; }
        }
      `}</style>
        </div>
    );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError("ACCESS DENIED: Invalid credentials");
            } else {
                router.push("/dashboard");
            }
        } catch {
            setError("CONNECTION FAILED: Try again later");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
            {/* Minimal Header */}
            <header className="px-6 py-4 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-[#e50914] text-xl">⚡</span>
                    <span className="text-lg font-bold text-white uppercase tracking-wide">CampusHub</span>
                </Link>
                <span className="text-[#22c55e] text-xs font-mono tracking-wider">
                    SECURE_CONNECTION_ESTABLISHED
                </span>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center px-6 py-12">
                <div className="w-full max-w-md">
                    {/* Terminal Status */}
                    <div className="flex justify-between text-[#22c55e] text-xs font-mono mb-4">
                        <div>
                            <p>&gt; SYSTEM.INIT</p>
                            <p>&gt; LOADING PROTOCOLS...</p>
                        </div>
                        <div className="text-right">
                            <p>WARNING: CLASSIFIED</p>
                            <p>LEVEL 4 CLEARANCE</p>
                        </div>
                    </div>

                    {/* Login Box */}
                    <div className="border-2 border-[#e50914]/30 bg-[#0d0d0d] p-8 relative">
                        {/* Corner decorations */}
                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#e50914]" />
                        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#e50914]" />
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#e50914]" />
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#e50914]" />

                        {/* Badge */}
                        <div className="text-center mb-6">
                            <span className="inline-block px-6 py-2 bg-[#e50914] text-white text-xs font-bold tracking-wider uppercase">
                                Restricted Area
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl md:text-5xl font-black text-[#e50914] text-center mb-2 tracking-wider"
                            style={{ textShadow: '0 0 20px rgba(229, 9, 20, 0.5)' }}>
                            THE GATEKEEPER
                        </h1>
                        <p className="text-[#22c55e] text-center text-xs font-mono tracking-widest mb-8">
                            HAWKINS NATIONAL LABORATORY
                        </p>

                        {/* Error Message */}
                        {error && (
                            <div className="mb-6 p-3 border border-[#e50914] bg-[#e50914]/10 text-[#e50914] text-sm font-mono text-center">
                                ⚠ {error}
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email Field */}
                            <div>
                                <label className="flex items-center gap-2 text-[#22c55e] text-sm font-mono mb-2">
                                    <span>👤</span>
                                    <span>IDENTITY</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="agent@campushub.edu"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-[#1a1a1a] border border-[#333] text-[#22c55e] font-mono px-4 py-3 placeholder-[#22c55e]/40 focus:border-[#22c55e] focus:outline-none"
                                    required
                                />
                            </div>

                            {/* Access Code Field */}
                            <div>
                                <label className="flex items-center gap-2 text-[#22c55e] text-sm font-mono mb-2">
                                    <span>🔑</span>
                                    <span>ACCESS CODE</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="••••••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-[#1a1a1a] border border-[#333] text-[#22c55e] font-mono px-4 py-3 placeholder-[#22c55e]/40 focus:border-[#22c55e] focus:outline-none"
                                    required
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-4 bg-[#e50914] hover:bg-[#b91c1c] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold uppercase tracking-wider text-lg transition-colors flex items-center justify-center gap-3"
                                style={{ boxShadow: '0 0 30px rgba(229, 9, 20, 0.4)' }}
                            >
                                {isLoading ? (
                                    <>
                                        AUTHENTICATING...
                                        <span className="animate-spin">⟳</span>
                                    </>
                                ) : (
                                    <>
                                        ENTER THE LABORATORY
                                        <span>⟳</span>
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Footer Links */}
                        <div className="flex justify-between mt-6 text-[#22c55e] text-xs font-mono">
                            <Link href="/register" className="hover:underline">&gt; REQUEST ACCESS</Link>
                            <button className="hover:underline">&gt; FORGOT CREDENTIALS?</button>
                        </div>
                    </div>

                    {/* Demo Credentials */}
                    <div className="mt-6 p-4 border border-[#333] bg-[#111]">
                        <p className="text-[#22c55e] text-xs font-mono mb-2">// TEST CREDENTIALS</p>
                        <div className="text-[#666] text-xs font-mono space-y-1">
                            <p>Admin: admin@campushub.edu / admin123</p>
                            <p>Organizer: organizer@campushub.edu / organizer123</p>
                            <p>Student: mike@campushub.edu / student123</p>
                        </div>
                    </div>

                    {/* Warning */}
                    <div className="text-center mt-8 text-[#e50914] text-xs font-mono space-y-1">
                        <p>UNAUTHORIZED ACCESS IS STRICTLY PROHIBITED.</p>
                        <p>VIOLATORS WILL BE SUBJECT TO IMMEDIATE TERMINATION.</p>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="px-6 py-4 flex items-center justify-between text-[#666] text-xs">
                <span>⚡ SYSTEM © 1984.11.06</span>
                <span>v2.011</span>
            </footer>
        </div>
    );
}

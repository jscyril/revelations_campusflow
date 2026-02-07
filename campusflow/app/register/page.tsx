"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [department, setDepartment] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("PASSWORDS DO NOT MATCH");
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password, department }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Registration failed");
            }

            router.push("/login?registered=true");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Registration failed");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
            {/* Header */}
            <header className="px-6 py-4 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-[#e50914] text-xl">⚡</span>
                    <span className="text-lg font-bold text-white uppercase tracking-wide">CampusHub</span>
                </Link>
            </header>

            {/* Main */}
            <main className="flex-1 flex items-center justify-center px-6 py-12">
                <div className="w-full max-w-md">
                    {/* Box */}
                    <div className="border-2 border-[#22c55e]/30 bg-[#0d0d0d] p-8 relative">
                        {/* Corners */}
                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#22c55e]" />
                        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#22c55e]" />
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#22c55e]" />
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#22c55e]" />

                        <div className="text-center mb-6">
                            <span className="inline-block px-6 py-2 bg-[#22c55e] text-black text-xs font-bold tracking-wider uppercase">
                                New Agent Registration
                            </span>
                        </div>

                        <h1 className="text-3xl font-black text-[#22c55e] text-center mb-2 tracking-wider">
                            REQUEST ACCESS
                        </h1>
                        <p className="text-[#888] text-center text-xs font-mono mb-8">
                            INITIALIZE NEW AGENT PROFILE
                        </p>

                        {error && (
                            <div className="mb-6 p-3 border border-[#e50914] bg-[#e50914]/10 text-[#e50914] text-sm font-mono text-center">
                                ⚠ {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="text-[#22c55e] text-sm font-mono mb-1 block">CODENAME</label>
                                <input
                                    type="text"
                                    placeholder="Your display name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="w-full bg-[#1a1a1a] border border-[#333] text-[#22c55e] font-mono px-4 py-3 placeholder-[#22c55e]/40 focus:border-[#22c55e] focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="text-[#22c55e] text-sm font-mono mb-1 block">EMAIL</label>
                                <input
                                    type="email"
                                    placeholder="agent@campushub.edu"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full bg-[#1a1a1a] border border-[#333] text-[#22c55e] font-mono px-4 py-3 placeholder-[#22c55e]/40 focus:border-[#22c55e] focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="text-[#22c55e] text-sm font-mono mb-1 block">DIVISION</label>
                                <input
                                    type="text"
                                    placeholder="Department or club"
                                    value={department}
                                    onChange={(e) => setDepartment(e.target.value)}
                                    className="w-full bg-[#1a1a1a] border border-[#333] text-[#22c55e] font-mono px-4 py-3 placeholder-[#22c55e]/40 focus:border-[#22c55e] focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="text-[#22c55e] text-sm font-mono mb-1 block">ACCESS CODE</label>
                                <input
                                    type="password"
                                    placeholder="Create a password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full bg-[#1a1a1a] border border-[#333] text-[#22c55e] font-mono px-4 py-3 placeholder-[#22c55e]/40 focus:border-[#22c55e] focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="text-[#22c55e] text-sm font-mono mb-1 block">CONFIRM CODE</label>
                                <input
                                    type="password"
                                    placeholder="Confirm password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    className="w-full bg-[#1a1a1a] border border-[#333] text-[#22c55e] font-mono px-4 py-3 placeholder-[#22c55e]/40 focus:border-[#22c55e] focus:outline-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-4 bg-[#22c55e] hover:bg-[#16a34a] disabled:opacity-50 text-black font-bold uppercase tracking-wider text-lg transition-colors"
                            >
                                {isLoading ? "INITIALIZING..." : "CREATE PROFILE"}
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <Link href="/login" className="text-[#22c55e] text-sm font-mono hover:underline">
                                &gt; ALREADY HAVE ACCESS?
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

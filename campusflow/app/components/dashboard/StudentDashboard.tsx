"use client";

import Link from "next/link";
import { UserData } from "./types"; // We'll define types in a separate file or inline

// Inline interfaces if not imported
interface StudentDashboardProps {
    userData: any; // Using any for now to speed up refactor, or full type
}

export default function StudentDashboard({ userData }: StudentDashboardProps) {
    const getCountdown = (dateStr: string) => {
        const eventDate = new Date(dateStr);
        const now = new Date();
        const diff = eventDate.getTime() - now.getTime();

        if (diff < 0) return "LIVE NOW";

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

        if (days > 0) return `${days}D ${hours}H`;
        return `${hours}:00:00`;
    };

    const defaultBadges = [
        { icon: "✓", color: "#22c55e", unlocked: false },
        { icon: "🎯", color: "#e50914", unlocked: false },
        { icon: "👥", color: "#3b82f6", unlocked: false },
        { icon: "🔥", color: "#f97316", unlocked: false },
        { icon: "📺", color: "#a855f7", unlocked: false },
        { icon: "?", color: "#666", unlocked: false },
    ];

    const getRoleTitle = (role: string) => {
        const titles: Record<string, string> = {
            ADMIN: "DUNGEON MASTER",
            ORGANIZER: "PARTY LEADER",
            STUDENT: "ADVENTURER",
        };
        return titles[role] || "ADVENTURER";
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
                {/* Active Missions */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="flex items-center gap-3 text-xl font-bold text-white">
                            <span className="text-yellow-500">⚡</span>
                            ACTIVE MISSIONS
                        </h2>
                        <span className="text-[#22c55e] text-xs font-mono">[UPLINK_SECURE]</span>
                    </div>

                    {userData?.activeRegistrations && userData.activeRegistrations.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {userData.activeRegistrations.map((reg: any) => (
                                <div key={reg.id} className="bg-[#111] border border-[#2a2a2a] rounded-lg p-5 relative">
                                    <span className="inline-block px-2 py-1 text-xs font-bold rounded mb-3 bg-[#e50914] text-white">
                                        REGISTERED
                                    </span>

                                    <h3 className="text-lg font-bold text-white mb-2">{reg.event.title}</h3>

                                    {/* Countdown */}
                                    <div className="bg-[#0a0a0a] border border-[#2a2a2a] rounded px-4 py-3 flex items-center justify-between mb-4">
                                        <span className="text-[#666] text-xs font-mono">T-MINUS</span>
                                        <span className="text-[#e50914] font-mono font-bold">
                                            {getCountdown(reg.event.date)}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-end">
                                        <Link
                                            href={`/events/${reg.event.id}`}
                                            className="text-white text-sm font-medium hover:text-[#e50914]"
                                        >
                                            VIEW BRIEF &gt;
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-[#111] border border-[#2a2a2a] rounded-lg p-8 text-center">
                            <p className="text-[#888] mb-4">No active missions. Time to explore!</p>
                            <Link
                                href="/events"
                                className="inline-block px-6 py-3 bg-[#e50914] hover:bg-[#b91c1c] text-white font-bold uppercase text-sm rounded transition-colors"
                            >
                                Find Events
                            </Link>
                        </div>
                    )}
                </section>

                {/* Past Adventures */}
                <section>
                    <h2 className="flex items-center gap-3 text-xl font-bold text-white mb-6">
                        <span>📷</span>
                        PAST ADVENTURES
                    </h2>

                    {userData?.pastRegistrations && userData.pastRegistrations.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {userData.pastRegistrations.slice(0, 6).map((reg: any) => (
                                <Link
                                    key={reg.id}
                                    href={`/events/${reg.event.id}`}
                                    className="bg-[#111] border border-[#2a2a2a] rounded-lg overflow-hidden group hover:border-[#e50914] transition-colors"
                                >
                                    <div className="aspect-square bg-gradient-to-br from-[#333] to-[#1a1a1a] relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                        <div className="absolute inset-0 flex items-center justify-center text-4xl opacity-30">
                                            🎮
                                        </div>
                                    </div>
                                    <div className="p-3 text-center">
                                        <h4 className="text-white text-sm font-medium truncate">{reg.event.title}</h4>
                                        <p className="text-[#666] text-xs">
                                            {new Date(reg.event.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-[#111] border border-[#2a2a2a] rounded-lg p-6 text-center">
                            <p className="text-[#888]">No past adventures yet. Start your journey!</p>
                        </div>
                    )}
                </section>
            </div>

            {/* Right Column - Stats */}
            <div className="space-y-6">
                {/* Party Stats */}
                <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-[#3b82f6] to-[#6366f1] px-6 py-4">
                        <h3 className="text-white text-lg font-bold tracking-wider">PARTY STATS</h3>
                    </div>

                    <div className="p-6">
                        {/* Level */}
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-yellow-500 text-sm">
                                LEVEL <span className="text-white font-bold">{String(userData?.level || 1).padStart(2, '0')}</span>
                            </span>
                            <span className="text-[#a855f7] text-sm font-bold">
                                {getRoleTitle(userData?.role || "STUDENT")}
                            </span>
                        </div>
                        <div className="h-2 bg-[#333] rounded-full mb-2 overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-[#a855f7] to-[#6366f1] rounded-full transition-all"
                                style={{
                                    width: `${userData ? ((userData.xp % 1000) / 1000) * 100 : 0}%`
                                }}
                            />
                        </div>
                        <p className="text-[#666] text-xs text-right mb-6">
                            {userData?.xp || 0} / {((userData?.level || 1) * 1000)} XP
                        </p>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-[#111] border border-[#2a2a2a] rounded-lg p-4 text-center">
                                <p className="text-[#666] text-xs mb-1">TOTAL XP</p>
                                <p className="text-2xl font-bold text-white">{userData?.xp?.toLocaleString() || 0}</p>
                            </div>
                            <div className="bg-[#111] border border-[#2a2a2a] rounded-lg p-4 text-center">
                                <p className="text-[#666] text-xs mb-1">EVENTS</p>
                                <p className="text-2xl font-bold text-white">{userData?.stats?.eventsAttended || 0}</p>
                            </div>
                        </div>

                        {/* Badges */}
                        <p className="text-[#666] text-xs text-center mb-3">BADGES EARNED</p>
                        <div className="grid grid-cols-3 gap-2 mb-6">
                            {(userData?.badges && userData.badges.length > 0
                                ? userData.badges.map((badge: any, i: number) => ({
                                    icon: badge.icon,
                                    color: "#22c55e",
                                    unlocked: true
                                }))
                                : defaultBadges
                            ).slice(0, 6).map((badge: any, i: number) => (
                                <div
                                    key={i}
                                    className={`aspect-square rounded-lg flex items-center justify-center text-2xl ${badge.unlocked ? 'bg-[#1a1a1a] border border-[#333]' : 'bg-[#111] border border-[#222] opacity-50'
                                        }`}
                                    style={{ color: badge.color }}
                                >
                                    {badge.icon}
                                </div>
                            ))}
                        </div>

                        <Link
                            href="/leaderboard"
                            className="block w-full py-3 bg-[#6366f1] hover:bg-[#4f46e5] text-white font-bold uppercase text-sm tracking-wider rounded transition-colors text-center"
                        >
                            View Leaderboard
                        </Link>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="bg-[#111] border border-[#2a2a2a] rounded-lg p-4">
                    <h4 className="flex items-center gap-2 text-sm font-bold text-white mb-4">
                        <span className="text-[#22c55e]">📊</span>
                        QUICK STATS
                    </h4>

                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-[#888] text-sm">Events Registered</span>
                            <span className="text-white font-bold">{userData?.stats?.eventsRegistered || 0}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-[#888] text-sm">Events Attended</span>
                            <span className="text-white font-bold">{userData?.stats?.eventsAttended || 0}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-[#888] text-sm">Badges Earned</span>
                            <span className="text-white font-bold">{userData?.stats?.badgesEarned || 0}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

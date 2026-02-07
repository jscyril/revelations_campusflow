"use client";

import { useState } from "react";
import Link from "next/link";
import Footer from "../components/Footer";

const agents = [
    { initials: "WH", name: "Will Hopper", username: "@zombieboy", department: "AV CLUB", deptColor: "#22c55e", clearanceId: "#839-221-HAWK", status: "PRESENT", statusColor: "#22c55e" },
    { initials: "MW", name: "Mike Wheeler", username: "@dungeonmaster", department: "STRATEGY", deptColor: "#3b82f6", clearanceId: "#839-004-HAWK", status: "PENDING", statusColor: "#facc15" },
    { initials: "DS", name: "Dustin Sinclair", username: "@toothless", department: "SCIENCE", deptColor: "#e50914", clearanceId: "#839-118-HAWK", status: "PENDING", statusColor: "#facc15" },
    { initials: "LM", name: "Lucas Sinclair", username: "@ranger", department: "RECON", deptColor: "#a855f7", clearanceId: "#839-092-HAWK", status: "PRESENT", statusColor: "#22c55e" },
    { initials: "EL", name: "Jane Hopper", username: "@eleven", department: "PSYCHIC", deptColor: "#ec4899", clearanceId: "#011-000-LABS", status: "PRESENT", statusColor: "#22c55e" },
    { initials: "MM", name: "Max Mayfield", username: "@madmax", department: "ZOOMER", deptColor: "#f97316", clearanceId: "#839-552-ARC", status: "PENDING", statusColor: "#facc15" },
];

export default function OrganizerPage() {
    const [filter, setFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredAgents = agents.filter((agent) => {
        if (filter === "checked" && agent.status !== "PRESENT") return false;
        if (filter === "pending" && agent.status !== "PENDING") return false;
        if (searchQuery && !agent.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
    });

    const stats = {
        total: 148,
        checkedIn: 86,
        pending: 62,
        departments: 8,
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a]">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#1a1a1a]">
                <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link href="/" className="flex items-center gap-2">
                            <span className="text-[#e50914] text-xl">⚡</span>
                            <span className="text-lg font-bold text-[#e50914] uppercase tracking-wide">CampusHub</span>
                        </Link>
                        <div className="hidden md:flex items-center gap-6">
                            <Link href="/events" className="text-[#a0a0a0] hover:text-white text-sm">Events</Link>
                            <span className="text-white font-medium text-sm border-b-2 border-white pb-1">Organizer</span>
                            <Link href="#" className="text-[#a0a0a0] hover:text-white text-sm">Reports</Link>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="hidden sm:flex items-center gap-2 text-[#e50914] text-sm">
                            <span className="w-2 h-2 bg-[#e50914] rounded-full animate-pulse" />
                            LIVE: HackMatrix 2024
                        </span>
                        <button className="p-2 text-[#a0a0a0]">🔔</button>
                        <div className="w-9 h-9 bg-[#f97316] rounded-full flex items-center justify-center text-white font-bold text-sm">
                            JD
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="pt-24 max-w-7xl mx-auto px-6 pb-12">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                    <div>
                        <p className="text-[#e50914] text-xs font-mono tracking-wider mb-2">RESTRICTED ACCESS</p>
                        <h1 className="text-4xl font-black text-[#e50914] tracking-wide mb-2">AGENT REGISTRY</h1>
                        <p className="text-[#888] max-w-lg">
                            Manage participant access levels and clearance for HackMatrix 2024.
                            Ensure all agents are accounted for before entering the portal.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-3 bg-[#1a1a1a] border border-[#2a2a2a] text-white font-medium rounded-lg hover:bg-[#222]">
                            <span>📱</span>
                            SCAN QR
                        </button>
                        <button className="w-12 h-12 bg-[#e50914] text-white text-2xl font-bold rounded-lg hover:bg-[#b91c1c]">
                            +
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-[#111] border-l-4 border-[#e50914] rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[#666] text-xs uppercase">Total Agents</span>
                            <span className="text-[#e50914]">👥</span>
                        </div>
                        <p className="text-3xl font-bold text-white">{stats.total}</p>
                        <p className="text-[#e50914] text-xs">↗ +12 this hour</p>
                    </div>
                    <div className="bg-[#111] border border-[#2a2a2a] rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[#666] text-xs uppercase">Checked In</span>
                            <span className="text-[#22c55e]">✓</span>
                        </div>
                        <p className="text-3xl font-bold text-white">{stats.checkedIn}</p>
                        <p className="text-[#22c55e] text-xs">58% Capacity</p>
                    </div>
                    <div className="bg-[#111] border border-[#2a2a2a] rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[#666] text-xs uppercase">Pending</span>
                            <span className="text-[#facc15]">⏳</span>
                        </div>
                        <p className="text-3xl font-bold text-white">{stats.pending}</p>
                        <p className="text-[#facc15] text-xs">Awaiting Arrival</p>
                    </div>
                    <div className="bg-[#111] border border-[#2a2a2a] rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[#666] text-xs uppercase">Departments</span>
                            <span className="text-[#a855f7]">🧪</span>
                        </div>
                        <p className="text-3xl font-bold text-white">{String(stats.departments).padStart(2, '0')}</p>
                        <p className="text-[#a855f7] text-xs">Active Units</p>
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-1 flex items-center gap-2 bg-[#111] border border-[#2a2a2a] rounded-lg px-4 py-3">
                        <span className="text-[#666]">🔍</span>
                        <input
                            type="text"
                            placeholder="Search by name or ID..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="flex-1 bg-transparent text-white placeholder-[#666] outline-none"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setFilter("all")}
                            className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${filter === "all" ? "bg-[#e50914] text-white" : "bg-[#111] border border-[#2a2a2a] text-[#888] hover:text-white"
                                }`}
                        >
                            ALL AGENTS
                        </button>
                        <button
                            onClick={() => setFilter("checked")}
                            className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${filter === "checked" ? "bg-[#e50914] text-white" : "bg-[#111] border border-[#2a2a2a] text-[#888] hover:text-white"
                                }`}
                        >
                            CHECKED IN
                        </button>
                        <button
                            onClick={() => setFilter("pending")}
                            className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${filter === "pending" ? "bg-[#e50914] text-white" : "bg-[#111] border border-[#2a2a2a] text-[#888] hover:text-white"
                                }`}
                        >
                            PENDING
                        </button>
                        <button className="px-4 py-3 bg-[#111] border border-[#2a2a2a] text-[#888] rounded-lg text-sm font-medium hover:text-white">
                            ⚙ FILTER
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-[#111] border border-[#2a2a2a] rounded-lg overflow-hidden">
                    {/* Table Header */}
                    <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-[#2a2a2a] text-[#666] text-xs uppercase tracking-wider">
                        <div className="col-span-3">Agent Details</div>
                        <div className="col-span-2">Department</div>
                        <div className="col-span-3">Clearance ID</div>
                        <div className="col-span-2">Status</div>
                        <div className="col-span-2 text-right">Action</div>
                    </div>

                    {/* Table Body */}
                    {filteredAgents.map((agent, i) => (
                        <div key={i} className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-[#1a1a1a] hover:bg-[#1a1a1a]/50 items-center">
                            <div className="col-span-3 flex items-center gap-3">
                                <div className="w-10 h-10 bg-[#333] rounded flex items-center justify-center text-white text-sm font-bold">
                                    {agent.initials}
                                </div>
                                <div>
                                    <p className="text-white font-medium">{agent.name}</p>
                                    <p className="text-[#e50914] text-xs">{agent.username}</p>
                                </div>
                            </div>
                            <div className="col-span-2">
                                <span
                                    className="inline-block px-2 py-1 rounded text-xs font-bold"
                                    style={{ backgroundColor: agent.deptColor, color: 'white' }}
                                >
                                    {agent.department}
                                </span>
                            </div>
                            <div className="col-span-3 text-[#888] font-mono text-sm">
                                {agent.clearanceId}
                            </div>
                            <div className="col-span-2">
                                <span className="flex items-center gap-2" style={{ color: agent.statusColor }}>
                                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: agent.statusColor }} />
                                    {agent.status}
                                </span>
                            </div>
                            <div className="col-span-2 text-right">
                                {agent.status === "PENDING" ? (
                                    <button className="px-3 py-1 bg-[#e50914] text-white text-xs font-bold rounded hover:bg-[#b91c1c]">
                                        CHECK-IN
                                    </button>
                                ) : (
                                    <button className="text-[#666] hover:text-white">⋮</button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-4 text-[#666] text-sm">
                    <span>Showing 1 to 6 of 148 agents</span>
                    <div className="flex items-center gap-2">
                        <button className="p-2 hover:text-white">←</button>
                        <button className="p-2 hover:text-white">→</button>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

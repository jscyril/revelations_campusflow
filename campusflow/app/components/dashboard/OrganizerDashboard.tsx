"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface OrganizerEvent {
    id: string;
    title: string;
    date: string;
    status: string;
    _count: {
        registrations: number;
        checkIns: number;
    };
    slots: number;
}

interface OrganizerStats {
    totalEvents: number;
    totalRegistrations: number;
    totalCheckIns: number;
}

interface Attendee {
    id: string;
    status: string;
    user: {
        id: string;
        name: string;
        email: string;
    };
}

export default function OrganizerDashboard() {
    const [events, setEvents] = useState<OrganizerEvent[]>([]);
    const [stats, setStats] = useState<OrganizerStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [expandedEventId, setExpandedEventId] = useState<string | null>(null);
    const [attendees, setAttendees] = useState<Record<string, Attendee[]>>({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [eventsRes, statsRes] = await Promise.all([
                    fetch("/api/organizer/events"),
                    fetch("/api/organizer/stats"),
                ]);

                if (eventsRes.ok && statsRes.ok) {
                    const eventsData = await eventsRes.json();
                    const statsData = await statsRes.json();
                    setEvents(eventsData.events);
                    setStats(statsData.stats);
                }
            } catch (error) {
                console.error("Error fetching organizer data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const toggleAttendees = async (eventId: string) => {
        if (expandedEventId === eventId) {
            setExpandedEventId(null);
            return;
        }

        setExpandedEventId(eventId);

        if (!attendees[eventId]) {
            try {
                const res = await fetch(`/api/events/${eventId}/register`); // This route returns { registrations: [...] }
                if (res.ok) {
                    const data = await res.json();
                    setAttendees((prev) => ({
                        ...prev,
                        [eventId]: data.registrations,
                    }));
                }
            } catch (error) {
                console.error("Error fetching attendees:", error);
            }
        }
    };

    if (loading) {
        return <div className="text-white animate-pulse">Loading Dashboard...</div>;
    }

    return (
        <div className="space-y-8">
            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#111] border border-[#2a2a2a] rounded-lg p-6 flex flex-col items-center justify-center">
                    <span className="text-4xl mb-2">📅</span>
                    <span className="text-3xl font-bold text-white">{stats?.totalEvents || 0}</span>
                    <span className="text-[#888] text-sm uppercase tracking-wide">Events Created</span>
                </div>
                <div className="bg-[#111] border border-[#2a2a2a] rounded-lg p-6 flex flex-col items-center justify-center">
                    <span className="text-4xl mb-2">👥</span>
                    <span className="text-3xl font-bold text-white">{stats?.totalRegistrations || 0}</span>
                    <span className="text-[#888] text-sm uppercase tracking-wide">Total Registrations</span>
                </div>
                <div className="bg-[#111] border border-[#2a2a2a] rounded-lg p-6 flex flex-col items-center justify-center">
                    <span className="text-4xl mb-2">✅</span>
                    <span className="text-3xl font-bold text-white">{stats?.totalCheckIns || 0}</span>
                    <span className="text-[#888] text-sm uppercase tracking-wide">Total Check-ins</span>
                </div>
            </div>

            {/* Event Management */}
            <section className="bg-[#111] border border-[#2a2a2a] rounded-lg overflow-hidden">
                <div className="bg-[#1a1a1a] px-6 py-4 flex items-center justify-between border-b border-[#2a2a2a]">
                    <h2 className="text-white text-lg font-bold tracking-wider flex items-center gap-2">
                        <span className="text-[#e50914]">⚡</span>
                        YOUR EVENTS
                    </h2>
                    <Link
                        href="/create"
                        className="px-4 py-2 bg-[#e50914] text-white text-xs font-bold uppercase rounded hover:bg-[#b91c1c] transition-colors"
                    >
                        + Create New
                    </Link>
                </div>

                <div className="divide-y divide-[#2a2a2a]">
                    {events.length === 0 ? (
                        <div className="p-8 text-center text-[#888]">
                            You haven't created any events yet.
                        </div>
                    ) : (
                        events.map((event) => (
                            <div key={event.id} className="p-6 hover:bg-[#1a1a1a] transition-colors">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <h3 className="text-white font-bold text-lg">{event.title}</h3>
                                            <span className={`px-2 py-0.5 text-[10px] uppercase font-bold rounded ${event.status === "PUBLISHED" ? "bg-[#22c55e]/20 text-[#22c55e]" :
                                                    event.status === "DRAFT" ? "bg-yellow-500/20 text-yellow-500" :
                                                        "bg-[#666]/20 text-[#666]"
                                                }`}>
                                                {event.status}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-4 text-xs text-[#888]">
                                            <span>📅 {new Date(event.date).toLocaleDateString()}</span>
                                            <span>👥 {event._count.registrations} / {event.slots} Registered</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => toggleAttendees(event.id)}
                                            className="px-4 py-2 bg-[#333] hover:bg-[#444] text-white text-xs font-bold uppercase rounded transition-colors"
                                        >
                                            {expandedEventId === event.id ? "Hide Attendees" : "View Attendees"}
                                        </button>
                                        <Link
                                            href={`/events/${event.id}`}
                                            className="px-3 py-2 text-[#e50914] hover:text-[#b91c1c] text-xs font-bold uppercase"
                                        >
                                            View Page
                                        </Link>
                                    </div>
                                </div>

                                {/* Expanded Attendees List */}
                                {expandedEventId === event.id && (
                                    <div className="mt-4 pl-4 border-l-2 border-[#333] animate-fade-in">
                                        <h4 className="text-[#888] text-xs uppercase mb-3 text-white">Registered Users</h4>
                                        <div className="bg-[#0a0a0a] rounded border border-[#2a2a2a] overflow-hidden max-h-60 overflow-y-auto">
                                            {!attendees[event.id] ? (
                                                <div className="p-4 text-center text-[#666] text-xs">Loading...</div>
                                            ) : attendees[event.id].length === 0 ? (
                                                <div className="p-4 text-center text-[#666] text-xs">No registrations yet.</div>
                                            ) : (
                                                <table className="w-full text-left text-xs">
                                                    <thead className="bg-[#1a1a1a] text-[#888]">
                                                        <tr>
                                                            <th className="p-3 font-medium">Name</th>
                                                            <th className="p-3 font-medium">Email</th>
                                                            <th className="p-3 font-medium">Status</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-[#2a2a2a]">
                                                        {attendees[event.id].map((att) => (
                                                            <tr key={att.id} className="text-white">
                                                                <td className="p-3">{att.user.name}</td>
                                                                <td className="p-3 text-[#888]">{att.user.email}</td>
                                                                <td className="p-3">
                                                                    <span className={`px-2 py-0.5 rounded text-[10px] ${att.status === 'REGISTERED' ? 'bg-[#22c55e]/20 text-[#22c55e]' :
                                                                            att.status === 'CANCELLED' ? 'bg-[#e50914]/20 text-[#e50914]' :
                                                                                'text-white'
                                                                        }`}>
                                                                        {att.status}
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </section>
        </div>
    );
}

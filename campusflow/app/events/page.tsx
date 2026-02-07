"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import FilterTabs from "../components/FilterTabs";
import EventCard from "../components/EventCard";
import Footer from "../components/Footer";
import { categories } from "../data/events";

interface Event {
    id: string;
    title: string;
    category: string;
    date: string;
    time: string;
    location: string;
    heroImage?: string;
    status: string;
    organizer: { name: string };
}

export default function EventsPage() {
    const [activeCategory, setActiveCategory] = useState("all");
    const [events, setEvents] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchEvents() {
            try {
                const params = new URLSearchParams();
                if (activeCategory !== "all") {
                    params.append("category", activeCategory.toUpperCase());
                }

                const response = await fetch(`/api/events?${params}`);
                const data = await response.json();
                setEvents(data.events || []);
            } catch (error) {
                console.error("Failed to fetch events:", error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchEvents();
    }, [activeCategory]);

    const getStatusDisplay = (status: string) => {
        const statusMap: Record<string, { label: string; color: string }> = {
            PUBLISHED: { label: "Active", color: "green" },
            ONGOING: { label: "Live Now", color: "red" },
            DRAFT: { label: "Coming Soon", color: "yellow" },
            ARCHIVED: { label: "Ended", color: "gray" },
        };
        return statusMap[status] || { label: status, color: "gray" };
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a]">
            <Navbar />

            {/* Header */}
            <div className="pt-24 pb-8 px-6 max-w-7xl mx-auto">
                <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">📡</span>
                    <h1 className="text-4xl font-black text-[#e50914]">SIGNAL FREQUENCIES</h1>
                </div>
                <p className="text-[#888]">All active transmissions from the Upside Down</p>
            </div>

            {/* Filters */}
            <div className="max-w-7xl mx-auto px-6 mb-8">
                <FilterTabs
                    categories={categories}
                    activeCategory={activeCategory}
                    onCategoryChange={setActiveCategory}
                />
            </div>

            {/* Events Grid */}
            <section className="max-w-7xl mx-auto px-6 pb-12">
                {isLoading ? (
                    <div className="text-center py-12">
                        <div className="text-[#22c55e] font-mono animate-pulse text-xl">
                            SCANNING FOR SIGNALS...
                        </div>
                    </div>
                ) : events.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-[#666] font-mono text-lg">
                            NO SIGNALS DETECTED
                        </div>
                        <Link href="/create" className="inline-block mt-4 px-6 py-3 bg-[#e50914] text-white font-bold uppercase">
                            Open New Portal
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {events.map((event) => {
                            const statusDisplay = getStatusDisplay(event.status);
                            return (
                                <EventCard
                                    key={event.id}
                                    id={event.id}
                                    title={event.title}
                                    organizer={event.organizer.name}
                                    location={event.location}
                                    image={event.heroImage || "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop"}
                                    date={new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                                    status={statusDisplay.label}
                                    statusColor={statusDisplay.color}
                                />
                            );
                        })}
                    </div>
                )}
            </section>

            <Footer />
        </div>
    );
}

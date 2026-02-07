"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Footer from "../components/Footer";

const categories = [
    { id: "ACADEMIC", label: "Academic" },
    { id: "SOCIAL", label: "Social" },
    { id: "SPORTS", label: "Sports" },
    { id: "CLUB", label: "Club" },
    { id: "HACKATHON", label: "Hackathon" },
];

export default function CreateEventPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [eventTitle, setEventTitle] = useState("");
    const [description, setDescription] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("ACADEMIC");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [location, setLocation] = useState("");
    const [slots, setSlots] = useState("100");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsSubmitting(true);

        try {
            const response = await fetch("/api/events", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: eventTitle,
                    description,
                    category: selectedCategory,
                    date: new Date(`${date}T${time}`).toISOString(),
                    time,
                    location,
                    slots: parseInt(slots),
                    status: "PUBLISHED",
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to create event");
            }

            router.push(`/events/${data.id}`);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to create event");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (status === "loading") {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
                <div className="text-[#22c55e] font-mono animate-pulse text-xl">
                    INITIALIZING PORTAL SYSTEM...
                </div>
            </div>
        );
    }

    if (!session) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center gap-6">
                <div className="text-[#e50914] font-mono text-xl">
                    ⚠ ACCESS DENIED
                </div>
                <p className="text-[#888]">You must be logged in as an Organizer to create events.</p>
                <Link href="/login" className="px-6 py-3 bg-[#e50914] text-white font-bold uppercase tracking-wide">
                    Enter The Laboratory
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a]">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#1a1a1a]">
                <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <span className="text-[#e50914] text-xl">✳</span>
                        <span className="text-lg font-bold text-[#e50914] uppercase tracking-wide">CampusHub</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <span className="text-[#22c55e] text-xs font-mono">
                            {session.user?.email}
                        </span>
                        <div className="w-9 h-9 bg-[#e50914] rounded-full flex items-center justify-center">
                            <span className="text-white text-sm">{session.user?.name?.charAt(0) || "U"}</span>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="pt-24 max-w-3xl mx-auto px-6 pb-12">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="flex items-center gap-3 text-3xl md:text-4xl font-black text-[#e50914] tracking-wide mb-2">
                        <span>📡</span>
                        OPEN A NEW PORTAL
                    </h1>
                    <p className="text-[#888]">Initialize transmission sequence. Breach protocol active.</p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-6 p-4 border border-[#e50914] bg-[#e50914]/10 text-[#e50914] font-mono">
                        ⚠ {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Transmission Details Section */}
                    <section className="bg-[#111] border border-[#2a2a2a] rounded-lg p-6">
                        <h2 className="flex items-center gap-2 text-lg font-bold text-[#e50914] mb-6">
                            <span>📡</span>
                            TRANSMISSION DETAILS
                        </h2>

                        {/* Event Title */}
                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-2">
                                <label className="text-[#888] text-sm uppercase tracking-wide">Signal Name (Event Title)</label>
                                <span className="text-[#e50914] text-xs">*REQUIRED</span>
                            </div>
                            <input
                                type="text"
                                placeholder="Ex: Hawkins High A/V Club Meeting"
                                value={eventTitle}
                                onChange={(e) => setEventTitle(e.target.value)}
                                required
                                className="w-full bg-[#1a1a1a] border border-[#2a2a2a] text-white px-4 py-3 rounded-lg placeholder-[#666] focus:border-[#e50914] focus:outline-none"
                            />
                        </div>

                        {/* Description */}
                        <div className="mb-6">
                            <label className="text-[#888] text-sm uppercase tracking-wide mb-2 block">
                                Decrypted Message (Description)
                            </label>
                            <textarea
                                placeholder="Describe the anomaly..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                rows={4}
                                className="w-full bg-[#1a1a1a] border border-[#2a2a2a] text-white px-4 py-3 rounded-lg placeholder-[#666] focus:border-[#e50914] focus:outline-none resize-none"
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="text-[#888] text-sm uppercase tracking-wide mb-3 block">
                                Frequency Band
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                                {categories.map((cat) => (
                                    <button
                                        key={cat.id}
                                        type="button"
                                        onClick={() => setSelectedCategory(cat.id)}
                                        className={`py-3 px-4 rounded-lg font-medium transition-colors ${selectedCategory === cat.id
                                            ? "bg-[#3b82f6] text-white"
                                            : "bg-[#1a1a1a] border border-[#2a2a2a] text-[#888] hover:text-white"
                                            }`}
                                    >
                                        {cat.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Temporal Coordinates Section */}
                    <section className="bg-[#111] border border-[#2a2a2a] rounded-lg p-6">
                        <h2 className="flex items-center gap-2 text-lg font-bold text-[#e50914] mb-6">
                            <span>⏱</span>
                            TEMPORAL COORDINATES
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            {/* Date */}
                            <div>
                                <label className="text-[#888] text-sm uppercase tracking-wide mb-2 block">
                                    Timeline Entry (Date)
                                </label>
                                <div className="flex items-center gap-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-3">
                                    <span className="text-[#666]">📅</span>
                                    <input
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        required
                                        className="flex-1 bg-transparent text-white focus:outline-none"
                                    />
                                </div>
                            </div>

                            {/* Time */}
                            <div>
                                <label className="text-[#888] text-sm uppercase tracking-wide mb-2 block">
                                    Synchronization Time
                                </label>
                                <div className="flex items-center gap-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-3">
                                    <span className="text-[#666]">⏰</span>
                                    <input
                                        type="time"
                                        value={time}
                                        onChange={(e) => setTime(e.target.value)}
                                        required
                                        className="flex-1 bg-transparent text-white focus:outline-none"
                                    />
                                </div>
                            </div>

                            {/* Slots */}
                            <div>
                                <label className="text-[#888] text-sm uppercase tracking-wide mb-2 block">
                                    Capacity
                                </label>
                                <div className="flex items-center gap-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-3">
                                    <span className="text-[#666]">👥</span>
                                    <input
                                        type="number"
                                        min="1"
                                        max="1000"
                                        value={slots}
                                        onChange={(e) => setSlots(e.target.value)}
                                        className="flex-1 bg-transparent text-white focus:outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Location */}
                        <div className="mb-6">
                            <label className="text-[#888] text-sm uppercase tracking-wide mb-2 block">
                                Geographic Location
                            </label>
                            <div className="flex items-center gap-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-3">
                                <span className="text-[#e50914]">📍</span>
                                <input
                                    type="text"
                                    placeholder="Enter venue or room number..."
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    required
                                    className="flex-1 bg-transparent text-white placeholder-[#666] focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <div className="relative h-48 bg-[#1a1a1a] rounded-lg overflow-hidden">
                            <div className="absolute inset-0 opacity-30"
                                style={{
                                    backgroundImage: 'linear-gradient(#e50914 1px, transparent 1px), linear-gradient(90deg, #e50914 1px, transparent 1px)',
                                    backgroundSize: '20px 20px'
                                }}
                            />
                            <div className="absolute bottom-3 left-3 flex items-center gap-2 text-[#e50914] text-xs font-mono">
                                <span className="w-2 h-2 bg-[#e50914] rounded-full animate-pulse" />
                                SCANNING AREA...
                            </div>
                        </div>
                    </section>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-5 bg-[#e50914] hover:bg-[#b91c1c] disabled:opacity-50 disabled:cursor-not-allowed text-white text-lg font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-3"
                        style={{ boxShadow: '0 0 40px rgba(229, 9, 20, 0.3)' }}
                    >
                        {isSubmitting ? (
                            <>
                                <span className="animate-spin">✳</span>
                                OPENING PORTAL...
                            </>
                        ) : (
                            <>
                                <span>✳</span>
                                OPEN PORTAL
                            </>
                        )}
                    </button>

                    <p className="text-center text-[#666] text-xs">
                        WARNING: OPENING A PORTAL MAY ATTRACT DEMOGORGONS.
                    </p>
                </form>
            </main>

            <Footer />
        </div>
    );
}

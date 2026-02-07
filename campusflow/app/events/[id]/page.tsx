import { notFound } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/app/lib/prisma";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import RegistrationForm from "@/app/components/RegistrationForm";

interface EventPageProps {
    params: Promise<{ id: string }>;
}

async function getEvent(id: string) {
    const event = await prisma.event.findUnique({
        where: { id },
        include: {
            organizer: {
                select: { id: true, name: true, email: true, department: true },
            },
            timeline: {
                orderBy: { sortOrder: "asc" },
            },
            _count: {
                select: { registrations: true },
            },
        },
    });
    return event;
}

export default async function EventPage({ params }: EventPageProps) {
    const { id } = await params;
    const event = await getEvent(id);
    const session = await getServerSession(authOptions);

    if (!event) {
        notFound();
    }

    let isRegistered = false;
    if (session?.user?.email) {
        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
        });

        if (user) {
            const registration = await prisma.registration.findUnique({
                where: {
                    userId_eventId: {
                        eventId: event.id,
                        userId: user.id,
                    },
                },
            });
            isRegistered = !!registration && registration.status !== "CANCELLED";
        }
    }

    const registeredCount = event._count.registrations;
    const slotsRemaining = event.slots - registeredCount;

    return (
        <div className="min-h-screen bg-[#0a0a0a]">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-16">
                {/* Background Image */}
                <div className="relative h-80 overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: `url(${event.heroImage || "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=400&fit=crop"})`,
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />

                    {/* Event Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 max-w-7xl mx-auto">
                        <span className="inline-block px-3 py-1 bg-[#e50914] text-white text-xs font-bold uppercase mb-4">
                            {event.category}
                        </span>
                        <h1 className="text-4xl md:text-5xl font-black text-white mb-2">
                            {event.title}
                        </h1>
                        {event.subtitle && (
                            <p className="text-[#888] text-lg">{event.subtitle}</p>
                        )}
                    </div>
                </div>
            </section>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Mission Brief & Timeline */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Mission Brief */}
                        <section className="bg-[#111] border border-[#2a2a2a] rounded-lg p-6">
                            <h2 className="flex items-center gap-3 text-xl font-bold text-white mb-4">
                                <span className="text-[#e50914]">📋</span>
                                MISSION BRIEF
                            </h2>
                            <p className="text-[#a0a0a0] leading-relaxed">
                                {event.description}
                            </p>

                            {/* Event Details */}
                            <div className="grid grid-cols-2 gap-4 mt-6">
                                <div className="bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg p-4">
                                    <p className="text-[#666] text-xs mb-1">📅 DATE</p>
                                    <p className="text-white font-medium">
                                        {new Date(event.date).toLocaleDateString("en-US", {
                                            weekday: "long",
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </p>
                                </div>
                                <div className="bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg p-4">
                                    <p className="text-[#666] text-xs mb-1">⏰ TIME</p>
                                    <p className="text-white font-medium">{event.time}</p>
                                </div>
                                <div className="bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg p-4">
                                    <p className="text-[#666] text-xs mb-1">📍 LOCATION</p>
                                    <p className="text-white font-medium">{event.location}</p>
                                </div>
                                <div className="bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg p-4">
                                    <p className="text-[#666] text-xs mb-1">💰 ENTRY</p>
                                    <p className="text-white font-medium">
                                        {event.entryFee === 0 ? "FREE" : `$${event.entryFee}`}
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Timeline */}
                        {event.timeline && event.timeline.length > 0 && (
                            <section className="bg-[#111] border border-[#2a2a2a] rounded-lg p-6">
                                <h2 className="flex items-center gap-3 text-xl font-bold text-white mb-6">
                                    <span className="text-[#22c55e]">📡</span>
                                    EVENT TIMELINE
                                </h2>
                                <div className="space-y-4">
                                    {event.timeline.map((item, index) => (
                                        <div
                                            key={item.id}
                                            className={`flex items-start gap-4 ${item.isComplete ? "opacity-60" : ""}`}
                                        >
                                            <div
                                                className={`w-3 h-3 rounded-full mt-1.5 ${item.isComplete
                                                    ? "bg-[#22c55e]"
                                                    : item.isActive
                                                        ? "bg-[#e50914] animate-pulse"
                                                        : "bg-[#444]"
                                                    }`}
                                            />
                                            <div className="flex-1">
                                                <div className="flex justify-between items-center">
                                                    <h3 className={`font-medium ${item.isActive ? "text-[#e50914]" : "text-white"}`}>
                                                        {item.title}
                                                    </h3>
                                                    <span className="text-[#666] text-sm font-mono">{item.time}</span>
                                                </div>
                                                {item.description && (
                                                    <p className="text-[#888] text-sm mt-1">{item.description}</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Right Column - Registration & Host */}
                    <div className="space-y-6">
                        <RegistrationForm
                            eventId={event.id}
                            eventTitle={event.title}
                            slotsRemaining={slotsRemaining}
                            totalSlots={event.slots}
                            isRegistered={isRegistered}
                            status={event.status}
                        />

                        {/* Host Card */}
                        <div className="bg-[#111] border border-[#2a2a2a] rounded-lg p-6">
                            <h3 className="text-[#888] text-xs uppercase tracking-wider mb-4">EVENT ORGANIZER</h3>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-[#e50914] rounded-full flex items-center justify-center text-white font-bold text-lg">
                                    {event.organizer.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-white font-medium">{event.organizer.name}</p>
                                    <p className="text-[#888] text-sm">{event.organizer.department || "Organizer"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

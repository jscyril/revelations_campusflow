import { Event } from "@/app/data/events";

interface EventHeroProps {
    event: Event;
}

export default function EventHero({ event }: EventHeroProps) {
    return (
        <section className="relative min-h-[50vh] flex flex-col items-center justify-center pt-20 overflow-hidden">
            {/* Background with gradient overlay */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-20"
                    style={{ backgroundImage: `url(${event.heroImage})` }}
                />
                {/* Red glow at top */}
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#e50914]/20 to-transparent" />
                {/* Dark gradient at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
                {/* Side vignettes */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
            </div>

            {/* Glowing red lines */}
            <div className="absolute top-20 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#e50914]/50 to-transparent" />
            <div className="absolute top-24 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#e50914]/30 to-transparent" />

            {/* Content */}
            <div className="relative z-10 text-center px-6">
                {/* Status Badge */}
                <div className="mb-4">
                    <span className="inline-flex items-center gap-2 text-[#e50914] text-sm font-medium tracking-wider uppercase">
                        <span className="w-2 h-2 bg-[#e50914] rounded-full animate-pulse" />
                        INCOMING TRANSMISSION
                    </span>
                </div>

                {/* Title */}
                <h1 className="text-5xl md:text-7xl font-black text-[#e50914] glow-red tracking-wider mb-4">
                    {event.title}
                </h1>

                {/* Subtitle */}
                <p className="text-[#a0a0a0] text-lg md:text-xl max-w-2xl mx-auto mb-8">
                    {event.subtitle}
                </p>

                {/* View Trailer Button */}
                <button className="btn-secondary inline-flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                    </svg>
                    VIEW TRAILER
                </button>
            </div>
        </section>
    );
}

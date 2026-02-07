import { Event } from "@/app/data/events";

interface MissionBriefProps {
    event: Event;
}

export default function MissionBrief({ event }: MissionBriefProps) {
    return (
        <section className="bg-[#111] border border-[#2a2a2a] rounded-lg p-6">
            {/* Section Header */}
            <div className="flex items-center gap-3 mb-6">
                <span className="text-[#e50914]">📺</span>
                <h2 className="text-xl font-bold text-white uppercase tracking-wide">
                    Mission Brief
                </h2>
            </div>

            {/* Description */}
            <div className="text-[#a0a0a0] leading-relaxed whitespace-pre-line mb-6">
                {event.description}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-3">
                {event.tags.map((tag, index) => (
                    <span
                        key={index}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-full text-sm text-[#a0a0a0]"
                    >
                        {index === 0 && (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                        )}
                        {index === 1 && (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        )}
                        {index === 2 && (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        )}
                        {tag}
                    </span>
                ))}
            </div>
        </section>
    );
}

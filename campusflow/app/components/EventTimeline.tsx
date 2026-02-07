import { TimelineItem } from "@/app/data/events";

interface EventTimelineProps {
    timeline: TimelineItem[];
}

export default function EventTimeline({ timeline }: EventTimelineProps) {
    return (
        <section>
            {/* Section Header */}
            <div className="flex items-center gap-3 mb-6">
                <span className="text-[#e50914]">⏱</span>
                <h2 className="text-xl font-bold text-white uppercase tracking-wide">
                    Event Sequence
                </h2>
            </div>

            {/* Timeline */}
            <div className="relative">
                {/* Vertical Line */}
                <div className="absolute left-3 top-2 bottom-2 w-px bg-[#2a2a2a]" />

                <div className="space-y-6">
                    {timeline.map((item, index) => (
                        <div key={item.id} className="relative flex gap-6">
                            {/* Dot */}
                            <div className={`relative z-10 w-6 h-6 rounded-full border-2 flex items-center justify-center
                ${item.isActive
                                    ? 'bg-[#e50914] border-[#e50914]'
                                    : item.isComplete
                                        ? 'bg-[#22c55e] border-[#22c55e]'
                                        : 'bg-[#1a1a1a] border-[#2a2a2a]'
                                }`}
                            >
                                {item.isActive && (
                                    <div className="w-2 h-2 bg-white rounded-full" />
                                )}
                            </div>

                            {/* Content */}
                            <div className="flex-1 pb-2">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <h3 className={`font-bold ${item.isActive ? 'text-white' : 'text-[#a0a0a0]'}`}>
                                            {item.title}
                                        </h3>
                                        <p className="text-[#666] text-sm">{item.subtitle}</p>
                                        {item.description && (
                                            <p className="text-[#666] text-sm mt-1">{item.description}</p>
                                        )}
                                    </div>
                                    <span className={`text-sm font-mono whitespace-nowrap px-2 py-1 rounded
                    ${item.isActive
                                            ? 'bg-[#e50914]/20 text-[#e50914]'
                                            : 'text-[#666]'
                                        }`}
                                    >
                                        {item.time}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

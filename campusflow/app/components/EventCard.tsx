import Image from "next/image";
import Link from "next/link";

interface EventCardProps {
    id: string;
    title: string;
    organizer: string;
    location: string;
    image: string;
    date: string;
    status: string;
    statusColor?: string;
}

export default function EventCard({
    id,
    title,
    organizer,
    location,
    image,
    date,
    status,
    statusColor = "#e50914",
}: EventCardProps) {
    return (
        <Link href={`/events/${id}`} className="block">
            <div className="event-card group">
                {/* Image Section */}
                <div className="relative h-44 overflow-hidden">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    {/* Date Badge */}
                    <div className="absolute top-3 right-3">
                        <span className="badge badge-time">{date}</span>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-4">
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#e50914] transition-colors">{title}</h3>

                    <div className="flex items-center gap-2 text-[#a0a0a0] text-sm mb-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span className="uppercase text-xs tracking-wide">{organizer}</span>
                    </div>

                    <div className="flex items-center gap-2 text-[#666] text-sm mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{location}</span>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-[#2a2a2a]">
                        <span className="text-xs font-medium" style={{ color: statusColor }}>
                            {status}
                        </span>
                        <span className="flex items-center gap-1 text-white text-sm font-medium group-hover:text-[#e50914] transition-colors">
                            Join
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

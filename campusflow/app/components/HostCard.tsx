import { HostInfo } from "@/app/data/events";

interface HostCardProps {
    host: HostInfo;
}

export default function HostCard({ host }: HostCardProps) {
    return (
        <div className="bg-[#0d1a0d] border border-[#1a3a1a] rounded-lg p-4 font-mono text-sm">
            {/* Terminal Header */}
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-[#1a3a1a]">
                <span className="text-[#22c55e] text-xs">TERMINAL_v.2.0</span>
                <span className="text-[#22c55e] text-xs">ONLINE</span>
            </div>

            {/* Host Info */}
            <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 bg-[#22c55e]/20 border border-[#22c55e] rounded flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#22c55e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                </div>
                <div>
                    <div className="text-[#22c55e] font-bold">{host.name}</div>
                    <div className="text-[#22c55e]/60 text-xs">{host.department}</div>
                </div>
            </div>

            {/* Terminal Output */}
            <div className="space-y-1 text-[#22c55e]/80 text-xs">
                <p>&gt; HOST_INFO: Top secret research facility.</p>
                <p>&gt; STATUS: {host.status}</p>
                <p>&gt; MSG: {host.message}</p>
            </div>

            {/* Contact Button */}
            <button className="w-full mt-4 py-2 border border-[#22c55e] text-[#22c55e] rounded hover:bg-[#22c55e]/10 transition-colors uppercase text-xs tracking-wide">
                Contact Host
            </button>
        </div>
    );
}

import { Event } from "@/app/data/events";

interface RegistrationPanelProps {
    event: Event;
}

export default function RegistrationPanel({ event }: RegistrationPanelProps) {
    return (
        <div className="bg-[#111] border border-[#2a2a2a] rounded-lg p-6">
            {/* Header */}
            <h3 className="text-xl font-bold text-white uppercase tracking-wide mb-1">
                Enter The Void
            </h3>
            <p className="text-[#e50914] text-sm font-medium mb-6">Capacity Critical</p>

            {/* Stats */}
            <div className="flex justify-between items-start mb-6">
                <div>
                    <div className="text-4xl font-bold text-white">{String(event.slotsRemaining).padStart(2, '0')}</div>
                    <div className="text-xs text-[#666] uppercase tracking-wide">Slots Remaining</div>
                </div>
                <div className="text-right">
                    <div className="text-2xl font-bold text-white">{event.entryFee}</div>
                    <div className="text-xs text-[#666] uppercase tracking-wide">Entry Fee</div>
                </div>
            </div>

            {/* Date & Time */}
            <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-[#a0a0a0]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#e50914]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{event.fullDate}</span>
                </div>
                <div className="flex items-center gap-3 text-[#a0a0a0]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#e50914]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{event.time}</span>
                </div>
            </div>

            {/* Register Button */}
            <button className="w-full py-4 bg-[#e50914] hover:bg-[#b91c1c] text-white font-bold uppercase tracking-wide rounded-lg transition-colors">
                Register Now
            </button>

            {/* Disclaimer */}
            <p className="text-xs text-[#666] text-center mt-4">
                * By registering, you waive liability for interdimensional incidents.
            </p>
        </div>
    );
}

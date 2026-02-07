"use client";

import Link from "next/link";

export default function HeroSection() {
    return (
        <section className="relative min-h-[75vh] flex flex-col items-center justify-center overflow-hidden pt-16">
            {/* Background with atmospheric effects */}
            <div className="absolute inset-0 z-0">
                {/* Dark forest silhouette */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-80"
                    style={{
                        background: `
              linear-gradient(to top, #0a0a0a 0%, transparent 100%),
              url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23111' d='M0,320 L0,280 Q30,180,60,280 L60,320 Z M50,320 L50,250 Q80,120,110,250 L110,320 Z M100,320 L100,270 Q130,140,160,270 L160,320 Z M150,320 L150,260 Q180,130,210,260 L210,320 Z M200,320 L200,280 Q230,160,260,280 L260,320 Z M250,320 L250,250 Q280,100,310,250 L310,320 Z M300,320 L300,270 Q330,150,360,270 L360,320 Z M350,320 L350,265 Q380,140,410,265 L410,320 Z M400,320 L400,280 Q430,170,460,280 L460,320 Z M450,320 L450,255 Q480,110,510,255 L510,320 Z M500,320 L500,275 Q530,155,560,275 L560,320 Z M550,320 L550,260 Q580,130,610,260 L610,320 Z M600,320 L600,285 Q630,175,660,285 L660,320 Z M650,320 L650,250 Q680,105,710,250 L710,320 Z M700,320 L700,270 Q730,145,760,270 L760,320 Z M750,320 L750,265 Q780,135,810,265 L810,320 Z M800,320 L800,280 Q830,165,860,280 L860,320 Z M850,320 L850,255 Q880,115,910,255 L910,320 Z M900,320 L900,275 Q930,150,960,275 L960,320 Z M950,320 L950,260 Q980,125,1010,260 L1010,320 Z M1000,320 L1000,285 Q1030,170,1060,285 L1060,320 Z M1050,320 L1050,250 Q1080,100,1110,250 L1110,320 Z M1100,320 L1100,270 Q1130,140,1160,270 L1160,320 Z M1150,320 L1150,265 Q1180,130,1210,265 L1210,320 Z M1200,320 L1200,280 Q1230,160,1260,280 L1260,320 Z M1250,320 L1250,255 Q1280,110,1310,255 L1310,320 Z M1300,320 L1300,275 Q1330,145,1360,275 L1360,320 Z M1350,320 L1350,260 Q1380,120,1410,260 L1410,320 Z M1400,320 L1400,285 Q1430,165,1440,240 L1440,320 Z'/%3E%3C/svg%3E")
            `,
                        backgroundSize: 'cover',
                        backgroundPosition: 'bottom',
                    }}
                />

                {/* Subtle red glow from top */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#e50914]/5 blur-[120px] rounded-full" />
            </div>

            {/* Christmas Lights */}
            <div className="absolute top-16 left-0 right-0 z-20 overflow-hidden">
                <svg className="w-full h-12" viewBox="0 0 1440 48" preserveAspectRatio="none">
                    <path
                        d="M-20,24 Q100,40 200,24 T400,24 T600,24 T800,24 T1000,24 T1200,24 T1400,24 T1460,24"
                        fill="none"
                        stroke="#222"
                        strokeWidth="2"
                    />
                </svg>
                <div className="absolute top-3 left-0 right-0 flex justify-around px-8">
                    {[...Array(16)].map((_, i) => (
                        <div
                            key={i}
                            className={`w-3 h-3 rounded-full shadow-lg ${["bg-red-500 shadow-red-500/50", "bg-green-500 shadow-green-500/50", "bg-yellow-400 shadow-yellow-400/50", "bg-blue-500 shadow-blue-500/50", "bg-purple-500 shadow-purple-500/50"][i % 5]
                                }`}
                            style={{
                                animation: `twinkle 2s ease-in-out infinite`,
                                animationDelay: `${i * 0.15}s`,
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Warning Badge */}
            <div className="relative z-30 mb-4">
                <span className="inline-flex items-center gap-2 text-yellow-500/80 text-xs font-medium tracking-wider uppercase">
                    <span>⚠</span>
                    CAUTION: HIGH STRANGENESS AREA
                </span>
            </div>

            {/* Main Title */}
            <h1 className="relative z-30 text-center px-4">
                <span className="block text-4xl sm:text-5xl md:text-7xl font-black text-white tracking-wide mb-2" style={{ fontFamily: 'system-ui, sans-serif' }}>
                    EVENTS FROM THE
                </span>
                <span
                    className="block text-4xl sm:text-5xl md:text-7xl font-black tracking-wide italic"
                    style={{
                        color: '#e50914',
                        textShadow: '0 0 20px rgba(229, 9, 20, 0.6), 0 0 40px rgba(229, 9, 20, 0.4), 0 0 60px rgba(229, 9, 20, 0.2)',
                        fontFamily: 'system-ui, sans-serif',
                    }}
                >
                    UPSIDE DOWN
                </span>
            </h1>

            {/* Subtitle */}
            <p className="relative z-30 text-[#888] text-center text-base sm:text-lg mt-6 max-w-lg px-4">
                Find out what&apos;s happening on campus... before it finds you. Join the exploration of the void.
            </p>

            {/* CTA Buttons */}
            <div className="relative z-30 flex flex-wrap items-center justify-center gap-4 mt-8">
                <Link href="/events" className="btn-primary">
                    <span className="text-lg">⊕</span>
                    Explore The Void
                </Link>
                <Link href="/dashboard" className="btn-secondary">
                    View Dashboard
                </Link>
            </div>
        </section>
    );
}

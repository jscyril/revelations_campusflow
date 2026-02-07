"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StudentDashboard from "../components/dashboard/StudentDashboard";
import OrganizerDashboard from "../components/dashboard/OrganizerDashboard";

interface UserData {
    id: string;
    name: string;
    email: string;
    role: string;
    xp: number;
    level: number;
    // ... other fields used by children
}

export default function DashboardPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [userData, setUserData] = useState<any>(null); // Using any for flexibility during refactor
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
            return;
        }

        if (status === "authenticated") {
            fetchUserData();
        }
    }, [status, router]);

    async function fetchUserData() {
        try {
            const response = await fetch("/api/users/me");
            if (response.ok) {
                const data = await response.json();
                setUserData(data);
            }
        } catch (error) {
            console.error("Failed to fetch user data:", error);
        } finally {
            setIsLoading(false);
        }
    }

    if (status === "loading" || isLoading) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
                <div className="text-[#22c55e] font-mono animate-pulse text-xl">
                    LOADING PARTY DATA...
                </div>
            </div>
        );
    }

    const isOrganizer = userData?.role === "ORGANIZER" || userData?.role === "ADMIN";

    return (
        <div className="min-h-screen bg-[#0a0a0a]">
            {/* Navbar */}
            <Navbar />

            {/* Hero Section */}
            <section className="pt-24 pb-8 px-6 max-w-7xl mx-auto">
                <div className="mb-4">
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#22c55e]/20 border border-[#22c55e] rounded-full text-[#22c55e] text-xs font-medium">
                        <span className="w-2 h-2 bg-[#22c55e] rounded-full animate-pulse" />
                        ONLINE
                    </span>
                </div>

                <h1 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-wide">
                    {isOrganizer ? "COMMAND CENTER" : "THE PARTY DASHBOARD"}
                </h1>
                <p className="text-[#888]">
                    Welcome back, {userData?.name || session?.user?.name || "Agent"}.
                    {isOrganizer ? " Ready to manage operations?" : " The campaign continues."}
                </p>
            </section>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 pb-12">
                {isOrganizer ? (
                    <OrganizerDashboard />
                ) : (
                    <StudentDashboard userData={userData} />
                )}
            </main>

            <Footer />
        </div>
    );
}

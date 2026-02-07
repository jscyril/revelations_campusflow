"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface RegistrationFormProps {
    eventId: string;
    eventTitle: string;
    slotsRemaining: number;
    totalSlots: number;
    isRegistered?: boolean;
    status: string;
}

export default function RegistrationForm({
    eventId,
    eventTitle,
    slotsRemaining,
    totalSlots,
    isRegistered = false,
    status,
}: RegistrationFormProps) {
    const { data: session, status: authStatus } = useSession();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [registered, setRegistered] = useState(isRegistered);

    const handleRegister = async () => {
        if (authStatus !== "authenticated") {
            router.push(`/login?callbackUrl=/events/${eventId}`);
            return;
        }

        setIsLoading(true);
        setError("");
        setSuccess("");

        try {
            const response = await fetch(`/api/events/${eventId}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to register");
            }

            setSuccess(`✓ Registered! +${data.xpEarned} XP earned`);
            setRegistered(true);

            // Refresh page to update slot count
            setTimeout(() => router.refresh(), 1500);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to register");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = async () => {
        setIsLoading(true);
        setError("");

        try {
            const response = await fetch(`/api/events/${eventId}/register`, {
                method: "DELETE",
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to cancel");
            }

            setSuccess("Registration cancelled");
            setRegistered(false);
            setTimeout(() => router.refresh(), 1500);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to cancel");
        } finally {
            setIsLoading(false);
        }
    };

    const isEventFull = slotsRemaining <= 0;
    const isEventOpen = status === "PUBLISHED";

    return (
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg overflow-hidden">
            <div className="bg-gradient-to-r from-[#e50914] to-[#b91c1c] px-6 py-4">
                <h3 className="text-white text-lg font-bold tracking-wider">REGISTRATION</h3>
            </div>

            <div className="p-6">
                {/* Slots Progress */}
                <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-[#888] text-sm">Slots Remaining</span>
                        <span className="text-white font-bold">{slotsRemaining} / {totalSlots}</span>
                    </div>
                    <div className="h-2 bg-[#333] rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-[#22c55e] to-[#16a34a] rounded-full transition-all"
                            style={{ width: `${(slotsRemaining / totalSlots) * 100}%` }}
                        />
                    </div>
                </div>

                {/* Status Badge */}
                <div className="bg-[#111] border border-[#2a2a2a] rounded-lg p-4 mb-6 text-center">
                    {registered ? (
                        <span className="text-[#22c55e] text-lg font-bold">✓ YOU&apos;RE REGISTERED</span>
                    ) : isEventFull ? (
                        <span className="text-[#e50914] text-lg font-bold">EVENT FULL</span>
                    ) : isEventOpen ? (
                        <span className="text-[#22c55e] text-lg font-bold">OPEN FOR REGISTRATION</span>
                    ) : (
                        <span className="text-[#888] text-lg font-bold">{status}</span>
                    )}
                </div>

                {/* Error/Success Messages */}
                {error && (
                    <div className="bg-[#e50914]/20 border border-[#e50914] rounded-lg p-3 mb-4">
                        <p className="text-[#e50914] text-sm text-center">{error}</p>
                    </div>
                )}
                {success && (
                    <div className="bg-[#22c55e]/20 border border-[#22c55e] rounded-lg p-3 mb-4">
                        <p className="text-[#22c55e] text-sm text-center">{success}</p>
                    </div>
                )}

                {/* Action Buttons */}
                {registered ? (
                    <button
                        onClick={handleCancel}
                        disabled={isLoading}
                        className="w-full py-4 bg-[#333] hover:bg-[#444] text-white font-bold uppercase tracking-wider rounded transition-colors disabled:opacity-50"
                    >
                        {isLoading ? "PROCESSING..." : "CANCEL REGISTRATION"}
                    </button>
                ) : (
                    <button
                        onClick={handleRegister}
                        disabled={isLoading || isEventFull || !isEventOpen}
                        className="w-full py-4 bg-[#e50914] hover:bg-[#b91c1c] text-white font-bold uppercase tracking-wider rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? "REGISTERING..." :
                            authStatus !== "authenticated" ? "LOGIN TO REGISTER" :
                                isEventFull ? "EVENT FULL" :
                                    "REGISTER NOW"}
                    </button>
                )}

                {/* Login Prompt */}
                {authStatus !== "authenticated" && !registered && (
                    <p className="text-[#888] text-xs text-center mt-4">
                        You must be logged in to register for this event
                    </p>
                )}
            </div>
        </div>
    );
}

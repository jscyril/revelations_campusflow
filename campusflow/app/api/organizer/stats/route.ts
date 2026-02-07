import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "@/app/lib/prisma";

// GET /api/organizer/stats - Fetch aggregate stats for the organizer
export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
        });

        if (!user || (user.role !== "ORGANIZER" && user.role !== "ADMIN")) {
            return NextResponse.json(
                { error: "Access denied. Organizer role required." },
                { status: 403 }
            );
        }

        // Get total events
        const totalEvents = await prisma.event.count({
            where: { organizerId: user.id },
        });

        // Get total registrations across all events
        // We can do this by finding all events first, but aggregate over registrations related to those events is tricky in one query if relations aren't direct.
        // Actually, we can sum registrations through events.
        // Or query registrations where event.organizerId is user.id
        const totalRegistrations = await prisma.registration.count({
            where: {
                event: {
                    organizerId: user.id,
                },
            },
        });

        // Get total check-ins
        const totalCheckIns = await prisma.checkIn.count({
            where: {
                event: {
                    organizerId: user.id,
                },
            },
        });

        // Calculate average attendance rate? (maybe later)

        return NextResponse.json({
            stats: {
                totalEvents,
                totalRegistrations,
                totalCheckIns,
            },
        });
    } catch (error) {
        console.error("Error fetching organizer stats:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

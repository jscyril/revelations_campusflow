import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "@/app/lib/prisma";

// GET /api/organizer/events - Fetch events created by the logged-in organizer
export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Verify role is ORGANIZER or ADMIN
        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
        });

        if (!user || (user.role !== "ORGANIZER" && user.role !== "ADMIN")) {
            return NextResponse.json(
                { error: "Access denied. Organizer role required." },
                { status: 403 }
            );
        }

        const events = await prisma.event.findMany({
            where: { organizerId: user.id },
            include: {
                _count: {
                    select: {
                        registrations: true,
                        checkIns: true,
                    },
                },
            },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json({ events });
    } catch (error) {
        console.error("Error fetching organized events:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

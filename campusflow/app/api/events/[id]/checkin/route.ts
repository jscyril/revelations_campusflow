import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";
import { prisma } from "@/app/lib/prisma";

// POST /api/events/[id]/checkin - QR Check-in
export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id: eventId } = await params;
        const body = await request.json();
        const { userId: targetUserId } = body;

        // Get the organizer
        const organizer = await prisma.user.findUnique({
            where: { email: session.user.email! },
        });

        if (!organizer) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Check if organizer has permission
        const event = await prisma.event.findUnique({
            where: { id: eventId },
        });

        if (!event) {
            return NextResponse.json({ error: "Event not found" }, { status: 404 });
        }

        if (event.organizerId !== organizer.id && organizer.role !== "ADMIN") {
            return NextResponse.json(
                { error: "Only organizers can check in participants" },
                { status: 403 }
            );
        }

        // Find the user to check in
        const userToCheckIn = targetUserId || organizer.id;

        // Verify registration
        const registration = await prisma.registration.findUnique({
            where: {
                userId_eventId: { userId: userToCheckIn, eventId },
            },
        });

        if (!registration) {
            return NextResponse.json(
                { error: "User is not registered for this event" },
                { status: 400 }
            );
        }

        if (registration.status === "CHECKED_IN") {
            return NextResponse.json(
                { error: "Already checked in" },
                { status: 400 }
            );
        }

        // Create check-in and update registration
        const [checkIn] = await prisma.$transaction([
            prisma.checkIn.create({
                data: {
                    userId: userToCheckIn,
                    eventId,
                },
                include: {
                    user: { select: { name: true, email: true } },
                    event: { select: { title: true } },
                },
            }),
            prisma.registration.update({
                where: { id: registration.id },
                data: { status: "CHECKED_IN" },
            }),
            // Award XP for attendance
            prisma.user.update({
                where: { id: userToCheckIn },
                data: { xp: { increment: 100 } },
            }),
        ]);

        return NextResponse.json(checkIn, { status: 201 });
    } catch (error) {
        console.error("Error checking in:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

// GET /api/events/[id]/checkin - Get check-in stats
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: eventId } = await params;

        const [registrations, checkIns] = await Promise.all([
            prisma.registration.findMany({
                where: { eventId },
                include: {
                    user: { select: { id: true, name: true, email: true, department: true } },
                },
            }),
            prisma.checkIn.count({ where: { eventId } }),
        ]);

        return NextResponse.json({
            total: registrations.length,
            checkedIn: checkIns,
            pending: registrations.length - checkIns,
            registrations,
        });
    } catch (error) {
        console.error("Error fetching check-in stats:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

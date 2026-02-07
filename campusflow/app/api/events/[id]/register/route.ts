import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/app/lib/prisma";

// GET - List registrations for an event
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: eventId } = await params;

        const registrations = await prisma.registration.findMany({
            where: { eventId },
            include: {
                user: {
                    select: { id: true, name: true, email: true },
                },
            },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json({ registrations });
    } catch (error) {
        console.error("Error fetching registrations:", error);
        return NextResponse.json(
            { error: "Failed to fetch registrations" },
            { status: 500 }
        );
    }
}

// POST - Register for an event
export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json(
                { error: "You must be logged in to register" },
                { status: 401 }
            );
        }

        const { id: eventId } = await params;

        // Get user
        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
        });

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        // Get event
        const event = await prisma.event.findUnique({
            where: { id: eventId },
            include: {
                _count: { select: { registrations: true } },
            },
        });

        if (!event) {
            return NextResponse.json(
                { error: "Event not found" },
                { status: 404 }
            );
        }

        // Check if event is full
        if (event._count.registrations >= event.slots) {
            return NextResponse.json(
                { error: "Event is full" },
                { status: 400 }
            );
        }

        // Check if already registered
        const existingRegistration = await prisma.registration.findFirst({
            where: {
                eventId,
                userId: user.id,
            },
        });

        if (existingRegistration && existingRegistration.status !== "CANCELLED") {
            return NextResponse.json(
                { error: "You are already registered for this event" },
                { status: 400 }
            );
        }

        if (existingRegistration && existingRegistration.status === "CANCELLED") {
            // Re-register
            const updatedRegistration = await prisma.registration.update({
                where: { id: existingRegistration.id },
                data: { status: "REGISTERED" },
                include: {
                    event: {
                        select: { id: true, title: true },
                    },
                },
            });
            return NextResponse.json({
                message: "Successfully registered!",
                registration: updatedRegistration,
                xpEarned: 0, // No XP for re-registration? Or maybe yes. ignoring for now.
            });
        }

        // Create registration
        const registration = await prisma.registration.create({
            data: {
                eventId,
                userId: user.id,
                status: "REGISTERED",
            },
            include: {
                event: {
                    select: { id: true, title: true },
                },
            },
        });

        // Award XP for registering
        await prisma.user.update({
            where: { id: user.id },
            data: { xp: { increment: 50 } },
        });

        return NextResponse.json({
            message: "Successfully registered!",
            registration,
            xpEarned: 50,
        });
    } catch (error) {
        console.error("Error creating registration:", error);
        return NextResponse.json(
            { error: "Failed to register for event" },
            { status: 500 }
        );
    }
}

// DELETE - Cancel registration
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json(
                { error: "You must be logged in" },
                { status: 401 }
            );
        }

        const { id: eventId } = await params;

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
        });

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        // Find and update registration
        // Use findFirst because I'm not 100% sure about the unique constraint name
        // The schema says @@unique([userId, eventId]), so usually userId_eventId
        const registration = await prisma.registration.findFirst({
            where: {
                eventId,
                userId: user.id,
            },
        });

        if (!registration) {
            return NextResponse.json(
                { error: "Registration not found" },
                { status: 404 }
            );
        }

        await prisma.registration.update({
            where: { id: registration.id },
            data: { status: "CANCELLED" },
        });

        return NextResponse.json({ message: "Registration cancelled" });
    } catch (error) {
        console.error("Error cancelling registration:", error);
        return NextResponse.json(
            { error: "Failed to cancel registration" },
            { status: 500 }
        );
    }
}

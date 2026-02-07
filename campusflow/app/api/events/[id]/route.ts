import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "@/app/lib/prisma";

// GET /api/events/[id] - Get event details
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const event = await prisma.event.findUnique({
            where: { id },
            include: {
                organizer: {
                    select: { id: true, name: true, department: true },
                },
                timeline: {
                    orderBy: { sortOrder: "asc" },
                },
                _count: {
                    select: { registrations: true, checkIns: true },
                },
            },
        });

        if (!event) {
            return NextResponse.json({ error: "Event not found" }, { status: 404 });
        }

        // Parse JSON fields
        const eventData = {
            ...event,
            theme: event.theme ? JSON.parse(event.theme) : null,
            modules: event.modules ? JSON.parse(event.modules) : null,
            slotsRemaining: event.slots - event._count.registrations,
        };

        return NextResponse.json(eventData);
    } catch (error) {
        console.error("Error fetching event:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

// PATCH /api/events/[id] - Update event
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        const body = await request.json();

        const event = await prisma.event.findUnique({
            where: { id },
            include: { organizer: true },
        });

        if (!event) {
            return NextResponse.json({ error: "Event not found" }, { status: 404 });
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email! },
        });

        if (!user || (event.organizerId !== user.id && user.role !== "ADMIN")) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const { theme, modules, ...updateData } = body;

        const updatedEvent = await prisma.event.update({
            where: { id },
            data: {
                ...updateData,
                theme: theme ? JSON.stringify(theme) : undefined,
                modules: modules ? JSON.stringify(modules) : undefined,
            },
        });

        return NextResponse.json(updatedEvent);
    } catch (error) {
        console.error("Error updating event:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

// DELETE /api/events/[id] - Delete event
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;

        const event = await prisma.event.findUnique({ where: { id } });
        if (!event) {
            return NextResponse.json({ error: "Event not found" }, { status: 404 });
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email! },
        });

        if (!user || (event.organizerId !== user.id && user.role !== "ADMIN")) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        await prisma.event.delete({ where: { id } });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting event:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

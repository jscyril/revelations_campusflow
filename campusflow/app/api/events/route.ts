import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/app/lib/prisma";

// GET /api/events - List all events with filtering
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get("category");
        const status = searchParams.get("status") || "PUBLISHED";
        const search = searchParams.get("search");
        const limit = parseInt(searchParams.get("limit") || "20");
        const offset = parseInt(searchParams.get("offset") || "0");

        const where: Record<string, unknown> = {};

        if (status !== "all") {
            where.status = status;
        }

        if (category && category !== "all") {
            where.category = category;
        }

        if (search) {
            where.OR = [
                { title: { contains: search } },
                { description: { contains: search } },
            ];
        }

        const [events, total] = await Promise.all([
            prisma.event.findMany({
                where,
                include: {
                    organizer: {
                        select: { id: true, name: true, department: true },
                    },
                    _count: {
                        select: { registrations: true },
                    },
                },
                orderBy: { date: "asc" },
                take: limit,
                skip: offset,
            }),
            prisma.event.count({ where }),
        ]);

        return NextResponse.json({ events, total, limit, offset });
    } catch (error) {
        console.error("Error fetching events:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

// POST /api/events - Create new event
export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email! },
        });

        if (!user || (user.role !== "ORGANIZER" && user.role !== "ADMIN")) {
            return NextResponse.json(
                { error: "Only organizers can create events" },
                { status: 403 }
            );
        }

        const body = await request.json();
        const {
            title,
            subtitle,
            description,
            category,
            date,
            time,
            location,
            heroImage,
            slots,
            entryFee,
            theme,
            modules,
            timeline,
        } = body;

        // Validate required fields
        if (!title || !description || !date || !time || !location) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const event = await prisma.event.create({
            data: {
                title,
                subtitle,
                description,
                category: category || "ACADEMIC",
                status: "PUBLISHED", // Auto-publish for now
                date: new Date(date),
                time,
                location,
                heroImage,
                slots: slots || 100,
                entryFee: entryFee || 0,
                theme: theme ? JSON.stringify(theme) : null,
                modules: modules ? JSON.stringify(modules) : null,
                organizerId: user.id,
                timeline: timeline
                    ? {
                        create: timeline.map((item: { title: string; time: string }, index: number) => ({
                            title: item.title,
                            time: item.time,
                            sortOrder: index,
                        })),
                    }
                    : undefined,
            },
            include: {
                organizer: {
                    select: { id: true, name: true, department: true },
                },
                timeline: true,
            },
        });

        return NextResponse.json(event, { status: 201 });
    } catch (error) {
        console.error("Error creating event:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "@/app/lib/prisma";

// GET /api/users/me - Get current user profile with stats
export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email! },
            include: {
                registrations: {
                    include: {
                        event: {
                            select: { id: true, title: true, date: true, status: true, heroImage: true },
                        },
                    },
                    orderBy: { createdAt: "desc" },
                },
                badges: {
                    include: {
                        badge: true,
                    },
                },
                organizedEvents: {
                    select: { id: true, title: true, status: true },
                },
                _count: {
                    select: { checkIns: true, registrations: true },
                },
            },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Calculate level from XP
        const level = Math.floor(user.xp / 1000) + 1;
        const xpToNextLevel = (level * 1000) - user.xp;

        // Separate active vs past events
        const now = new Date();
        const activeRegistrations = user.registrations.filter(
            (r) => new Date(r.event.date) >= now && r.status !== "CANCELLED"
        );
        const pastRegistrations = user.registrations.filter(
            (r) => new Date(r.event.date) < now
        );

        return NextResponse.json({
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            department: user.department,
            xp: user.xp,
            level,
            xpToNextLevel,
            stats: {
                eventsAttended: user._count.checkIns,
                eventsRegistered: user._count.registrations,
                eventsOrganized: user.organizedEvents.length,
                badgesEarned: user.badges.length,
            },
            activeRegistrations,
            pastRegistrations,
            badges: user.badges.map((ub) => ub.badge),
            organizedEvents: user.organizedEvents,
        });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

// PATCH /api/users/me - Update current user profile
export async function PATCH(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { name, department } = body;

        const user = await prisma.user.update({
            where: { email: session.user.email! },
            data: {
                ...(name && { name }),
                ...(department && { department }),
            },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                department: true,
                xp: true,
                level: true,
            },
        });

        return NextResponse.json(user);
    } catch (error) {
        console.error("Error updating user profile:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

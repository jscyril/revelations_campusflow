import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Seeding database...");

    // Create badges
    const badges = await Promise.all([
        prisma.badge.create({
            data: { name: "First Steps", icon: "✓", description: "Registered for your first event", xpReward: 100 },
        }),
        prisma.badge.create({
            data: { name: "Demogorgon Slayer", icon: "🎯", description: "Attended 5 hackathons", xpReward: 500 },
        }),
        prisma.badge.create({
            data: { name: "Party Leader", icon: "👥", description: "Organized an event", xpReward: 300 },
        }),
        prisma.badge.create({
            data: { name: "Night Owl", icon: "🔥", description: "Attended an event past midnight", xpReward: 200 },
        }),
        prisma.badge.create({
            data: { name: "Telekinetic", icon: "📺", description: "Participated in 10+ events", xpReward: 1000 },
        }),
    ]);

    // Create admin user
    const adminPassword = await bcrypt.hash("admin123", 10);
    const admin = await prisma.user.create({
        data: {
            email: "admin@campushub.edu",
            password: adminPassword,
            name: "Dr. Martin Brenner",
            role: "ADMIN",
            department: "Department of Energy",
            xp: 5000,
            level: 5,
        },
    });

    // Create organizer user
    const organizerPassword = await bcrypt.hash("organizer123", 10);
    const organizer = await prisma.user.create({
        data: {
            email: "organizer@campushub.edu",
            password: organizerPassword,
            name: "Jim Hopper",
            role: "ORGANIZER",
            department: "Hawkins Police",
            xp: 3500,
            level: 4,
        },
    });

    // Create student users
    const studentPassword = await bcrypt.hash("student123", 10);
    const students = await Promise.all([
        prisma.user.create({
            data: {
                email: "mike@campushub.edu",
                password: studentPassword,
                name: "Mike Wheeler",
                role: "STUDENT",
                department: "AV Club",
                xp: 2500,
                level: 3,
            },
        }),
        prisma.user.create({
            data: {
                email: "eleven@campushub.edu",
                password: studentPassword,
                name: "Jane Hopper",
                role: "STUDENT",
                department: "Psychic Division",
                xp: 5000,
                level: 5,
            },
        }),
        prisma.user.create({
            data: {
                email: "dustin@campushub.edu",
                password: studentPassword,
                name: "Dustin Henderson",
                role: "STUDENT",
                department: "Science Club",
                xp: 1800,
                level: 2,
            },
        }),
    ]);

    // Create events
    const events = await Promise.all([
        prisma.event.create({
            data: {
                title: "HACKMATRIX 2024",
                subtitle: "Crack the Code, Save Hawkins",
                description: "A 24-hour hackathon to build solutions that protect our dimension from the Upside Down. Form teams of 3-4 and compete for glory.",
                category: "HACKATHON",
                status: "PUBLISHED",
                date: new Date("2024-12-15T09:00:00"),
                time: "09:00 AM - 09:00 PM",
                location: "Hawkins High AV Room",
                heroImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=400&fit=crop",
                slots: 100,
                entryFee: 0,
                organizerId: organizer.id,
                theme: JSON.stringify({
                    name: "Matrix",
                    primary: "#e50914",
                    accent: "#22c55e",
                    background: "#0a0a0a",
                }),
                modules: JSON.stringify({
                    registration: { enabled: true, maxSlots: 100 },
                    qrCheckin: { enabled: true },
                    teamFormation: { enabled: true, teamSize: 4 },
                    leaderboard: { enabled: true },
                }),
                timeline: {
                    create: [
                        { title: "Breach Detected", time: "09:00 AM", sortOrder: 0, isComplete: true },
                        { title: "Rations Distributed", time: "12:00 PM", sortOrder: 1, isActive: true },
                        { title: "Dimensional Gate Study", time: "04:00 PM", sortOrder: 2 },
                        { title: "System Overload", time: "08:00 PM", sortOrder: 3 },
                    ],
                },
            },
        }),
        prisma.event.create({
            data: {
                title: "Snow Ball '84",
                subtitle: "The Annual Winter Dance",
                description: "Put on your best retro outfit and join us for the annual Snow Ball. Dance the night away like it's 1984!",
                category: "SOCIAL",
                status: "PUBLISHED",
                date: new Date("2024-12-20T19:00:00"),
                time: "07:00 PM - 11:00 PM",
                location: "Hawkins Middle School Gym",
                heroImage: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&h=400&fit=crop",
                slots: 200,
                entryFee: 5,
                organizerId: organizer.id,
                modules: JSON.stringify({
                    registration: { enabled: true },
                    qrCheckin: { enabled: true },
                }),
            },
        }),
        prisma.event.create({
            data: {
                title: "D&D Championship",
                subtitle: "Enter the Dungeon",
                description: "The ultimate Dungeons & Dragons tournament. Bring your character sheets and prepare for adventure!",
                category: "CLUB",
                status: "PUBLISHED",
                date: new Date("2024-12-18T14:00:00"),
                time: "02:00 PM - 08:00 PM",
                location: "Mike's Basement",
                heroImage: "https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?w=800&h=400&fit=crop",
                slots: 20,
                entryFee: 0,
                organizerId: students[0].id,
            },
        }),
        prisma.event.create({
            data: {
                title: "Robotics Workshop",
                subtitle: "Build Your Own Bot",
                description: "Learn to build and program robots from scratch. No experience needed - just bring your curiosity!",
                category: "WORKSHOP",
                status: "PUBLISHED",
                date: new Date("2024-12-22T10:00:00"),
                time: "10:00 AM - 04:00 PM",
                location: "Science Lab 101",
                heroImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop",
                slots: 30,
                entryFee: 10,
                organizerId: organizer.id,
                modules: JSON.stringify({
                    registration: { enabled: true },
                    qrCheckin: { enabled: true },
                }),
            },
        }),
        prisma.event.create({
            data: {
                title: "Startup Demo Day",
                subtitle: "Pitch Your Ideas",
                description: "Present your startup ideas to investors and mentors. Network with entrepreneurs!",
                category: "HACKATHON",
                status: "PUBLISHED",
                date: new Date("2024-12-28T09:00:00"),
                time: "09:00 AM - 06:00 PM",
                location: "Innovation Hub",
                heroImage: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=400&fit=crop",
                slots: 50,
                entryFee: 0,
                organizerId: organizer.id,
                modules: JSON.stringify({
                    registration: { enabled: true },
                    qrCheckin: { enabled: true },
                    teamFormation: { enabled: true, teamSize: 3 },
                }),
            },
        }),
        prisma.event.create({
            data: {
                title: "Movie Night: E.T.",
                subtitle: "Phone Home",
                description: "Classic 80s movie screening under the stars. Popcorn and drinks provided!",
                category: "SOCIAL",
                status: "PUBLISHED",
                date: new Date("2024-12-25T20:00:00"),
                time: "08:00 PM - 11:00 PM",
                location: "Campus Amphitheater",
                heroImage: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=400&fit=crop",
                slots: 150,
                entryFee: 2,
                organizerId: students[1].id,
            },
        }),
        prisma.event.create({
            data: {
                title: "Music Jam Session",
                subtitle: "Bring Your Instruments",
                description: "Jam with fellow musicians! All skill levels welcome. Amps and drums provided.",
                category: "CLUB",
                status: "PUBLISHED",
                date: new Date("2024-12-19T18:00:00"),
                time: "06:00 PM - 10:00 PM",
                location: "Music Room B3",
                heroImage: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=400&fit=crop",
                slots: 25,
                entryFee: 0,
                organizerId: students[2].id,
            },
        }),
        prisma.event.create({
            data: {
                title: "Photography Walk",
                subtitle: "Capture the Campus",
                description: "Explore hidden corners of campus with your camera. Tips from pro photographers included!",
                category: "WORKSHOP",
                status: "PUBLISHED",
                date: new Date("2024-12-21T15:00:00"),
                time: "03:00 PM - 06:00 PM",
                location: "Meet at Main Gate",
                heroImage: "https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?w=800&h=400&fit=crop",
                slots: 20,
                entryFee: 0,
                organizerId: organizer.id,
            },
        }),
    ]);

    // Create some registrations
    await Promise.all([
        prisma.registration.create({
            data: { userId: students[0].id, eventId: events[0].id },
        }),
        prisma.registration.create({
            data: { userId: students[1].id, eventId: events[0].id },
        }),
        prisma.registration.create({
            data: { userId: students[2].id, eventId: events[0].id },
        }),
        prisma.registration.create({
            data: { userId: students[0].id, eventId: events[1].id },
        }),
    ]);

    // Award some badges
    await Promise.all([
        prisma.userBadge.create({
            data: { userId: students[0].id, badgeId: badges[0].id },
        }),
        prisma.userBadge.create({
            data: { userId: students[1].id, badgeId: badges[0].id },
        }),
        prisma.userBadge.create({
            data: { userId: students[1].id, badgeId: badges[1].id },
        }),
        prisma.userBadge.create({
            data: { userId: organizer.id, badgeId: badges[2].id },
        }),
    ]);

    console.log("✅ Database seeded successfully!");
    console.log("\n📋 Test Accounts:");
    console.log("  Admin: admin@campushub.edu / admin123");
    console.log("  Organizer: organizer@campushub.edu / organizer123");
    console.log("  Student: mike@campushub.edu / student123");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

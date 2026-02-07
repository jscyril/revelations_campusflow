"use client";

import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FilterTabs from "./components/FilterTabs";
import EventCard from "./components/EventCard";
import { categories } from "./data/events";

interface Event {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  date: string;
  time: string;
  location: string;
  heroImage?: string;
  status: string;
  slots: number;
  organizer: {
    name: string;
  };
  _count: {
    registrations: number;
  };
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const params = new URLSearchParams({
          status: "PUBLISHED",
        });
        if (activeCategory !== "all") {
          params.append("category", activeCategory.toUpperCase());
        }

        const response = await fetch(`/api/events?${params}`);
        const data = await response.json();
        setEvents(data.events || []);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchEvents();
  }, [activeCategory]);

  // Map API status to display format
  const getStatusDisplay = (status: string) => {
    const statusMap: Record<string, { label: string; color: string }> = {
      PUBLISHED: { label: "Active", color: "green" },
      ONGOING: { label: "Live Now", color: "red" },
      DRAFT: { label: "Coming Soon", color: "yellow" },
      ARCHIVED: { label: "Ended", color: "gray" },
    };
    return statusMap[status] || { label: status, color: "gray" };
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <HeroSection />

      {/* Signal Frequencies Section */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📡</span>
            <h2 className="text-2xl font-bold text-white">Signal Frequencies</h2>
          </div>
          <FilterTabs
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>

        {/* Events Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="text-[#22c55e] font-mono animate-pulse">
              SCANNING FOR SIGNALS...
            </div>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-[#666] font-mono">
              NO SIGNALS DETECTED IN THIS FREQUENCY
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {events.map((event) => {
              const statusDisplay = getStatusDisplay(event.status);
              return (
                <EventCard
                  key={event.id}
                  id={event.id}
                  title={event.title}
                  organizer={event.organizer.name}
                  location={event.location}
                  image={event.heroImage || "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop"}
                  date={new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  status={statusDisplay.label}
                  statusColor={statusDisplay.color}
                />
              );
            })}
          </div>
        )}

        {/* Load More */}
        {events.length > 0 && (
          <div className="text-center mt-12">
            <button className="text-[#666] hover:text-white transition-colors flex flex-col items-center gap-2 mx-auto">
              <span className="uppercase tracking-wider text-sm font-medium">Load More Signals</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}
      </section>

      {/* Floating Action Button */}
      <button className="fab" title="Quick Actions">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      </button>
    </div>
  );
}

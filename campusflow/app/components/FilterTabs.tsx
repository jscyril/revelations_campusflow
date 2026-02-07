"use client";

interface FilterTabsProps {
    categories: { id: string; label: string; locked?: boolean }[];
    activeCategory: string;
    onCategoryChange: (category: string) => void;
}

export default function FilterTabs({
    categories,
    activeCategory,
    onCategoryChange,
}: FilterTabsProps) {
    return (
        <div className="flex flex-wrap items-center gap-3">
            {categories.map((category) => (
                <button
                    key={category.id}
                    onClick={() => !category.locked && onCategoryChange(category.id)}
                    className={`filter-tab ${activeCategory === category.id ? "active" : ""} ${category.locked ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    disabled={category.locked}
                >
                    {category.label}
                    {category.locked && (
                        <span className="ml-1">🔒</span>
                    )}
                </button>
            ))}
        </div>
    );
}

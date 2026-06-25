"use client";

import {
  AI_TOOLS,
  DIFFICULTY_LEVELS,
  PROMPT_CATEGORIES,
} from "@/lib/promptConstants";
import { cn } from "@/lib/cn";

function FilterCheckboxGroup({ title, options, selected, onSelect }) {
  return (
    <div className="mb-6 last:mb-0">
      <h3 className="mb-2 text-[14px] font-medium uppercase tracking-wide text-on-surface-variant">
        {title}
      </h3>
      <div className="flex flex-col gap-2">
        {options.map((option) => {
          const isChecked = selected === option;
          return (
            <label
              key={option}
              className="group flex cursor-pointer items-center gap-2"
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => onSelect(isChecked ? "" : option)}
                className="h-4 w-4 rounded border-outline-variant text-primary focus:ring-primary"
              />
              <span className="text-[15px] text-on-surface transition-colors group-hover:text-primary">
                {option}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

export default function MarketplaceFilterSidebar({
  filters,
  onChange,
  className,
}) {
  const updateFilter = (key, value) => {
    onChange({
      ...filters,
      [key]: value,
      page: 1,
    });
  };

  const clearFilters = () => {
    onChange({
      ...filters,
      category: "",
      aiTool: "",
      difficulty: "",
      page: 1,
    });
  };

  const hasActiveFilters =
    filters.category || filters.aiTool || filters.difficulty;

  return (
    <aside
      className={cn(
        "w-full shrink-0 md:w-64",
        className
      )}
    >
      <div className="rounded-xl bg-white p-6 shadow-[0_4px_20px_-2px_rgba(28,82,83,0.08)]">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-[22px] font-semibold text-on-surface">Filters</h2>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="text-[12px] font-semibold text-primary hover:underline"
            >
              Clear
            </button>
          )}
        </div>

        <FilterCheckboxGroup
          title="Category"
          options={PROMPT_CATEGORIES}
          selected={filters.category}
          onSelect={(value) => updateFilter("category", value)}
        />

        <FilterCheckboxGroup
          title="AI Tool"
          options={AI_TOOLS}
          selected={filters.aiTool}
          onSelect={(value) => updateFilter("aiTool", value)}
        />

        <div>
          <h3 className="mb-2 text-[14px] font-medium uppercase tracking-wide text-on-surface-variant">
            Difficulty
          </h3>
          <select
            value={filters.difficulty}
            onChange={(e) => updateFilter("difficulty", e.target.value)}
            className="w-full rounded-lg border border-outline-variant bg-surface p-2.5 text-[15px] text-on-surface focus:border-primary focus:ring-1 focus:ring-primary"
          >
            <option value="">Any Difficulty</option>
            {DIFFICULTY_LEVELS.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>
      </div>
    </aside>
  );
}

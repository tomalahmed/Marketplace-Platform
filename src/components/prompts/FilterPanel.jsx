"use client";

import { Search } from "lucide-react";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import {
  AI_TOOLS,
  DIFFICULTY_LEVELS,
  PROMPT_CATEGORIES,
  SORT_OPTIONS,
} from "@/lib/promptConstants";
import { cn } from "@/lib/cn";

export default function FilterPanel({
  filters,
  onChange,
  onApply,
  onReset,
  className,
}) {
  const updateFilter = (key, value) => {
    onChange({
      ...filters,
      [key]: value,
      page: 1,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onApply?.();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "rounded-2xl border border-outline-variant/20 bg-white p-5 shadow-[0_4px_20px_-2px_rgba(28,82,83,0.08)] md:p-6",
        className
      )}
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-3">
          <Input
            htmlFor="prompt-search"
            label="Search"
            icon={Search}
            value={filters.search}
            onChange={(e) => updateFilter("search", e.target.value)}
            placeholder="Search by title, tags, or AI tool..."
          />
        </div>

        <Select
          htmlFor="prompt-category"
          label="Category"
          placeholder="All categories"
          value={filters.category}
          onChange={(e) => updateFilter("category", e.target.value)}
          options={PROMPT_CATEGORIES.map((item) => ({
            value: item,
            label: item,
          }))}
        />

        <Select
          htmlFor="prompt-ai-tool"
          label="AI Tool"
          placeholder="All AI tools"
          value={filters.aiTool}
          onChange={(e) => updateFilter("aiTool", e.target.value)}
          options={AI_TOOLS.map((item) => ({ value: item, label: item }))}
        />

        <Select
          htmlFor="prompt-difficulty"
          label="Difficulty"
          placeholder="All levels"
          value={filters.difficulty}
          onChange={(e) => updateFilter("difficulty", e.target.value)}
          options={DIFFICULTY_LEVELS.map((item) => ({
            value: item,
            label: item,
          }))}
        />

        <Select
          htmlFor="prompt-sort"
          label="Sort by"
          placeholder="Sort by"
          value={filters.sort}
          onChange={(e) => updateFilter("sort", e.target.value)}
          options={SORT_OPTIONS}
        />
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <Button type="submit" size="sm">
          Apply Filters
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={onReset}>
          Reset
        </Button>
      </div>
    </form>
  );
}

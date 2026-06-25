"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import MarketplaceFilterSidebar from "@/components/prompts/MarketplaceFilterSidebar";
import PromptGrid from "@/components/prompts/PromptGrid";
import Pagination from "@/components/ui/Pagination";
import usePrompts from "@/hooks/usePrompts";
import { getApiErrorMessage } from "@/lib/apiErrors";
import {
  DEFAULT_PROMPT_FILTERS,
  SORT_OPTIONS,
} from "@/lib/promptConstants";

function filtersFromSearchParams(searchParams) {
  return {
    ...DEFAULT_PROMPT_FILTERS,
    search: searchParams.get("search") || "",
    category: searchParams.get("category") || "",
    aiTool: searchParams.get("aiTool") || "",
    difficulty: searchParams.get("difficulty") || "",
    sort: searchParams.get("sort") || DEFAULT_PROMPT_FILTERS.sort,
    page: Math.max(Number(searchParams.get("page")) || 1, 1),
  };
}

function PromptsPageContent() {
  const searchParams = useSearchParams();
  const initialFilters = filtersFromSearchParams(searchParams);

  const [searchInput, setSearchInput] = useState(initialFilters.search);
  const [filters, setFilters] = useState(initialFilters);

  useEffect(() => {
    const next = filtersFromSearchParams(searchParams);
    setFilters(next);
    setSearchInput(next.search);
  }, [searchParams]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters((prev) => {
        if (prev.search === searchInput) return prev;
        return { ...prev, search: searchInput, page: 1 };
      });
    }, 400);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const { data, isLoading, isError, isFetching, error, refetch } = usePrompts(filters);
  const prompts = data?.data || [];
  const pagination = data?.pagination;
  const totalResults = data?.total ?? 0;

  const handleSortChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      sort: e.target.value,
      page: 1,
    }));
  };

  const handlePageChange = (page) => {
    setFilters((prev) => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 pb-12 md:px-10">
      <div className="flex flex-col gap-6 md:flex-row md:gap-6">
        <MarketplaceFilterSidebar filters={filters} onChange={setFilters} />

        <section className="flex min-w-0 flex-1 flex-col gap-6">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h1 className="text-[32px] font-bold leading-tight text-on-surface md:text-[42px]">
                Explore Prompts
              </h1>
              <p className="mt-2 text-[17px] leading-relaxed text-on-surface-variant">
                Discover high-quality AI prompts to boost your productivity.
              </p>
              {!isLoading && (
                <p className="mt-1 text-[13px] text-on-surface-variant/80">
                  {totalResults} prompt{totalResults === 1 ? "" : "s"} found
                  {isFetching ? " · Updating..." : ""}
                </p>
              )}
            </div>

            <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
              <div className="relative w-full sm:min-w-[260px]">
                <Search
                  className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-on-surface-variant"
                  strokeWidth={1.75}
                />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search prompts..."
                  className="w-full rounded-full border border-outline-variant/20 bg-white py-2.5 pl-10 pr-4 text-[15px] text-on-surface outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/15"
                />
              </div>

              <select
                value={filters.sort}
                onChange={handleSortChange}
                className="rounded-full border border-outline-variant/20 bg-white px-4 py-2.5 text-[15px] text-on-surface shadow-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <PromptGrid
            prompts={prompts}
            isLoading={isLoading}
            isError={isError}
            errorMessage={getApiErrorMessage(
              error,
              "Failed to load prompts from MongoDB."
            )}
            onRetry={refetch}
            emptyMessage="No prompts match your filters. Try adjusting search or filters."
          />

          <Pagination
            page={pagination?.page || filters.page}
            totalPages={pagination?.totalPages || 1}
            onPageChange={handlePageChange}
          />
        </section>
      </div>
    </div>
  );
}

export default function PromptsPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-[1280px] px-4 py-20 text-center md:px-10">
          <p className="text-on-surface-variant">Loading marketplace...</p>
        </div>
      }
    >
      <PromptsPageContent />
    </Suspense>
  );
}

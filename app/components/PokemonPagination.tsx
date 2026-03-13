"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface PokemonPaginationProps {
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

const buttonClass =
  "px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors dark:bg-blue-600 dark:hover:bg-blue-700 dark:disabled:bg-gray-700";

export default function PokemonPagination({
  currentPage,
  totalPages,
  hasNext,
  hasPrevious,
}: PokemonPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const changePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      <button
        onClick={() => changePage(currentPage - 1)}
        disabled={!hasPrevious}
        className={buttonClass}
      >
        Previous
      </button>
      <span className="text-gray-700 dark:text-gray-300">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => changePage(currentPage + 1)}
        disabled={!hasNext}
        className={buttonClass}
      >
        Next
      </button>
    </div>
  );
}
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { PokemonType } from "@/types/pokemon";

interface PokemonFiltersProps {
  types: PokemonType[];
}

export default function PokemonFilters({ types }: PokemonFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedType = searchParams.get("type") || "";

  const handleTypeChange = (type: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (selectedType === type) {
      params.delete("type");
    } else {
      params.set("type", type);
    }
    params.set("page", "1");
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="mb-8">
      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
        Filter by Type
      </h3>
      <div className="flex flex-wrap gap-2">
        {types.map((type) => {
          const isSelected = selectedType === type.name;
          return (
            <button
              key={type.name}
              onClick={() => handleTypeChange(type.name)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isSelected
                  ? "bg-blue-600 text-white shadow-md scale-105"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
"use client";

import Image from "next/image";
import { Pokemon } from "@/types/pokemon";

interface PokemonCardProps {
  pokemon: Pokemon;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  console.log("pokemon", pokemon);
  const imageUrl =
    pokemon.image ||
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:scale-105">
      <div className="flex flex-col items-center">
        <div className="relative w-48 h-48 mb-4 bg-linear-to-b from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-lg flex items-center justify-center">
          <Image
            src={imageUrl}
            alt={pokemon.name}
            fill
            className="object-contain p-2"
            unoptimized
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <h3 className="mt-2 text-lg font-semibold text-gray-900 dark:text-gray-100 capitalize">
          {pokemon.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">
          #{String(pokemon.id).padStart(3, "0")}
        </p>
      </div>
    </div>
  );
}
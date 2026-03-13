import { Pokemon, PokemonType, PokemonListResponse } from "@/types/pokemon";

const POKEAPI_BASE = "https://pokeapi.co/api/v2";

// Extract Pokemon ID from URL
function extractPokemonId(url: string): number {
  const parts = url.split("/").filter(Boolean);
  return parseInt(parts[parts.length - 1]);
}

// Add image URL to Pokemon
function addPokemonImage(pokemon: Pokemon): Pokemon {
  return {
    ...pokemon,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`,
  };
}

export async function fetchPokemonList(
  offset: number = 0,
  limit: number = 20
): Promise<PokemonListResponse> {
  const res = await fetch(
    `${POKEAPI_BASE}/pokemon?offset=${offset}&limit=${limit}`,
    {
      cache: "no-store",
      // No cache
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch Pokemon list");
  }

  const data = await res.json();

  // Add ID and image URL to each Pokemon
  const pokemonWithDetails = data.results.map(
    (pokemon: Pokemon, index: number) => {
      const id = offset + index + 1;
      return addPokemonImage({
        ...pokemon,
        id,
      });
    }
  );

  return {
    ...data,
    results: pokemonWithDetails,
  };
}

export async function fetchPokemonTypes(): Promise<PokemonType[]> {
  const res = await fetch(`${POKEAPI_BASE}/type`, {
    cache: "force-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch Pokemon types");
  }

  const data = await res.json();
  return data.results.filter(
    (type: PokemonType) => type.name !== "unknown" && type.name !== "shadow"
  );
}

export async function fetchPokemonByType(
  type: string,
  offset: number = 0,
  limit: number = 20
): Promise<PokemonListResponse> {
  const res = await fetch(`${POKEAPI_BASE}/type/${type}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch Pokemon by type: ${type}`);
  }

  const data = await res.json();
  const allPokemon = data.pokemon.map((item: { pokemon: Pokemon }) => {
    const id = extractPokemonId(item.pokemon.url);
    return addPokemonImage({
      ...item.pokemon,
      id,
    });
  });

  const paginatedPokemon = allPokemon.slice(offset, offset + limit);

  return {
    count: allPokemon.length,
    next: offset + limit < allPokemon.length ? "has-more" : null,
    previous: offset > 0 ? "has-previous" : null,
    results: paginatedPokemon,
  };
}
const POKEAPI_BASE = "https://pokeapi.co/api/v2/";

export interface Pokemon {
  id: number;
  name: string;
  url: string;
  image?: string;
  types?: string[];
}

export interface PokemonType {
  name: string;
  url: string;
}

export interface PoekmonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}

export async function fetchPokemonTypes(): Promise<PokemonType[]> {
  const res = await fetch(`${POKEAPI_BASE}/type`, {
    cache: "force-cache", // cache all time
  });

  if (!res.ok) {
    throw new Error("Failed to fetch Pokemon types");
  }

  const data = await res.json();
  return data.results.filter(
    (type: PokemonType) => type.name !== "unknown" && type.name !== "shadow",
  );
}

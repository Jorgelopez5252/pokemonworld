export async function fetchPokemonTypes(): Promise<PokemonType[]> {
  const res = await fetch(`${POKEAPI_BASE}/type`, {
    cache: "force-cache",
    // cache all time
    // next: { revalidate: 3600 },
    // cache for 1 hour
  });

  if (!res.ok) {
    throw new Error("Failed to fetch Pokemon types");
  }

  const data = await res.json();
  return data.results.filter(
    (type: PokemonType) => type.name !== "unknown" && type.name !== "shadow",
  );
}

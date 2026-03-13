import { fetchPokemonList, fetchPokemonTypes, fetchPokemonByType } from "@/lib/pokeapi";
import PokemonList from "@/app/components/PokemonList";
import PokemonFilters from "@/app/components/PokemonFilters";
import PokemonPagination from "@/app/components/PokemonPagination";

const ITEMS_PER_PAGE = 20;

interface HomeProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const page = parseInt(params.page as string) || 1;
  const selectedType = (params.type as string) || "all";
  const offset = (page - 1) * ITEMS_PER_PAGE;

  const [types, pokemonData] = await Promise.all([
    fetchPokemonTypes(),
    selectedType === "all"
      ? fetchPokemonList(offset, ITEMS_PER_PAGE)
      : fetchPokemonByType(selectedType, offset, ITEMS_PER_PAGE),
  ]);

  const totalPages = Math.ceil(pokemonData.count / ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4 text-gray-900 dark:text-gray-100">
          Welcome to Pokemon world
        </h1>
        <div className="text-center mb-6 text-gray-600 dark:text-gray-400">
          Total count: {pokemonData.count}
        </div>

        <PokemonFilters types={types} />
        <PokemonList pokemon={pokemonData.results} />
        <PokemonPagination
          currentPage={page}
          totalPages={totalPages}
          hasNext={!!pokemonData.next}
          hasPrevious={!!pokemonData.previous}
        />
      </div>
    </div>
  );
}

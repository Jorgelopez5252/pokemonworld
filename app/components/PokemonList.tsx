import { Pokemon } from '@/types/pokemon';
import PokemonCard from './PokemonCard';

interface PokemonListProps {
  pokemon: Pokemon[];
}

export default function PokemonList({ pokemon }: PokemonListProps) {
  if (pokemon.length === 0) {
    return (
      <div className="text-center py-12 text-gray-600 dark:text-gray-400">
        No Pokemon found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {pokemon.map((p) => (
        <PokemonCard key={p.id} pokemon={p} />
      ))}
    </div>
  );
}
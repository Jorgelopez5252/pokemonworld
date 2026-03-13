import { fetchPokemonTypes } from "@/lib/pokeapi";
import React from "react";

const ITEMS_PER_PAGE = 20;

interface HomeProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const page = parseInt(params.page as string) || 1;
  const selectedType = (params.type as string) || "all";
  const offset = (page - 1) * ITEMS_PER_PAGE;

  const [type] = await Promise.all([fetchPokemonTypes()]);

  return <div>page</div>;
}

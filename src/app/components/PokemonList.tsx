"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PokemonListItem } from "../lib/definitions";
import { getPokemonList } from "../lib/apiCalls";
import { capitalizeFirstLetter } from "../lib/helpers";

export default function PokemonList() {
  const [list, setList] = useState<PokemonListItem[]>([]);
  /* Possible future implementation: list could be a context state variable,
  so that whenever we go back from a details page to the homepage,
  we would avoid having to re-fetch a long list. */
  const [nextPage, setNextPage] = useState<string>("");
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPokemon();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const bottomPosition = document.body.offsetHeight - 100;
      if (scrollPosition >= bottomPosition && !loading && nextPage) {
        fetchPokemon(nextPage);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  const fetchPokemon = async (url?: string) => {
    setLoading(true);
    try {
      let data;
      url ? data = await getPokemonList(url) : data = await getPokemonList();
      
      setList([...list, ...data.results]);
      if (data.next) {
        setNextPage(data.next)
      } else {
        setNextPage("");
        setDisabled(true);
      }
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (nextPage) fetchPokemon(nextPage);
  };

  return (
    <div className="flex-center m-y-40">
      <ul className="pokemon-list">
        {list.map((item: PokemonListItem) => (
          <li key={item.name}>
            <Link href={"/details/" + item.name}>{capitalizeFirstLetter(item.name)}</Link>
          </li>
        ))}
      </ul>
      <button className="m-top-20 m-bottom-50" disabled={loading || disabled} onClick={handleLoadMore}>
        {disabled ? "We've reached the end" : "Load More"}</button>
      {loading && <p>Loading more Pokémon...</p>}
    </div>
  );
}

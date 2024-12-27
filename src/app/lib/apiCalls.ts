import { Details, PokemonList } from "./definitions";

const baseurl = "https://pokeapi.co/api/v2/pokemon/";


export const getPokemonDetails = async (pokemonName: string) : Promise<Details> => {
    const response = await fetch(baseurl + pokemonName);
    return await response.json();
}

export const getPokemonList = async (url: string = baseurl) : Promise<PokemonList> => {
    const response = await fetch(url);
    return await response.json();
}
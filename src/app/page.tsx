import PokemonList from "./components/PokemonList";
import SearchBar from "./components/SearchBar";

export default function Home() {
  return (
    <div>
      <SearchBar />
      <PokemonList />
    </div>
  );
}

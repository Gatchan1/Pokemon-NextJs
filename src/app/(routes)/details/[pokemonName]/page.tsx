import { capitalizeFirstLetter } from "../../../lib/helpers";
import { BaseStat } from "../../../lib/definitions";
import styles from "./page.module.css";
import NotFound from "@/app/not-found";
import { getPokemonDetails, getCompletePokemonList } from "@/app/lib/apiCalls";
import ImageWithSkeleton from "@/app/components/ImageWithSkeleton";

export async function generateStaticParams() {
  // Fetch the list of Pokémon from PokeAPI
  const data = await getCompletePokemonList(); // This should fetch a list of Pokémon names
  const pokemonNames = data.results.map((pokemon: { name: string }) => pokemon.name);

  // Return the params for each Pokémon
  return pokemonNames.map((name) => ({
    pokemonName: name,
  }));
}

export default async function PokemonDetails({ params }: { params: { pokemonName: string } }) {
  let data;

  try {
    data = await getPokemonDetails(params.pokemonName);
  } catch (error) {
    return <NotFound />;
  }

  const name = capitalizeFirstLetter(data.name);

  return (
    <div className={`flex-center ${styles["pokemon-details"]}`}>
      <h1>{name}</h1>

      <div className={styles["images-container"]}>
        <div className={`${styles["image-container"]} left-image`}>
          <ImageWithSkeleton src={data.sprites.other["official-artwork"].front_default} alt={data.name + "'s default picture"} title={data.name + "'s default picture"} />
        </div>
        <div className={`${styles["image-container"]} right-image`}>
          <ImageWithSkeleton src={data.sprites.other["official-artwork"].front_shiny} alt={data.name + "'s shiny picture"} title={data.name + "'s shiny picture"} />
        </div>
      </div>

      <div className="pokemon-details">
        <div className="left-side vertical flex-center">
          <div className="stat-bg round-stat flex-center m-bottom-10">
            <p>
              <b>Id number:</b>
            </p>
            <p>{data.id}</p>
          </div>

          <div className="horizontal stat-bg">
            <div className="stat flex-center">
              <p>Weight:</p>
              <p>{data.weight}</p>
            </div>

            <div className="stat end flex-center">
              <p>Height:</p>
              <p>{data.height}</p>
            </div>
          </div>
        </div>

        <div className="right-side vertical flex-center">
          <table className="stat single stat-bg m-bottom-10">
            <thead>
              <tr>
                <th colSpan={data.stats.length}>Base Stats</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {data.stats.map((stat: BaseStat, i: number) => (
                  <td key={i}>
                    <div className="flex-center">
                      <p>{capitalizeFirstLetter(stat.stat.name) + ":"}</p>
                      <p>{stat.base_stat}</p>
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>

          <table className="stat single stat-bg">
            <thead>
              <tr>
                <th colSpan={data.abilities.length}>Abilities</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {data.abilities.map((ability: { ability: { name: string } }, i: number) => (
                  <td key={i}>
                    <div className="flex-center">{capitalizeFirstLetter(ability.ability.name)}</div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

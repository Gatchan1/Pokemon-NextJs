/* eslint-disable @next/next/no-img-element */
import { capitalizeFirstLetter } from "../../../lib/helpers";
import { BaseStat } from "../../../lib/definitions";
import NotFound from "@/app/not-found";
import { getPokemonDetails } from "@/app/lib/apiCalls";
import ImageWithSkeleton from "@/app/components/ImageWithSkeleton";

export default async function PokemonDetails({ params }: { params: { pokemonName: string } }) {
  let data;

  try {
    data = await getPokemonDetails(params.pokemonName);
  } catch (error) {
    return <NotFound />;
  }

  const name = capitalizeFirstLetter(data.name);

  return (
    <div className="flex-center">
      <h1>{name}</h1>

      <div className="images-container">
        <ImageWithSkeleton src={data.sprites.other["official-artwork"].front_default} alt={data.name + "'s default picture"} title={data.name + "'s default picture"}/>
        <ImageWithSkeleton src={data.sprites.other["official-artwork"].front_shiny} alt={data.name + "'s shiny picture"} title={data.name + "'s shiny picture"}/>
      </div>
      <div>
        <p>Id number: {data.id}</p>
        <div>
          <p>Abilities:</p>
          <ul>
            {data.abilities.map((ability: { ability: { name: string } }, i: number) => (
              <li key={i}>{capitalizeFirstLetter(ability.ability.name)}</li>
            ))}
          </ul>
        </div>
        <p>Weight: {data.weight}</p>
        <p>Height: {data.height}</p>
        <div>
          <p>Base Stats:</p>
          <ul>
            {data.stats.map((stat: BaseStat, i: number) => (
              <li key={i}>{stat.stat.name + ": " + stat.base_stat}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

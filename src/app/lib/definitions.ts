export type PokemonList = {
    results: [PokemonListItem];
    next: string;
}

export type PokemonListItem = {
    name: string;
    url: string;
};

export type BaseStat = {
    base_stat: number;
    stat: {
        name: string;
    }
}

export type Details = {
    name: string;
    id: number;
    sprites: {
        other: {
            "official-artwork": {
                front_default: string;
                front_shiny: string;
            }
        }
    }
    abilities: [{
        ability: {
            name: string
        }
    }];
    weight: number;
    height: number;
    stats: [BaseStat];
}
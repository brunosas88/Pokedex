const pokeApi = {};

pokeApi.getPokemonDetails = (pokemon) => {
	return fetch(pokemon.url).then((jsonPokemonUrl) => jsonPokemonUrl.json());
};

pokeApi.convertPokemonAPIRequestToPokemon = (pokemonRequest) => {
	const pokemon = new Pokemon();
	pokemon.id = String(pokemonRequest.id).padStart(3, "0");
	pokemon.name = pokemonRequest.name.toUpperCase();
	pokemon.types = pokemonRequest.types.map((types) =>
		types.type.name
	);
	const [mainType] = pokemon.types;
	pokemon.mainType = mainType;
	pokemon.art = pokemonRequest.sprites.other.dream_world.front_default;
	pokemon.height = pokemonRequest.height;
	pokemon.weight = pokemonRequest.weight;
	pokemon.stats.hp = pokemonRequest.stats[0].base_stat;
	pokemon.stats.attack = pokemonRequest.stats[1].base_stat;
	pokemon.stats.defense = pokemonRequest.stats[2].base_stat;
	pokemon.stats.specialAttack = pokemonRequest.stats[3].base_stat;
	pokemon.stats.specialDefense = pokemonRequest.stats[4].base_stat;
	pokemon.stats.speed = pokemonRequest.stats[5].base_stat;
	return pokemon;
};

pokeApi.getPokemons = (offset = 0, limit = 30) => {
	const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;

	return fetch(url)
		.then((responsePokeAPI) => responsePokeAPI.json())
		.then((jsonPokeAPI) => jsonPokeAPI.results)
		.then((pokemons) => pokemons.map(pokeApi.getPokemonDetails))
		.then((detailsRequest) => Promise.all(detailsRequest))
		.then((pokemonDetails) =>
			pokemonDetails.map(pokeApi.convertPokemonAPIRequestToPokemon)
		);
};

let offset = 0;
let page = 1;
const limit = 36;
const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;
const idPokemonList = document.getElementById("pokemon-list");
const idNextButton = document.getElementById("next");
const idPreviousButton = document.getElementById("previous");

function createHTMLPokemonList(pokemon) {
	return `
    <li class="pokemon ${pokemon.types[0]} ">
        <span class="number">#${pokemon.id}</span>
        <span class="name">${pokemon.name}</span>
        <div class="details">
            <ol class="types">
                ${pokemon.types
					.map(
						(type) =>
							`<li class="type ${type}">${type.toUpperCase()}</li>`
					)
					.join("")}
            </ol>
            <figure class="art">
                <img							
                src=${pokemon.art}
                alt="${pokemon.name}"                 
                />
            </figure>   
        </div>
    </li>`;
}

function loadPokemons(offset, limit) {
	pokeApi
		.getPokemons(offset, limit)
		.then(
			(pokeAPIList) =>
				(idPokemonList.innerHTML = pokeAPIList
					.map(createHTMLPokemonList)
					.join(""))
		);
}

loadPokemons(offset, limit);

idNextButton.addEventListener("click", () => {
	if (offset <= 612) {
        offset += 36;
        loadPokemons(offset, limit);
    }
    else if (offset == 648) {
        offset += 1;
        loadPokemons(offset, limit);
    }

});

idPreviousButton.addEventListener("click", () => {
	if (offset > 0){
        offset -= 36;
        loadPokemons(offset, limit);    }

});

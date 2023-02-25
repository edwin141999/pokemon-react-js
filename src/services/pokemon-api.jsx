export const getPokemonAPI = async () => {
    const result = await fetch(
        "https://pokeapi.co/api/v2/pokemon?offset=0&limit=56"
    )
        .then((response) => response.json())
        .then((data) => {
            return data.results;
        });
    return result;
};

export const getInfoPokemonAPI = async (url) => {
    const result = await fetch(url)
        .then((response) => response.json())
        .then((data) => {
            return data;
        });
    return result;
};

export const getTypePokemonAPI = async () => {
    const result = await fetch("https://pokeapi.co/api/v2/type")
        .then((response) => response.json())
        .then((data) => {
            return data.results;
        });
    return result;
};

export const getAbilitiesPokemonAPI = async () => {
    const result = await fetch("https://pokeapi.co/api/v2/ability")
        .then((response) => response.json())
        .then((data) => {
            return data.results;
        });
    return result;
};

// BUSQUEDA POR NOMBRE
export const getPokemonByNameAPI = async (name) => {
    const result = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${name}`
    ).then((response) => response.json());
    return result;
};

// BUSQUEDA POR TIPO
export const getPokemonByTypeAPI = async (type) => {
    const result = await fetch(`https://pokeapi.co/api/v2/type/${type}`)
        .then((response) => response.json())
        .then((data) => {
            return data.pokemon;
        });
    return result;
};

// BUSQUEDA POR HABILIDAD
export const getPokemonByAbilityAPI = async (ability) => {
    const result = await fetch(`https://pokeapi.co/api/v2/ability/${ability}`)
        .then((response) => response.json())
        .then((data) => {
            return data.pokemon;
        });
    return result;
};

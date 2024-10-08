export const getPokemonAPI = async (offset, limit) => {
  const result = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
  )
    .then((response) => response.json())
    .then((data) => {
      return data.results;
    });
  return result;
};

export const getOnePokemonAPI = async (id) => {
  const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
  return result;
}

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

export const getSpeciesPokemonAPI = async (id) => {
  const result = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
    .then((response) => {
      if (response.status !== 404) return response.json()
    })
    .then((data) => {
      if (data === undefined) {
        return null
      }
      return data;
    })
  return result;

}

// BUSQUEDA POR NOMBRE
export const getPokemonByNameAPI = async (name) => {
  const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then(
    (response) => response.json()
  );
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

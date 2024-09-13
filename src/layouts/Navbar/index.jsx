import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../../assets/images/pokemon-logo.png";
import "../../assets/styles/Navbar.css";
import Button from "../../components/Button";
import SVGMenu from "../../components/SVGMenu";
import {
  getAbilitiesPokemonAPI,
  getPokemonAPI,
  getPokemonByAbilityAPI,
  getPokemonByTypeAPI,
  getTypePokemonAPI,
} from "../../middleware/pokemon-api";
import {
  setSearchPokemon,
  setSearchResults,
} from "../../redux-toolkit/searchPokemon";

export default function Navbar() {
  const [types, setTypes] = useState([]);
  const [abilities, setAbilities] = useState([]);
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  const allPokemons = useSelector((state) => state.search.allPokemons);

  const dispatch = useDispatch();

  // BUSQUEDA POR NOMBRE
  const handleSearch = async (e) => {
    if (e.target.value === "") return dispatch(setSearchResults(allPokemons));

    dispatch(setSearchPokemon(e.target.value.toLowerCase()));
    const allTypePokemons = await getPokemonAPI(0, 1118);
    const pokemonFilter = allTypePokemons.filter((pokemon) => {
      return pokemon.name.includes(e.target.value.toLowerCase());
    });
    dispatch(setSearchResults(pokemonFilter));
  };

  // BUSQUEDA POR TIPO
  const handleType = async (e) => {
    const typePokemon = await getPokemonByTypeAPI(e);
    const allTypePokemons = [];
    for (const element of typePokemon) {
      allTypePokemons.push(element.pokemon);
    }
    dispatch(setSearchResults(allTypePokemons));
  };

  // BUSQUEDA POR HABILIDAD
  const handleAbilities = async (e) => {
    const abilityPokemon = await getPokemonByAbilityAPI(e);
    const allAbilityPokemons = [];
    for (const element of abilityPokemon) {
      allAbilityPokemons.push(element.pokemon);
    }
    dispatch(setSearchResults(allAbilityPokemons));
  };

  // LIMPIAR DATOS
  const handleClean = () => {
    dispatch(setSearchResults(allPokemons));
    // Limpiar el input
    document.querySelector(".navbar-search").value = "";
    // Limpiar el select de tipos
    document.querySelector(".navbar-filter-type").value = "";
    // Limpiar el select de habiiidades
    document.querySelector(".navbar-filter-abilities").value = "";
  };

  useEffect(() => {
    const getTypes = async () => {
      const types = await getTypePokemonAPI();
      setTypes(types);
    };
    getTypes();
  }, []);

  useEffect(() => {
    const getAbilities = async () => {
      const abilities = await getAbilitiesPokemonAPI();
      setAbilities(abilities);
    };
    getAbilities();
  }, []);

  return (
    <nav className="navbar">
        <img src={Logo} alt="Logo de pokemon" className="navbar-img" />
      <button
        className="hamburger"
        onClick={() => [setIsNavExpanded(!isNavExpanded)]}
      >
        <SVGMenu />
      </button>
      <div
        className={
          isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
        }
      >
        <ul>
          <div className="navbar-ul-div">
            <input
              type="text"
              placeholder="Which Pokémon?"
              className="navbar-search"
              onChange={handleSearch}
            />
            <div className="navbar-div-filter">
              <h4>Select type</h4>
              <select
                name="type"
                id="type"
                className="navbar-filter-type"
                onChange={(e) => {
                  handleType(e.target.value);
                }}
              >
                {types.map((type) => (
                  <option key={type.name} value={type.name}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
            {/* TODO: MEJORAR EL FILTRADO POR HABILIDADES */}
            {/* <div className="navbar-div-filter">
              <h4>Select ability</h4>
              <select
                name="abilities"
                id="abilities"
                className="navbar-filter-abilities"
                onChange={(e) => {
                  handleAbilities(e.target.value);
                }}
              >
                {abilities.map((ability) => (
                  <option key={ability.name} value={ability.name}>
                    {ability.name}
                  </option>
                ))}
              </select>
            </div> */}
            <Button
              className={"navbar-button"}
              text={"Clean"}
              onClick={() => {
                handleClean();
              }}
            />
          </div>
        </ul>
      </div>
    </nav>
  );
}

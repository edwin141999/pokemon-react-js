import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../images/pokemon-logo.png";
import {
    setSearchPokemon,
    setSearchResults,
} from "../redux-toolkit/searchPokemon";
import {
    getAbilitiesPokemonAPI,
    getPokemonByAbilityAPI,
    getPokemonByTypeAPI,
    getTypePokemonAPI,
} from "../services/pokemon-api";
import "./Navbar.css";

export default function Navbar() {
    const [types, setTypes] = useState([]);
    const [abilities, setAbilities] = useState([]);
    const allPokemons = useSelector((state) => state.search.allPokemons);

    const dispatch = useDispatch();
    const handleSearch = (e) => {
        dispatch(setSearchPokemon(e.target.value));
        const pokemonFilter = allPokemons.filter((pokemon) => {
            return pokemon.name.includes(e.target.value);
        });
        dispatch(setSearchResults(pokemonFilter));
    };

    const handleType = async (e) => {
        const typePokemon = await getPokemonByTypeAPI(e);
        const allTypePokemons = [];
        for (const element of typePokemon) {
            allTypePokemons.push(element.pokemon);
        }
        dispatch(setSearchResults(allTypePokemons));
    };

    const handleAbilities = async (e) => {
        const abilityPokemon = await getPokemonByAbilityAPI(e);
        const allAbilityPokemons = [];
        for (const element of abilityPokemon) {
            allAbilityPokemons.push(element.pokemon);
        }
        dispatch(setSearchResults(allAbilityPokemons));
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
        <div className="navbar">
            <img src={Logo} alt="" className="navbar-img" />
            <input
                type="text"
                placeholder="Enter Pokemon name..."
                className="navbar-search"
                onChange={handleSearch}
            />
            <div className="navbar-div-filter">
                <h4>Filter by Type</h4>
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
            <div className="navbar-div-filter">
                <h4>Filter by Abilities</h4>
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
            </div>
            <div>
                <button
                    className="navbar-button"
                    onClick={() => {
                        dispatch(setSearchResults(allPokemons));
                    }}
                >
                    Clean
                </button>
            </div>
        </div>
    );
}

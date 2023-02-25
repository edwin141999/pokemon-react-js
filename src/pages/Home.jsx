import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card";
import {
    getAllPokemon,
    setSearchResults,
} from "../redux-toolkit/searchPokemon";
import { getPokemonAPI } from "../services/pokemon-api";
import "./Home.css";

export default function Home() {
    const [pokemon, setPokemon] = useState([]);

    const searchResults = useSelector((state) => state.search.searchResults);
    const searchPokemon = useSelector((state) => state.search.searchText);
    const dispatch = useDispatch();

    const getPokemons = async () => {
        const pokemons = await getPokemonAPI();
        dispatch(setSearchResults(pokemons));
        dispatch(getAllPokemon(pokemons));
        setPokemon(pokemons);
    };

    useEffect(() => {
        getPokemons();
    }, []);

    useEffect(() => {
        setPokemon(searchResults);
        if (searchPokemon === "") {
            getPokemons();
        }
    }, [searchResults, searchPokemon]);

    return (
        <div className="div-background">
            <div className="home-div">
                {pokemon.map((pokemon) => (
                    <Card
                        key={pokemon.name}
                        name={pokemon.name}
                        url={pokemon.url}
                    />
                ))}
            </div>
        </div>
    );
}

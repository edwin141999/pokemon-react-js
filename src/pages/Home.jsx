import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { getPokemonAPI } from "../services/pokemon-api";
import "./Home.css";

export default function Home() {
    const [pokemon, setPokemon] = useState([]);

    useEffect(() => {
        const getPokemons = async () => {
            const pokemons = await getPokemonAPI();
            setPokemon(pokemons);
        };
        getPokemons();
    }, []);

    return (
        <div className="home-div">
            {pokemon.map((pokemon) => (
                <Card
                    key={pokemon.name}
                    name={pokemon.name}
                    url={pokemon.url}
                />
            ))}
        </div>
    );
}

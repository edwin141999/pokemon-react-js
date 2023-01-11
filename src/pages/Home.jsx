import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import "./Home.css";

export default function Home() {
    const [pokemon, setPokemon] = useState([]);
    const getPokemon = () => {
        fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=56")
            .then((response) => response.json())
            .then((data) => {
                setPokemon(data.results);
            });
    };

    useEffect(() => {
        getPokemon();
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

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

  const [offset, setOffset] = useState(0);

  const getPokemons = async () => {
    const pokemons = await getPokemonAPI(offset, 48);
    dispatch(setSearchResults(pokemons));
    dispatch(getAllPokemon(pokemons));
    setPokemon(pokemons);
  };

  const handleNext = () => {
    setOffset(offset + 48);
  };

  const handlePrevious = () => {
    setOffset(offset - 48);
  };

  useEffect(() => {
    getPokemons();
  }, [offset]);

  useEffect(() => {
    setPokemon(searchResults);
  }, [searchResults, searchPokemon]);

  return (
    <div className="div-background">
      <header className="div-btn">
        {offset === 0 ? (
          <button disabled className="btn-disabled">
            Anterior
          </button>
        ) : (
          <button className="btn-change" onClick={() => handlePrevious()}>
            Anterior
          </button>
        )}
        <button className="btn-change" onClick={() => handleNext()}>
          Siguiente
        </button>
      </header>
      <section className="home-div">
        {pokemon.map((pokemon) => (
          <Card key={pokemon.name} name={pokemon.name} url={pokemon.url} />
        ))}
      </section>
    </div>
  );
}

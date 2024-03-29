import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../assets/styles/Home.css";
import Button from "../../components/Button";
import Card from "../../components/Card";
import { getPokemonAPI } from "../../middleware/pokemon-api";
import {
  getAllPokemon,
  setSearchResults,
} from "../../redux-toolkit/searchPokemon";

export default function Home() {
  const [pokemon, setPokemon] = useState([]);

  const searchResults = useSelector((state) => state.search.searchResults);
  const searchPokemon = useSelector((state) => state.search.searchText);
  const dispatch = useDispatch();

  const [offset, setOffset] = useState(0);

  const handleNext = () => {
    setOffset(offset + 48);
  };

  const handlePrevious = () => {
    setOffset(offset - 48);
  };

  useEffect(() => {
    const getPokemons = async () => {
      const pokemons = await getPokemonAPI(offset, 48);
      // const allPokemons = await getPokemonAPI(0, 1118);
      dispatch(setSearchResults(pokemons));
      dispatch(getAllPokemon(pokemons));
      // dispatch(getAllPokemon(allPokemons));
      setPokemon(pokemons);
    };
    getPokemons();
  }, [dispatch, offset]);

  useEffect(() => {
    setPokemon(searchResults);
  }, [searchResults, searchPokemon]);

  return (
    <div className="div-background">
      <header className="div-btn">
        {pokemon.length === 48 && (
          <>
            {offset === 0 ? (
              <Button className={"btn-disabled"} text={"Anterior"} />
            ) : (
              <Button
                className={"btn-change"}
                text={"Anterior"}
                onClick={() => handlePrevious()}
              />
            )}
            <Button
              className={"btn-change"}
              text={"Siguiente"}
              onClick={() => handleNext()}
            />
          </>
        )}
      </header>
      <section className="home-div">
        {pokemon.map((pokemon) => (
          <Card key={pokemon.name} name={pokemon.name} url={pokemon.url} />
        ))}
      </section>
    </div>
  );
}

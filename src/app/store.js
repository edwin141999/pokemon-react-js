import { configureStore } from "@reduxjs/toolkit";
import searchPokemonReducer from "../redux-toolkit/searchPokemon";


export const store = configureStore({
    reducer: {
        search: searchPokemonReducer,
    },
});
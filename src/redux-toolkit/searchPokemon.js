import { createSlice } from "@reduxjs/toolkit";

const initialState = { searchText: '', searchResults: [], allPokemons: [] }

export const searchPokemonSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setSearchPokemon: (state, action) => {
            state.searchText = action.payload;
        },
        getAllPokemon: (state, action) => {
            state.allPokemons = action.payload;
        },
        setSearchResults: (state, action) => {
            state.searchResults = action.payload;
        }
    }
})

export const { setSearchPokemon, setSearchResults, getAllPokemon } = searchPokemonSlice.actions;

export default searchPokemonSlice.reducer;
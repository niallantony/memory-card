import { useEffect, useState } from "react";
import { Card } from "./Card";
import {v4 as uuidv4} from "uuid";

const fetchPokemon = async() => {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=1025');
        const data = await response.json();
        return data.results;
    } catch (err) {
        console.error(err);
    }
}

const pokemonSelection = async (pokedex, set) => {
    try {
        const pokemonSelection = [];
        for (let id of set) {
            pokemonSelection.push(pokedex[id]);
        }
        return pokemonSelection;
    } catch (err) {
        console.error(err);
    }
}

export function Board(){

    const POKEMON_LIMIT = 1025;
    const CARD_NUMBER = 12;
    
    const [pokemonArray, setPokemonArray] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const randomIds = createSet(CARD_NUMBER);
        const fillArray = async (set) => {
            const results = await fetchPokemon();
            const selection = await pokemonSelection(results, set);
            const infoArray = selection.map((pokemon) => pokemon.url);
            setPokemonArray(infoArray);
        }
        fillArray(randomIds);
        setLoading(false)
    },[]);

    const createSet = (limit) => {
        const set = new Set();
        while (set.size < limit) {
            set.add(Math.floor(Math.random() * POKEMON_LIMIT));
        }
        return set;
    }

    return(
        <div className="board">
            {loading ? (<p>Now Loading...</p>) : pokemonArray.map((pokemon) => (<Card key={uuidv4()} pokeUrl={pokemon}/>))}
        </div>
    )
}
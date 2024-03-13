import { useEffect, useState } from "react";
import { Card } from "./Card";
import {v4 as uuidv4} from "uuid";
import "./Board.css";

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

export function Board({score, increaseScore, inGame, setGame}){

    const POKEMON_LIMIT = 1025;
    const CARD_NUMBER = 12;
    
    const [pokemonArray, setPokemonArray] = useState([]);
    const [loading, setLoading] = useState(true);
    const [clickedPokemon, setClickedPokemon] = useState([]);

    useEffect(() => {
        const randomIds = createSet(CARD_NUMBER);
        const fillArray = async (set) => {
            const results = await fetchPokemon();
            const selection = await pokemonSelection(results, set);
            setPokemonArray(selection);
        }
        fillArray(randomIds);
        setLoading(false)
    },[]);

    const addPoint = () => {
        if (inGame) {
            increaseScore(score+1);
        }
    }

    const gameOver = () => {
        console.log("Game over...")
        setGame(false);
    }

    const clickCard = (pokemon) => {
        if (clickedPokemon.includes(pokemon.name)) {
            gameOver();
        } else if (inGame) {
            let audio = new Audio(pokemon.cry);
            audio.play();
            setPokemonArray(shuffleArray(pokemonArray));
            setClickedPokemon([...clickedPokemon, pokemon.name]);
            addPoint();
        }
    }

    const shuffleArray = (array) => {
        return [...array].sort(() => Math.random() > 0.5 ? 1 : -1)
    }

    const createSet = (limit) => {
        const set = new Set();
        while (set.size < limit) {
            set.add(Math.floor(Math.random() * POKEMON_LIMIT));
        }
        return set;
    }

    return(
        <div className="board">
            {loading ? (<p>Now Loading...</p>) : pokemonArray.map((pokemon) => (<Card key={uuidv4()} onClick={(pokemon) => clickCard(pokemon)} pokeUrl={pokemon.url}/>))}
        </div>
    )
}
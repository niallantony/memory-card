import { useState, useEffect} from "react";
import "./Card.css";

export function Card({pokeUrl, onClick}) {
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch(pokeUrl);
                const data = await response.json();
                let pokemon = {
                    name: data.name.split('-')[0],
                    img: data.sprites.front_default,
                    cry: data.cries.legacy ? data.cries.legacy : data.cries.latest,
                }
                setPokemon(pokemon);
            } catch (err) {
                console.error(err);
            }
        }
        getData();
    },[pokeUrl])

    function clickCard() {
        onClick(pokemon.name);
    }
    
    return (<>
        {pokemon ? (<div className="card" onClick={clickCard}><p className="name">{pokemon.name}</p><img alt={pokemon.name} src={pokemon.img} /></div>) : (<p>Loading...</p>)}
        </>)
}
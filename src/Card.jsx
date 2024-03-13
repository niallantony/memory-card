import { useState, useEffect} from "react";

export function Card({pokeUrl}) {
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch(pokeUrl);
                const data = await response.json();
                let pokemon = {
                    name: data.name,
                    img: data.sprites.front_default,
                    cry: data.cries.legacy ? data.cries.legacy : data.cries.latest,
                }
                console.log(pokemon);
                setPokemon(pokemon);
            } catch (err) {
                console.error(err);
            }
        }
        getData();
    },[])

    return (<>
        {pokemon ? (<div className="card"><p>{pokemon.name}</p><img alt={pokemon.name} src={pokemon.img} /></div>) : (<p>Loading...</p>)}
        </>)
}
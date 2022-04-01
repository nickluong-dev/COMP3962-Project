import axios from 'axios'

async function getFetch(url, params) {
    // Axios
    try {
        const response = await axios.get(url, { params })
        return response.data
    } catch (error) {
        console.log(`Error with url: ${url}`)
        console.error(error)
    }
}

export async function fetchPokemons(limit, offset) {
    const response = await getFetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    )
    return response
}

export async function fetchPokemonData(url) {
    const response = await getFetch(url)
    return response
}

export async function fetchCharmander() {
    const response = await getFetch(
        'https://pokeapi.co/api/v2/pokemon/charmander'
    )
    return response
}

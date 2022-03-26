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

export async function fetchPokemonData(limit, offset) {
    const response = await getFetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
    return response
}
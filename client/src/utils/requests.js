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

export async function sendCheckout(body) {
    const options = {
        method: 'POST',
        body: body,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
    }
    // console.log(body);
    fetch(
        'http://Cloudprojecttestapi-env.eba-eeyupmww.us-west-2.elasticbeanstalk.com/purchases',
        options
    )
        .then((data) => {
            return data.json()
        })
        .then((res) => {
            console.log(res)
        })
        .catch((error) => console.log(error))
}

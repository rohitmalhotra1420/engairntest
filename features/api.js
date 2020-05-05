import axios from 'axios';
import { API_KEY } from './constants';

export const getDataFromAsteroidId = (id) => {
    return axios({
        method: 'GET',
        url: `https://api.nasa.gov/neo/rest/v1/neo/${id}`,
        params: {
            api_key: API_KEY
        }
    })
}

export const getBrowseAsteroidData = () => {
    return axios({
        method: 'GET',
        url: 'https://api.nasa.gov/neo/rest/v1/neo/browse/',
        params: {
            api_key: API_KEY
        }
    })
}
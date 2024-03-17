import APIClient from './apiClient';
import Pokemon from '../models/Pokemon';

const client = new APIClient<Pokemon>('/v2/pokemon');

export default client;
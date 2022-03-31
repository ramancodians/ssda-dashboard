import algoliasearch from 'algoliasearch/lite';
import { ALGOLIA_KEY } from './consts';

// API keys below contain actual values tied to your Algolia account
const client = algoliasearch('PHRI3NXJTF', ALGOLIA_KEY);
export const doctorIndex = client.initIndex('Doctor Search');
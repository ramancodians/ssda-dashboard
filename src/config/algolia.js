import algoliasearch from 'algoliasearch';
import { ALGOLIA_KEY } from './consts';

// API keys below contain actual values tied to your Algolia account
const client = algoliasearch('PHRI3NXJTF', ALGOLIA_KEY);

// Init indexes
export const doctorIndex = client.initIndex('Doctor Search');
export const workIndex = client.initIndex("WorkIndex")

export const addDoctorForElastic = async (payload) => {
  try {
     const objectIds = await doctorIndex.saveObject({
       ...payload,
     })
  } catch (error) {
    console.error(error);
  }
}

export const addWorkForElastic = async (payload) => {
  try {
     const objectIds = await workIndex.saveObject({
       ...payload,
     })
  } catch (error) {
    console.error(error);
  }
}

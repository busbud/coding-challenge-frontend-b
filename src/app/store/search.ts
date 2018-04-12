import { action, computed, observable, reaction } from 'mobx';
import { fetchSearch } from '../helpers/api';

export interface ApiResponse {
  city_id: string;
  city_url: string;
  full_name: string;
  geohash: string;
  lat: number;
  lon: number;
}

export interface SearchStoreType {
  status: 'PENDING' | 'COMPLETE' | 'INPROGRESS',
  results: any;
}

class SearchStore<SearchStoreType> {
  @observable status: 'PENDING';
  @observable results: undefined;


  @action
  search = async () => {
    console.log('hello')
    try {
      const results = await fetchSearch();
      console.log(results)
      return results;
    } catch {

    } finally {
      
    }
  }
  
  // Todo ToJSON method for ssr?
}

const searchStore = new SearchStore();


export default searchStore;
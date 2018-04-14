import { action, computed, observable, reaction, when } from 'mobx';
import { fetchSearch, SearchResponse, adaptResponse } from '../helpers/api';


export class SearchStore {
  @observable requestStatus = 'INPROGRESS' as 'INPROGRESS' | 'RESOLVED'
  @observable isComplete = undefined as undefined | boolean;
  @observable results = undefined as undefined | SearchResponse;

  @action
  search = async () => {
    try {
      const results = await fetchSearch();
      this.isComplete = results.complete
      console.log(results.complete)
      console.log(results);
      
      if (results.complete) {
        this.isComplete = true;
        this.requestStatus = 'RESOLVED';
      }
      return this.results = adaptResponse(results);
    } finally {}
  }
}

const searchStore: SearchStore = new SearchStore();

when(
  () => (
    searchStore.isComplete !== undefined 
    && !searchStore.isComplete 
    && searchStore.requestStatus !== 'RESOLVED'
  ),
  () => { 
    console.log('searchStore.isComplete !== undefined:', searchStore.isComplete !== undefined);
    console.log('  && !searchStore.isComplete: ', !searchStore.isComplete); 
    console.log('&& resolved', searchStore.requestStatus !== 'RESOLVED')
    setTimeout(() => searchStore.search(), 3000)
  },
  { 
    name: 'polling search'
  }
);



export default searchStore;
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
    } finally {
      when(
        () => !searchStore.isComplete,
        () => { 
          if (!this.isComplete) {
            setTimeout(() => searchStore.search(), 2000);
          }
        },
        { name: 'polling search' }
      );
    }
  }
}

const searchStore: SearchStore = new SearchStore();



export default searchStore;
import { action, observable, when } from 'mobx';
import { fetchSearch, SearchResults, adaptResponse } from '../helpers/api';


export class SearchStore {
  @observable isComplete = undefined as undefined | boolean;
  @observable results = undefined as undefined | SearchResults;

  @action
  search = async () => {
    try {
      const results = await fetchSearch();
      this.isComplete = results.complete
      
      if (results.complete) {
        this.isComplete = true;
      }

      return this.results = adaptResponse(results);
    } finally {
      when(
        () => !searchStore.isComplete,
        () => { 
          if (!searchStore.isComplete) {
            setTimeout(() => searchStore.search(), 1000);
          }
        }
      );
    }
  }
}

const searchStore: SearchStore = new SearchStore();



export default searchStore;
import { action, observable, when } from 'mobx';
import { fetchSearch, SearchResults, adaptResponse } from '../helpers/api';


export class SearchStore {
  @observable isComplete = undefined as undefined | boolean;
  @observable results = undefined as undefined | SearchResults;
  @observable error = undefined as undefined | string;

  @action
  search = async (outboundDate?: string, passangerNumber?: number) => {
    try {
      const results = await fetchSearch(outboundDate, passangerNumber);
      this.isComplete = results.complete
      
      if (results.complete) {
        this.isComplete = true;
      }

      return this.results = adaptResponse(results);
    } catch(error) {
      this.isComplete = true;
      this.error = error;
    } finally {
      when(
        () => !searchStore.isComplete,
        () => { 
          if (!searchStore.isComplete) {
            setTimeout(() => searchStore.search(outboundDate, passangerNumber), 1000);
          }
        }
      );
    }
  }
}

const searchStore: SearchStore = new SearchStore();



export default searchStore;
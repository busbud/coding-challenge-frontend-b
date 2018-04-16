import { action, observable, when } from 'mobx';
import { fetchSearch, SearchResults, adaptResponse } from '../helpers/api';


export class SearchStore {
  @observable isComplete = undefined as undefined | boolean;
  @observable results = undefined as undefined | SearchResults;
  @observable error = undefined as undefined | string;
  @observable searchParams = {
    passangerNumber: 1,
    outboundDate: "2018-08-02",
  }

  @action
  clearResults = () => {
    this.isComplete = undefined;
    this.results = undefined;
    this.error = undefined;
  }

  @action
  setPassangerNumber = (value: number) => {
    this.searchParams.passangerNumber = value;
  }

  @action
  setOutboundDate = (value: string) => {
    this.searchParams.outboundDate = value;
  }

  @action
  search = async () => {
    try {
      const results = await fetchSearch(
        this.searchParams.outboundDate, 
        this.searchParams.passangerNumber
      );
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
            setTimeout(() => this.search(), 1000);
          }
        }
      );
    }
  }
}

const searchStore: SearchStore = new SearchStore();



export default searchStore;
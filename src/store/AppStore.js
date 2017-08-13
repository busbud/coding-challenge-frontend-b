const AppDispatcher = require('../actions/AppDispatcher');
const EventEmitter = require('events').EventEmitter;
const CHANGE_EVENT = 'change';
const LOADER_EVENT = 'loader-change';

class AppStoreClass extends EventEmitter {
	constructor() {
		super();
    this._results = {};
    this._isLoading = false;
  }
  
  emitChange(event) {
		this.emit(event);
  }
  addChangeListener(callback) {
		this.on(CHANGE_EVENT, callback);
	}
	removeChangeListener(callback) {
		this.removeListener(CHANGE_EVENT, callback);
  }
  addLoaderListener(callback) {
		this.on(LOADER_EVENT, callback);
	}
	removeLoaderListener(callback) {
		this.removeListener(LOADER_EVENT, callback);
  }
  
  getAllResults() {
		return this._results;
  }
  populate(results) {
		this._results = results;
  }
  isLoading(){
    return this._isLoading;
  }
  toggleLoader(isLoading){
    this._isLoading = isLoading;
  }
};

const AppStore = new AppStoreClass();

module.exports = AppStore;

AppDispatcher.register(function(action) {
	switch (action.actionType) {
		case 'POPULATE_RESULTS': {
			AppStore.populate(action.results);
			AppStore.emitChange(CHANGE_EVENT);
			break;
    }
    case 'TOGGLE_LOADER': {
			AppStore.toggleLoader(action.isLoading);
			AppStore.emitChange(LOADER_EVENT);
			break;
    }
    default: break;
	}
});
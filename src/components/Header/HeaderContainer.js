import React from 'react';
import BudHeader from './BudHeader'
import Searcher from './Searcher'
import Menu from './Menu/Menu'

export default function List(props){
    return(
        <div className="top-container">
          {false && <div>showAlert</div>}
          <Menu/>
          <BudHeader/>
          <Searcher/>
        </div>
    )
}
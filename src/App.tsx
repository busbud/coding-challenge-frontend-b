import { DepartureSearch } from './features/departure-search/DepartureSearch'

import styles from './App.module.scss'

function App(): JSX.Element {
  return (
    <div className="App">
      <header className={styles.header}>
        <h1>OSHEAGA</h1>
        <span>FESTIVAL MUSIQUE ET ARTS</span>
      </header>
      <div className={styles.content}>
        <DepartureSearch />
      </div>
    </div>
  )
}

export default App

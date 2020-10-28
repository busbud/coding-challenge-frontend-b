import './styles/App.scss';
import osheaga from './osheaga.png'
import AppContainer from './components/AppContainer'

export default function App() {
  return (
    <div className="App">
      <AppContainer/>
      <a href="https://osheaga.com" target="_blank"><img src={osheaga} className="ribbon"/></a>
    </div>
  );
}

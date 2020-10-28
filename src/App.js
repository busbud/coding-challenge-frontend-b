import './styles/App.scss';
import AppContainer from './components/AppContainer'

export default function App() {
  return (
    <div className="App">
      <AppContainer/>
      <a href="https://osheaga.com" target="_blank"><img src={'../osheaga.png'} className="ribbon"/></a>
    </div>
  );
}

import './App.css';
import MapView from './components/MapView';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App" style={{height:'100vh',width:'100%'}}>
    <Navbar/>
     <MapView/>
    </div>
  );
}

export default App;


import './App.css';
import axios from 'axios';
import Search from './components/Search/search.jsx';
import Spline from '@splinetool/react-spline';
import logo from './assets/images/weathy-logo.png';

function App() {
  return (
    <div className="App">
      <header>
        <nav className='navbar'>
          <img className='navbar__image' src={logo} alt='logo-Weathy' />
          <ul className='navbar__link'>
            <li className='navbar__link-item'>LinkedIn</li>
            <li className='navbar__link-item'>Github</li>
          </ul>
        </nav>
      </header>
      <main>
        <Search />
        <div className='spline'>
          <Spline scene="https://prod.spline.design/z8ML-U1cYT2gsIdI/scene.splinecode" />
        </div>
      </main>
    </div>
  );
}

export default App;

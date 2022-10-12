
import React, { useState, Suspense } from 'react';
import './App.css';
import axios from 'axios';
import Search from './components/Search/search.jsx';
import Spline from '@splinetool/react-spline';
import logo from './assets/images/weathy-logo.png';
import { ColorRing } from 'react-loader-spinner'

function App() {
  const [loading, setLoading] = useState(false)
  return (
    <div className="App">
      <header>
        <nav className='navbar'>
          <img className='navbar__image' src={logo} alt='logo-Weathy' />
          <ul className='navbar__link'>
            <li className='navbar__link-item'><a href="https://fr.linkedin.com/in/ophelie-diomar-680162209" target="_blank">LinkedIn</a></li>
            <li className='navbar__link-item'><a href="https://github.com/phelied/weathy" target="_blank">Github</a></li>
          </ul>
        </nav>
      </header>
      <main>
        <Search />
        <Suspense fallback={<ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />}>
          <div className='spline'>
            <Spline scene="https://prod.spline.design/z8ML-U1cYT2gsIdI/scene.splinecode" />
          </div>
        </Suspense>
      </main>
    </div>
  );
}

export default App;

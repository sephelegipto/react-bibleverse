import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import BibleVerse from './pages/BibleVerse';
import Login from './auth/Login';
import AddBibleVerse from './pages/AddBibleVerse';
import EditibleVerse from './pages/EditibleVerse';
import ShowBibleVerse from './pages/ShowBibleVerse';
import { NavLink } from 'react-router-dom';

function App() {
  return (
    <div className="App">      
      <Router> 
        <div className='content'>
          <Routes>
            <Route path='/' element={<BibleVerse />} />
            <Route path='/add-bibleverse' element={<AddBibleVerse />} />
            <Route path='/edit-bibleverse/:id' element={<EditibleVerse />} />
            <Route path='/show-bibleverse/:id' element={<ShowBibleVerse />} />
          </Routes>
        </div>          
      </Router>
    </div>      
     
  );
}

export default App;

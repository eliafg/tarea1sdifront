import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navigation from './components/Navigation'
import NotesList from './components/NotesList'
import CreateNote from './components/CreateNote'
import CreateUser from './components/CreateUser'
import EditNote from './components/EditNote'

import './App.css';

function App() {
  return (
    <Router>
      <Navigation />
      <div className="container p-4">
        <Route path="/" exact component={NotesList} />
        <Route path="/edit/:id" component={EditNote} />
        <Route path="/create" component={CreateNote} />
        <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;

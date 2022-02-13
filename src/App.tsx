import React, { VFC } from 'react';
// import FormBord from './components/organisms/FormBord';
// import Form from './components/organisms/Form'
import './App.css';
import FormPage from './components/pages/FormPage';

const App: VFC = () => (
  <div className="container">
    {/* <FormBord /> */}
    <FormPage />
  </div>
);

export default App;

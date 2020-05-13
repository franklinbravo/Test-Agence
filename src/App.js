import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Header } from './Components/Header';
import { Desempenho } from './Views/Desempenho';
import { ContextProvider } from './Context/Context';
import { Alerts } from './Components/Alerts';

function App() {
  return (
    <ContextProvider>
      <div className="App">
        <Header />
        <Desempenho />
        <Alerts />
      </div>
    </ContextProvider>
  );
}

export default App;

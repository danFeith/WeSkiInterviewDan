import './App.css';
import { Routes, Route } from "react-router-dom";
import MainPage from './Pages/MainPage/MainPage';
import {  WebsocketProvider } from './Contexts/websocketContext'




function App() {

  return (
    <WebsocketProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </div>
    </WebsocketProvider>
  );
}

export default App;

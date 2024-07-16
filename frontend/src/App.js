import React from "react";
import { Route, Routes } from "react-router-dom";
import PasteForm from "./components/PasteForm";
import PasteView from "./components/PasteView";


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<PasteForm />} />
      <Route path='/:url' element={<PasteView />} />
    
    </Routes>
  );
};

export default App;

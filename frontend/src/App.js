import React from "react";
import { Route, Routes } from "react-router-dom";
import PasteForm from "./components/PasteForm";
import PasteView from "./components/PasteView";
import TextEditor from "./components/TextEditor";

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<PasteForm />} />
      <Route path='/:url' element={<PasteView />} />
      <Route path='/textarea' element={<TextEditor />} />
    </Routes>
  );
};

export default App;

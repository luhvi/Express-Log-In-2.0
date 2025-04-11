import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import Form from './Form';
import LandingPage from './LandingPage';

function App() {
  const [language, setLanguage] = useState<'English' | 'Dansk'>('English');

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <LandingPage language={language} setLanguage={setLanguage} />
          }
        ></Route>
        <Route
          path="/signin"
          element={
            <Form language={language} setLanguage={setLanguage} signIn={true} />
          }
        ></Route>
        <Route
          path="/signup"
          element={
            <Form
              language={language}
              setLanguage={setLanguage}
              signIn={false}
            />
          }
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;

import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Form from './Form';
import LandingPage from './LandingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/signin" element={<Form signIn={true} />}></Route>
        <Route path="/signup" element={<Form signIn={false} />}></Route>
      </Routes>
    </Router>
  );
}

export default App;

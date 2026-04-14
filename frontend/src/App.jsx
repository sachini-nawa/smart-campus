// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import OAuthSuccess from "./pages/OAuthSuccess";
import SignUpPage from "./pages/SignUpPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/oauth-success" element={<OAuthSuccess />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
import { Home, ViewPokemon } from 'pages';
import { Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pokemon/:name" element={<ViewPokemon />} />
    </Routes>
  );
}

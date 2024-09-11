import { Route, Routes } from 'react-router-dom';
import DisplaySecret from './displaySecret/DisplaySecret';
import IndexPage from './pages/IndexPage';

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      {/* <Route path="/upload" element={<Upload />} /> */}
      <Route path="/:format/:key/:password" element={<DisplaySecret />} />
      <Route path="/:format/:key" element={<DisplaySecret />} />
    </Routes>
  );
};

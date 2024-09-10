import { Route, Routes } from 'react-router-dom';
import CreateSecret from './createSecret/CreateSecret';
import Upload from './createSecret/Upload';
import DisplaySecret from './displaySecret/DisplaySecret';

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<CreateSecret />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/:format/:key/:password" element={<DisplaySecret />} />
      <Route path="/:format/:key" element={<DisplaySecret />} />
    </Routes>
  );
};

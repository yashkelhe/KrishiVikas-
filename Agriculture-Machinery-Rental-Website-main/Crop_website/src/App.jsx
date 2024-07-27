
import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import { ModelLoader } from '../src/components/home/HomePage.jsx';
import { CropPage } from '../src/components/crop/CropPage.jsx';
import { FertilizerPage } from '../src/components/fertilizer/FertilizerPage.jsx';
import { CropResult } from '../src/components/result/CropResult';
import { FertilizerResult } from '../src/components/result/FertilizerResult';


function NotFound() {
  // Redirect all unknown paths to /
  return <Navigate to="/" />
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<ModelLoader />} />
      <Route path="/crop" element={<CropPage />} />
      <Route path="/fertilizer" element={<FertilizerPage />} />
      <Route path="/crop_result" element={<CropResult />} />
      <Route path="/fertilizer_result" element={<FertilizerResult />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;

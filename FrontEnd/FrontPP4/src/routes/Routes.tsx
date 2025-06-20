// src/Routes.tsx

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ContentHome } from '../Components/Molecules/ContentHome';
import { Auth } from '../pages/Login';
import App from '../App';
import { Register } from '../pages/Register';
import { Perfil } from '../pages/Perfil';
import { Books } from '../pages/Books';

export const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<ContentHome />} />
        <Route path='/register' element={<Register/>} />
        <Route path="login" element={<Auth />} />
        <Route path="perfil" element={<Perfil />} />
        <Route path="books" element={<Books />} />
        <Route path="profile" element={<Navigate to="/login" replace />} />
      </Route>
      <Route path="*" element={<p>Página no encontrada</p>} />
    </Routes>
  </BrowserRouter>
);

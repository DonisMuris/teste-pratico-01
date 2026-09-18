import { Navigate, Route, Routes } from 'react-router-dom';

import { AppShell } from '@/components/layout/AppShell';
import { CertificadoPage } from '@/pages/CertificadoPage';
import { HomePage } from '@/pages/HomePage';
import { RelatorioPage } from '@/pages/RelatorioPage';

export function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/relatorio" element={<RelatorioPage />} />
        <Route path="/certificado" element={<CertificadoPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  );
}

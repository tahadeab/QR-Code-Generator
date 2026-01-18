import QRCodeGenerator from './pages/QRCodeGenerator';
import type { ReactNode } from 'react';

interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
}

const routes: RouteConfig[] = [
  {
    name: 'QR Code Generator',
    path: '/',
    element: <QRCodeGenerator />
  }
];

export default routes;

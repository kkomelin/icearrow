import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './i18n';

import './styles/main.css';

// @todo: Load fonts from filesystem. Currently using Google Fonts to simplify the deployment. See index.html
// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <Suspense fallback={<div>Loading...</div>}>
    <App />
  </Suspense>,
);

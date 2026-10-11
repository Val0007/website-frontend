import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  <App />
</BrowserRouter>
)

// Deliberate lint errors to demonstrate that CI blocks a bad change
const unusedDemo: any = 1

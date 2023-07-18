import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from "react-router-dom";
import App from './App'
import { reducer, StateProvider } from './state';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <StateProvider reducer={reducer}>
      <App />
    </StateProvider>
  </Router>
)
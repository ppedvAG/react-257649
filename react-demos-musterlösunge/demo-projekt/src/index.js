import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./demo-07-context";
import { Provider } from "react-redux";
import { store } from "./redux-store";

// Was macht React.StrictMode?
// Es aktiviert zusätzliche Checks und Warnungen für die Entwicklung.
// Es hat keinen Einfluss auf die Produktion.
// Es kann dazu führen, dass manche Funktionen (z.B. useEffect) doppelt ausgeführt werden.
// Warum doppelte Ausführung? 
// React möchte sicherstellen, dass deine Komponenten robust sind und keine unerwarteten Seiteneffekte haben. 

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient();
root.render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

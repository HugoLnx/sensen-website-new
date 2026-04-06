import Layout from "./components/Layout/Layout";
import { SettingsProvider } from "./contexts/SettingsContext";
import { AppRoutes } from "./routes";
import "@/assets/styles/index.css";
import { StoreProvider } from './contexts/StoreContext';
import { Toaster } from "sonner";

import { LanguageProvider } from './contexts/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <SettingsProvider>
        <StoreProvider>
          <Layout>
            <AppRoutes />
          </Layout>
          <Toaster position="top-right" theme="dark" richColors />
        </StoreProvider>
      </SettingsProvider>
    </LanguageProvider>
  );
}

export default App;

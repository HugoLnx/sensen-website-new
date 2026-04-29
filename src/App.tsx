import Layout from "./components/Layout/Layout";
import { SettingsProvider } from "./contexts/SettingsContext";
import { AppRoutes } from "./routes";
import "@/assets/styles/index.css";
import { Toaster } from "sonner";

import { LanguageProvider } from './contexts/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <SettingsProvider>
          <Layout>
            <AppRoutes />
          </Layout>
          <Toaster position="top-right" theme="dark" richColors />
      </SettingsProvider>
    </LanguageProvider>
  );
}

export default App;

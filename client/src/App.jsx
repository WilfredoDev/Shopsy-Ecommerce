import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes, AuthRoutes } from "./routes";
import { CartProvider } from "./context";
import { Layout } from './components/Layout';
import { Ripple } from 'react-preloaders';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula una carga de 2 segundos
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Limpiar el temporizador si el componente se desmonta antes de que termine
    return () => clearTimeout(timer);
  }, []);

  return (
    <CartProvider>
      <BrowserRouter>
        {loading ? (
          <Ripple />
        ) : (
          <Layout>
            <AppRoutes />
            <AuthRoutes />
          </Layout>
        )}
      </BrowserRouter>
    </CartProvider>
  );
};

export { App };

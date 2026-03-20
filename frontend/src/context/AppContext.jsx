'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import QuickQuoteModal from '@/components/QuickQuoteModal';

const AppContext = createContext(null);
export const useApp = () => useContext(AppContext);

export function AppProvider({ children }) {
  const [region, setRegion] = useState('international');
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [adminToken, setAdminToken] = useState(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('shanker_region');
      if (stored) setRegion(stored);
      const token = localStorage.getItem('adminToken');
      if (token) setAdminToken(token);
    } catch (e) {}
  }, []);

  const handleRegionChange = (r) => {
    setRegion(r);
    try { localStorage.setItem('shanker_region', r); } catch (e) {}
  };

  const handleAdminLogin = (t) => {
    setAdminToken(t);
    try { localStorage.setItem('adminToken', t); } catch (e) {}
  };

  const handleAdminLogout = () => {
    setAdminToken(null);
    try { localStorage.removeItem('adminToken'); } catch (e) {}
  };

  return (
    <AppContext.Provider value={{
      region, handleRegionChange,
      showQuoteModal, setShowQuoteModal,
      adminToken, handleAdminLogin, handleAdminLogout,
    }}>
      {children}
      {showQuoteModal && <QuickQuoteModal onClose={() => setShowQuoteModal(false)} />}
    </AppContext.Provider>
  );
}

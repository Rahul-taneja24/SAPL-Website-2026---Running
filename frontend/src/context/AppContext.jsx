'use client';
import '@/i18n/config';

import { createContext, useContext, useState, useEffect } from 'react';
import QuickQuoteModal from '@/components/QuickQuoteModal';

const AppContext = createContext(null);
export const useApp = () => useContext(AppContext);

export function AppProvider({ children }) {
  const [region, setRegion] = useState('international');
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [adminToken, setAdminToken] = useState(null);
  const [geoBanner, setGeoBanner] = useState(null); // 'india' | 'international' | null

  useEffect(() => {
    try {
      const stored = localStorage.getItem('shanker_region');
      const bannerDismissed = localStorage.getItem('shanker_geo_banner_dismissed');
      const hintMatch = document.cookie.match(/(?:^|; )shanker_geo_hint=([^;]+)/);
      const hint = hintMatch ? decodeURIComponent(hintMatch[1]) : null;

      if (stored) {
        // Visitor already made an explicit choice, respect it, no banner.
        setRegion(stored);
      } else if (hint) {
        // No explicit choice yet, silently default to the geo-detected
        // region and show a small dismissible confirmation banner.
        setRegion(hint);
        if (!bannerDismissed) setGeoBanner(hint);
      }

      const token = localStorage.getItem('adminToken');
      if (token) setAdminToken(token);
    } catch (e) {}
  }, []);

  const handleRegionChange = (r) => {
    setRegion(r);
    setGeoBanner(null);
    try {
      localStorage.setItem('shanker_region', r);
      localStorage.setItem('shanker_geo_banner_dismissed', '1');
    } catch (e) {}
  };

  // Auto-hide the region toast if the visitor doesn't respond. The region is
  // already applied by this point, so the toast is only a courtesy notice, it
  // shouldn't linger or re-appear on every subsequent page view.
  useEffect(() => {
    if (!geoBanner) return;
    const timer = setTimeout(() => {
      setGeoBanner(null);
      try { localStorage.setItem('shanker_geo_banner_dismissed', '1'); } catch (e) {}
    }, 30000);
    return () => clearTimeout(timer);
  }, [geoBanner]);

  const dismissGeoBanner = () => {
    setGeoBanner(null);
    try { localStorage.setItem('shanker_geo_banner_dismissed', '1'); } catch (e) {}
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
      geoBanner, dismissGeoBanner,
      showQuoteModal, setShowQuoteModal,
      adminToken, handleAdminLogin, handleAdminLogout,
    }}>
      {children}
      {showQuoteModal && <QuickQuoteModal onClose={() => setShowQuoteModal(false)} />}
    </AppContext.Provider>
  );
}

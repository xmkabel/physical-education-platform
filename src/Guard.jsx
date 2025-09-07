import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import get from './components/api/get';
import LoadingScreen from './components/LoadingScreen';

const ALLOWLIST = new Set([
  '/login',
  '/register',
  '/exams/start',
  '/welcome',
  '/unauthorized',
  '/redirect',
]);

export default function Guard({ children }) {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      // Only enforce for authenticated non-admin users
      if (!isAuthenticated || user?.role === 'admin') {
        setChecking(false);
        return;
      }

      // Don’t block allowlisted routes
      if (ALLOWLIST.has(location.pathname)) {
        setChecking(false);
        return;
      }

      setChecking(true);
      try {
        const me = await get('/user-rating-exams'); // { rating_exams: [] }
        const ratingsCount = Array.isArray(me?.rating_exams) ? me.rating_exams.length : 0;

        if (!cancelled) {
          if (ratingsCount === 0 && location.pathname !== '/exams/start') {
            navigate('/exams/start', { replace: true, state: { from: location } });
          }
        }
      } catch (e) {
        // Let existing auth flow handle 401s, etc.
        console.error('GlobalGuard check failed:', e);
      } finally {
        if (!cancelled) setChecking(false);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, user?.role, location.pathname, navigate]);

  // Optional: spinner/skeleton while checking
  if (checking) return <LoadingScreen />;

  return children;
}
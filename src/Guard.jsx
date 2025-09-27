import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import get from './components/api/get';
import LoadingScreen from './components/LoadingScreen';

const ALLOWLIST = new Set([
  '/login',
  '/register',
  // '/exams/start', // Removed from allowlist as logic now controls access
  '/welcome',
  '/unauthorized',
  '/redirect',
  // Add /exams to the allowlist since that's where users with ratings go
  // '/exams'
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
          // --- Logic Change Starts Here ---
          if (ratingsCount === 0) {
            // User has taken no rating exams
            if (location.pathname !== '/exams/start') {
              // Redirect them to start the first one
              navigate('/exams/start', { replace: true, state: { from: location } });
            }
            // If they are already on /exams/start, do nothing (allow access)
          } else {
            // User has taken 1 or more rating exams
            if (location.pathname === '/exams/start') {
              // Redirect them away from the start page
              // Assuming '/exams' is the correct path for the main exams page
              navigate('/exams', { replace: true }); 
            }
            // If they are on any other non-allowlisted page, access is determined by the ALLOWLIST check above
          }
          // --- Logic Change Ends Here ---
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
  }, [isAuthenticated, user?.role, location.pathname, navigate]); // Dependencies remain the same

  // Optional: spinner/skeleton while checking
  if (checking) return <LoadingScreen />;

  return children;
}
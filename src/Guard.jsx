import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { useExamData } from './services/GetExams';

const ALLOWLIST = new Set([
  '/login',
  '/register',
  '/welcome',
  '/unauthorized',
  '/redirect',
]);

export default function Guard({ children }) {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // نجيب بيانات الاختبار القبلي فقط
  const { loading, examData } = useExamData("start");

  useEffect(() => {
    if (!isAuthenticated || user?.role === 'admin') return;
    if (ALLOWLIST.has(location.pathname)) return;

    if (!loading && examData) {
      const [hasTakenExam] = examData; // [0,null] أو [1,score]

      if (hasTakenExam === 0 && location.pathname !== '/exams/start') {
        navigate('/exams/start', { replace: true, state: { from: location } });
      }
      if (hasTakenExam === 1 && location.pathname === '/exams/start') {
        navigate('/exams', { replace: true });
      }
    }
  }, [isAuthenticated, user?.role, location.pathname, navigate, examData, loading]);

  return children;
}

// hooks/useExamData.js
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import get from '../components/api/get';

export function useExamData(type) {
  const { isAuthenticated, user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [examData, setExamData] = useState(null);

  useEffect(() => {
    let cancelled = false;
    
    const fetchExamData = async () => {
      if (!isAuthenticated || user?.role === 'admin') {
        if (!cancelled) {
          setLoading(false);
          setExamData(null);
        }
        return;
      }

      try {
        setLoading(true);
        const me = await get('/user-rating-exams');
        const ratingsCount = Array.isArray(me?.rating_exams) ? me.rating_exams.length : 0;
        
        if (type === 'start') {
          if (ratingsCount === 0) {
            if (!cancelled) setExamData([0, null]);
          } else {
            const score = me.rating_exams[0].score;
            if (!cancelled) setExamData([1, score]);
          }
        }
        // Add more types here in the future
      } catch (e) {
        console.error('Error getting the exam grades', e);
        if (!cancelled) setExamData([null, null]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    if (type) {
      fetchExamData();
    } else {
      if (!cancelled) setLoading(false);
    }

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, user, type]);

  return { loading, examData };
}
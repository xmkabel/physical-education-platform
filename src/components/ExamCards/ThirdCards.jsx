import { useNavigate } from 'react-router-dom';
import './ExamCards.css';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const ThirdCards = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const examCards1 = [
    {
      id: '1',
      title: 'مهارات التدريس والتخطيط',
      description: 'تتناول مهارات التدريس المختلفة، مستويات وأسس ومبادئ التخطيط للتدريس، وعناصر تخطيط الدرس.'
    },
    {
      id: '2',
      title: 'العوامل المؤثرة في عملية التخطيط',
      description: 'تتناول العوامل المختلفة المؤثرة في عملية التخطيط، أنواع الخطط التدريسية، وأنشطة الوحدة التعليمية.'
    },
    {
      id: '3',
      title: 'ضوابط التقويم والوسائل التعليمية والواجبات المنزلية',
      description: 'تتناول ضوابط عملية التقويم، استخدام الوسائل التعليمية، وضوابط الواجبات المنزلية.'
    },
    {
      id: '4',
      title: 'الأهداف التربوية ومجالاتها',
      description: 'تتناول أنواع الأهداف التربوية ومجالاتها: المعرفي، النفسحركي، والوجداني.'
    },
    {
      id: '5',
      title: 'إدارة الدرس والوسائل التعليمية',
      description: 'تتناول مهارة إدارة الدرس، أساليب ضبط السلوك، والوسائل التعليمية وأنواعها ومعايير اختيارها.'
    }
  ];

  const handleCardClick = (examId) => {
    navigate(`/exams/third/${examId}`);
  };

  const goBack = () => {
    if (selectedCategory) {
      setSelectedCategory(null);
    } else {
      navigate("/exams");
    }
  };

  return (
    <div className={`exam-cards-container ${isLoaded ? 'loaded' : ''}`}>
      <div className="exam-cards-header">
        <button className="back-button" onClick={goBack}>
          <FontAwesomeIcon icon={faArrowLeft} className="back-arrow" /> العودة
        </button>
        <h1 className="exam-cards-title">الاختبارات المتاحة</h1>
      </div>
      
      <div className="exam-cards-section">
        <div className="exam-cards-grid">
          {examCards1.map((exam, index) => (
            <div
              key={exam.id}
              className="exam-card"
              onClick={() => handleCardClick(exam.id)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="exam-card-content">
                <div className="card-number">{index + 1}</div>
                <h2 className="exam-card-title">{exam.title}</h2>
                <p className="exam-card-description">{exam.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThirdCards;
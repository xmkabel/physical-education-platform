import { useNavigate } from 'react-router-dom';
import './ExamCards.css';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const SecondCards = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const examCards1 = [
    {
      id: '1',
      title: 'أساليب التدريس وانواعها',
      description: 'تتنوع أساليب التدريس وتشمل الأساليب المباشرة وغير المباشرة، والقائمة على المدح والنقد، والتغذية الراجعة.'
    },
    {
      id: '2',
      title: 'صفات ومعايير الطريقة الجيدة في التدريس',
      description: 'تشمل ارتباط الأنشطة بالبيئة، مناسبة قدرات التلميذ، وضوح العلاقة بين الطريقة والغرض، والمشاركة الإيجابية.'
    }
  ];

  const handleCardClick = (examId) => {
    navigate(`/exams/second/${examId}`);
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

export default SecondCards;
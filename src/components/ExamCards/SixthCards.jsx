import { useNavigate } from 'react-router-dom';
import './ExamCards.css';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Nav from '../Nav/Nav';

const SixthCards = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const examCards1 = [
    {
      id: '1',
      title: 'أسئلة (صح) و (خطأ) ',
      description: 'أسئلة عامة (صح) و (خطأ)'
    },
    {
     id:'2',
     title:'أسئلة الاختيارات المتعددة ',
     description:'أسئلة عامة اختيارات المتعددة' 
    },
    {
      id:'3',
      title:'أسئلة مقالية ',
      description:'أسئلة عامة مقالية  ' 
    }
    
  ];

  const handleCardClick = (examId) => {
    navigate(`/exams/sixth/${examId}`);
  };

  return (
    <>
      <Nav title={selectedCategory ? selectedCategory.title : "الاختبارات العامة"} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      <div className={`exam-cards-container ${isLoaded ? 'loaded' : ''}`}>
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
    </>
  );
};

export default SixthCards;
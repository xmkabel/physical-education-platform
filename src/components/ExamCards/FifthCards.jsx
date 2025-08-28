import { useNavigate } from 'react-router-dom';
import './ExamCards.css';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Nav from '../Nav/Nav';

const FifthCards = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const examCards1 = [
    {
      id: '1',
      title: 'التقويم ',
      description: 'تتنوع أساليب التدريس وتشمل الأساليب المباشرة وغير المباشرة، والقائمة على المدح والنقد، والتغذية الراجعة.'
    },
    
  ];

  const handleCardClick = (examId) => {
    navigate(`/exams/fifth/${examId}`);
  };

  
  return (
    <>
      <Nav title={selectedCategory ? selectedCategory.title : "التقويم"} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
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

export default FifthCards;
import { useNavigate } from 'react-router-dom';
import './ExamCards.css';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const ExamCards = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const categories = [
    {
      id: 'first',
      title: 'الباب الاول',
      description: 'نظريات التعلم ونظريات التدريس'
    },
    {
      id: 'second',
      title: 'الباب الثاني',
      description: 'المدخل لطرق وأساليب واستراتيجيات التدريس'
    },
    {
      id: 'third',
      title: 'الباب الثالث',
      description: 'مهارات التدريس والتدريس الفعال'
    },
    {
      id: 'fourth',
      title: 'الباب الرابع',
      description: 'استراتيجيات وطرق وأساليب التدريس في التربية الرياضية'
    },
    {
      id: 'fifth',
      title: 'الباب الخامس',
      description: 'التقويم'
    },
    {
      id: 'sixth',
      title: 'الباب السادس',
      description: 'أسئلة عامة' 
    }
  ];

  const handleCategoryClick = (categoryId) => {
    if (categoryId === 'first') {
      navigate('/exams/first');
    }
    else if (categoryId === 'second') {
      navigate('/exams/second');
    } 
    else if (categoryId === 'third') {
      navigate('/exams/third');
    }
    else if (categoryId === 'fourth') {
      navigate('/exams/fourth');
    }
    else if (categoryId === 'fifth') {
      navigate('/exams/fifth');
    }
    else if (categoryId ==='sixth') {
      navigate('/exams/sixth'); 
    }
    else {
      setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
    }
  };

  const goBack = () => {
    if (selectedCategory) {
      setSelectedCategory(null);
    } else {
      navigate('/');
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
        {!selectedCategory ? (
          <div className="exam-cards-grid">
            {categories.map((category, index) => (
              <div
                key={category.id}
                className="exam-card category-card"
                onClick={() => handleCategoryClick(category.id)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="exam-card-content">
                  <h2 className="exam-card-title">{category.title}</h2>
                  <p className="exam-card-description">{category.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // For categories other than 'first', you can add content here.
          <div className="selected-category-content">
            <h2>تفاصيل الفئة: {selectedCategory}</h2>
            {/* Additional content for the selected category can be placed here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamCards;

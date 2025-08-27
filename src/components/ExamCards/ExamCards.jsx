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
      id: 'start',
      title: 'الاختبار القبلى',
      description: 'اختبار بداية الكورس'
    },
    {
      id: 'first',
      title: 'التقويم الاول',
      description: 'نظريات التعلم ونظريات التدريس'
    },
    {
      id: 'second',
      title: 'التقويم الثاني',
      description: 'المدخل لطرق وأساليب واستراتيجيات التدريس'
    },
    {
      id: 'third',
      title: 'التقويم الثالث',
      description: 'مهارات التدريس والتدريس الفعال'
    },
    {
      id: 'fourth',
      title: 'التقويم الرابع',
      description: 'استراتيجيات وطرق وأساليب التدريس في التربية الرياضية'
    },
    {
      id: 'fifth',
      title: 'التقويم الخامس',
      description: 'التقويم'
    },
    {
      id: 'sixth',
      title: 'التقويم السادس',
      description: 'أسئلة عامة'
    },{
      id: 'final',
      title: 'الاختبار البعدى',
      description: 'اختبار نهاية الكورس'
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
    else if (categoryId === 'sixth') {
      navigate('/exams/sixth');
    }
    else if (categoryId === 'final' || categoryId === 'before') {
      navigate('/exams/final');
    }
    else if ( categoryId === 'start') {
      navigate('/exams/start');
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
    {categories.map((category, index) => {
      let cardClass = "exam-card category-card";

      if (category.id === "before") {
        cardClass += " before-card";
      } else if (category.id === "final") {
        cardClass += " after-card";
      }

      return (
        <div
          key={category.id}
          className={cardClass}
          onClick={() => handleCategoryClick(category.id)}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="exam-card-content">
            <h2 className="exam-card-title">{category.title}</h2>
            <p className="exam-card-description">{category.description}</p>
          </div>
        </div>
      );
    })}
  </div>
) : (
  <div className="selected-category-content">
    <h2>تفاصيل الفئة: {selectedCategory}</h2>
    {/* Additional content for the selected category */}
  </div>
)}

</div>
</div>

      );
};

      export default ExamCards;

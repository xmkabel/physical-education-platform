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

  const examCards1 = [
    {
        id: '1',
        title: 'نظرية سكنر السلوكية',
        description: 'أهم تطبيق تربوي هو تحليل التعلم، حيث يجزئ المدرس المهمة إلى أجزاء وخطوات لتنظيم هرمي.'
    },
    {
        id: '2',
        title: 'تصنيف نظريات التدريس',
        description: 'تشمل السلوكية (السلوك الظاهري)، المعرفية (العمليات العقلية)، والبنائية (العوامل الداخلية).'
    },
    {
        id: '3',
        title: 'استراتيجيات التدريس القائمة على الفكر البنائي',
        description: 'تشمل نموذج ويتلي (حول المشكلة)، دورة التعلم (قدرات عقلية)، والمنظومي (بياجيه وتنظيم المعلومات).'
    },
    {
        id: '4',
        title: 'نظرية جان بياجيه في النمو المعرفي',
        description: 'النمو عملية انتقائية، تشمل مراحل: الحسية الحركية، ما قبل العمليات، المحسوسة، والشكلية المجردة.'
    },
    {
        id: '5',
        title: 'نظرية التعلم السلوكية الإجرائية',
        description: 'مفاهيم: السلوك، المثير والاستجابة، التعزيز والعقاب، محددات: الإثارة، العرض، التناسب، الفوري.'
    },
    {
        id: '6',
        title: 'نظرية التعلم الجشطلتية',
        description: 'مفاهيم: الجشطلت، الاستبصار، التنظيم، مبادئ: الاستبصار شرط التعلم الحقيقي والنتائج.'
    },
    {
        id: '7',
        title: 'نظريات تصميم التدريس',
        description: 'تشمل النظم العامة، الاتصال، التعلم (سلوكية، عقلية، بنائية)، أهمية تحسين الممارسات التربوية.'
    },
    {
        id: '8',
        title: 'مفاهيم تصميم التعليم وتقنيته',
        description: 'نماذج: جانية وبرجز، ديك وكاري، المنظومي، كمب، افتراضات: فعال، كافٍ، جذاب، أبعاد: وسائل، محتوى، أداء.'
    }
];

  const categories = [
    {
      id: 'first',
      title: 'الباب الاول',
      description: 'نظريات التعلم ونظريات التدريس'
    },
    {
      id: 'second',
      title: 'الباب الثاني',
      description: 'قريباً'
    },
    {
      id: 'third',
      title: 'الباب الثالث',
      description: 'قريباً'
    }
  ];

  const handleCardClick = (examId) => {
    navigate(`/exams/first/${examId}`);
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
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
        ) : selectedCategory === 'first' ? (
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
        ) : (
          <div className="exam-cards-grid">
            <div className="exam-card">
              <div className="exam-card-content">
                <h2 className="exam-card-title">قريباً</h2>
                <p className="exam-card-description">المحتوى قيد الإعداد</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamCards;
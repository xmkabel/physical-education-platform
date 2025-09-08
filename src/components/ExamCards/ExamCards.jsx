import { useNavigate } from 'react-router-dom';
import './ExamCards.css';
import { useState, useEffect } from 'react';
import Nav from '../Nav/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCircle } from '@fortawesome/free-solid-svg-icons';
import get from '../api/get';
import { useExamData } from '../../services/GetExams';
import MyAlert from '../alert/MyAlert';
import LoadingScreen from '../LoadingScreen';
const ExamCards = () => {
  const navigate = useNavigate();
    const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { loading: firstExamLoading, examData: firstExamData } = useExamData('start');
  // useEffect(() => {
  //   if (!firstExamLoading && firstExamData) {
  //     // firstExamData is [completedCount, score] or [0, null]
  //     console.log('First Exam Data:', firstExamData);
  //     setLoading(false);
  //   } else {
  //     setLoading(true);
  //   }
  // }, [firstExamLoading, firstExamData]);
  // if (loading) {
  //   return <LoadingScreen/>;
  // }
  const categoryStats = {
    'start': { completedCount: firstExamData ? firstExamData[0] : 0, totalExams: 1 },
    'first': { completedCount: 0, totalExams: 8 },
    'second': { completedCount: 0, totalExams: 2 },
    'third': { completedCount: 0, totalExams: 5 },
    'fourth': { completedCount: 0, totalExams: 3 },
    'fifth': { completedCount: 0, totalExams: 1 },
    'sixth': { completedCount: 0, totalExams: 3 },
    'final': { completedCount: 0, totalExams: 1 }
  };

  const categories = [
    {
      id: 'start',
      title: 'الاختبار القبلي',
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
    },
    {
      id: 'final',
      title: 'الاختبار البعدى',
      description: 'اختبار نهاية الكورس'
    }
  ];

  const start = () => {
    setAlert({
      type: 'success',
      message: 'انت بالفعل أنهيت الاختبار القبلي بنجاح!'
    });
  };

  const showDangerAlert = () => {
    setAlert({
      type: 'danger',
      message: 'حدث خطأ! يرجى التحقق من البيانات وإعادة المحاولة.'
    });
  };
   const closeAlert = () => {
    setAlert(null);
  };
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
    else if (categoryId === 'final') {
      navigate('/exams/final');
    }
    else if (categoryId === 'start') {
      if(firstExamData[0] == 1) {
        console.log(firstExamData);
        
         start(); // Show success alert if the first exam is completed
      } else {
      navigate('/exams/start');
      }
    }
    else {
      setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
    }
  };

  const onCategorySelect = (categoryId) => {
    handleCategoryClick(categoryId);
  };

  const onSetSelectedCategory = (category) => {
    setSelectedCategory(category);
  };

  return (
    <>
    <Nav 
        title={selectedCategory ? categories.find(cat => cat.id === selectedCategory)?.title || "اختبارات المرحلة" : "اختبارات المرحلة"} 
        selectedCategory={selectedCategory}
        setSelectedCategory={onSetSelectedCategory}
      />
      <div className="exam-cards-container loaded">
        <div className="exam-cards-section">
          {!selectedCategory ? (
            <div className="exam-cards-grid">
              {categories.map((category, index) => {
                const stats = categoryStats[category.id] || { completedCount: 0, totalExams: 0 };
                const isFullyCompleted = stats.completedCount === stats.totalExams;
                
                let cardClass = "exam-card";
                if (category.id === "start") {
                  cardClass += " before-card";
                } else if (category.id === "final") {
                  cardClass += " after-card";
                }
                if (isFullyCompleted) {
                  cardClass += " fully-completed";
                }

                return (
                  <div
                    key={category.id}
                    className={cardClass}
                    onClick={() => onCategorySelect(category.id)}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="card-number">{index + 1}</div>
                    <div className="exam-card-content">
                      <div>
                        <h2 className="exam-card-title">{category.title}</h2>
                        <p className="exam-card-description">{category.description}</p>
                        <div className="exam-completion-status">
                          <FontAwesomeIcon 
                            icon={isFullyCompleted ? faCheckCircle : faCircle}
                            className={`exam-completion-indicator ${isFullyCompleted ? 'completed' : ''}`}
                          />
                          <span>{stats.completedCount}/{stats.totalExams} مكتمل</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="selected-category-content">
              <h2>تفاصيل الفئة: {categories.find(cat => cat.id === selectedCategory)?.title}</h2>
            </div>
          )}
        </div>
      </div>
      {alert && (
        <MyAlert 
          type={alert.type} 
          message={alert.message} 
          onClose={closeAlert}
        />
      )}
    </>
  );
};

export default ExamCards;
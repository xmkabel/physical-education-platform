import React, { useState, useEffect, Component } from 'react';
import { Container, Card, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft, faCheck, faBookOpen } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import styles from './Quiz.module.css';

// Error Boundary Component
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary p-4 text-center">
          <h2 style={{ color: 'var(--pink)' }}>حدث خطأ ما</h2>
          <p>يرجى تحديث الصفحة أو العودة للصفحة الرئيسية</p>
          <Button 
            className="btn-navy-blue mt-3"
            style={{ backgroundColor: 'var(--navy-blue)', borderColor: 'var(--navy-blue)', color: 'var(--white)' }}
            onClick={() => window.location.href = '/react-physical-education/'}
          >
            العودة للصفحة الرئيسية
          </Button>
        </div>
      );
    }
    return this.props.children;
  }
}

function Quiz({ quizData,name }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);
  const [validationError, setValidationError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [animationClass, setAnimationClass] = useState('animate__fadeIn');
  
  // Use quiz data from props
  const [quizContent, setQuizContent] = useState([]);

  // Initialize quiz content from props
  useEffect(() => {
    if (quizData) {
      // Check if quizData is an array or has a quizContent property
      if (Array.isArray(quizData)) {
        setQuizContent(quizData);
      } else if (quizData.quizContent && Array.isArray(quizData.quizContent)) {
        setQuizContent(quizData.quizContent);
      } else {
        console.error('Quiz data is missing or invalid');
        setQuizContent([]);
      }
    } else {
      console.error('Quiz data is missing');
      setQuizContent([]);
    }
  }, [quizData]);


  const handleAnswerSelect = (questionId, selectedOption) => {
    setAnswers({
      ...answers,
      [questionId]: selectedOption
    });
  };

  const handleNext = () => {
    if (currentStep < quizContent.length - 1) {
      setAnimationClass('animate__fadeOut');
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setAnimationClass('animate__fadeIn');
      }, 300);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setAnimationClass('animate__fadeOut');
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        setAnimationClass('animate__fadeIn');
      }, 300);
    }
  };

  const handleSubmit = () => {
    // Check if all questions have been answered
    const unansweredQuestions = [];
    
    quizContent.forEach(item => {
      if (item.type === 'question' && answers[item.id] === undefined) {
        unansweredQuestions.push(item.id);
      }
    });
    
    if (unansweredQuestions.length > 0) {
      setValidationError(true);
      setErrorMessage(`يرجى الإجابة على جميع الأسئلة قبل إنهاء الاختبار`);
      
      // Find the first unanswered question and navigate to it
      const firstUnansweredQuestionIndex = quizContent.findIndex(
        item => item.type === 'question' && item.id === unansweredQuestions[0]
      );
      
      if (firstUnansweredQuestionIndex !== -1) {
        setCurrentStep(firstUnansweredQuestionIndex);
      }
      
      return;
    }
    
    // If all questions are answered, proceed with submission
    setValidationError(false);
    setErrorMessage('');
    setIsSubmitted(true);
    setShowCorrectAnswers(true);
  };

  const calculateScore = () => {
    let score = 0;
    let totalQuestions = 0;
    
    quizContent.forEach(item => {
      if (item.type === 'question') {
        totalQuestions++;
        if (answers[item.id] === item.correctAnswer) {
          score++;
        }
      }
    });
    
    return { score, totalQuestions };
  };

  return (
    <>
    <div className="quiz-container position-relative min-vh-100 d-flex flex-column align-items-center justify-content-center py-5" style={{ textAlign: 'right', backgroundColor: 'var(--white)' }}>
    <h1 className="display-5 u-title mt-1  mb-4 animate__animated animate__fadeIn text-center" style={{ color: 'var(--navy-blue)' }}>
      محتوى الاختبارات المعرفية للكتاب التفاعلي
    </h1>
    <Container className="py-4 animate__animated animate__slideInUp d-flex align-items-center justify-content-center">
      <Card className="shadow-lg border-0 rounded-lg overflow-hidden" style={{ maxWidth: '800px', width: '100%' }}>
        <div className="p-3 text-center" style={{ backgroundColor: 'var(--navy-blue)', color: 'var(--white)' }}>
          <h2 className="mb-0 fs-4 fw-bold">
                    {name}
                    </h2>
        </div>
        <Card.Body className="p-4 p-md-5" style={{ textAlign: 'right' }}>
          <div className="progress mb-4 position-relative" style={{ height: '12px', backgroundColor: 'var(--white)', border: '1px solid var(--navy-blue)', borderRadius: '10px', overflow: 'hidden' }}>
            <div 
              className="progress-bar animate__animated animate__slideInLeft" 
              role="progressbar" 
              style={{
                width: `${(Object.keys(answers).length / quizContent.filter(item => item.type === 'question').length) * 100}%`,
                background: 'linear-gradient(45deg, var(--navy-blue), var(--gold))',
                transition: 'width 0.5s ease-in-out',
                borderRadius: '8px'
              }}
              aria-valuenow={(Object.keys(answers).length / quizContent.filter(item => item.type === 'question').length) * 100}
              aria-valuemin="0" 
              aria-valuemax="100">
            </div>
            <small className="position-absolute w-100 text-center" style={{ lineHeight: '12px', color: 'var(--navy-blue)', fontWeight: 'bold', mixBlendMode: 'difference', color: 'white' }}>
              {Math.round((Object.keys(answers).length / quizContent.filter(item => item.type === 'question').length) * 100)}%
            </small>
          </div>


          
          {!isSubmitted ? (
            <>
              <div className={`animate__animated ${animationClass}`}>
                {quizContent && quizContent.length > 0 && currentStep < quizContent.length && quizContent[currentStep] && quizContent[currentStep].type === 'reading' ? (
                  <div className="reading-container mb-4">
                    <div className="d-flex align-items-center mb-3 bg-light p-2 rounded-top" style={{borderBottom: 'solid 1px var(--gold)'}}>
                      <FontAwesomeIcon icon={faBookOpen} className="me-2 ms-2" size="lg" style={{ color: 'var(--navy-blue)'}} />
                      <h4 className="mb-0 fs-5 fw-bold">قراءة {currentStep + 1}: {quizContent[currentStep].title}</h4>
                    </div>
                    <Card className="bg-light border-0 shadow-sm rounded-bottom">
                      <Card.Body className="p-4" style={{ textAlign: 'right' }}>
                        <pre className="reading-text fs-6" style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', margin: 0, textAlign: 'right', direction: 'rtl', lineHeight: '1.8' }}>{quizContent[currentStep].content}</pre>
                      </Card.Body>
                    </Card>
                  </div>
                ) : quizContent && quizContent.length > 0 && currentStep < quizContent.length && quizContent[currentStep] ? (
                  <div className="question-container mb-4" style={{ textAlign: 'right' }}>
                    <div className="p-3 rounded mb-3" style={{ backgroundColor: 'var(--light-bg)', borderLeft: '4px solid var(--navy-blue)' }}>
                      <h4 className="mb-0 fs-5 fw-bold">سؤال {quizContent.filter(item => item.type === 'question').findIndex(q => q.id === quizContent[currentStep].id) + 1}: {quizContent[currentStep].question}</h4>
                    </div>
                    <div className="d-grid gap-2">
                      {quizContent[currentStep].options.map((option, index) => (
                        <Button
                          key={index}
                          variant={answers[quizContent[currentStep].id] === index ? 'light' : 'outline-light '}
                          className="text-end py-3 px-4 "
                          style={answers[quizContent[currentStep].id] === index ? 
                            { backgroundColor: 'var(--navy-blue)', borderColor: 'var(--navy-blue)',color:'white' } : 
                            { borderColor: 'var(--navy-blue)', color: 'var(--navy-blue)' }}
                          onClick={() => handleAnswerSelect(quizContent[currentStep].id, index)}
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="alert alert-danger" role="alert">
                    بيانات الاختبار غير متوفرة أو غير صحيحة
                  </div>
                )}
              </div>
              {validationError && (
                <div className="alert mb-3" role="alert" style={{ textAlign: 'right', backgroundColor: 'var(--light-pink)', color: 'var(--pink)', border: '1px solid var(--pink)' }}>
                  {errorMessage}
                </div>
              )}
              
              <div className="question-navigation mb-4 d-flex flex-wrap gap-2 justify-content-center">
                {quizContent.map((item, index) => {
                  // Calculate question number for display
                  let displayNumber;
                  if (item.type === 'reading') {
                    displayNumber = 'R';
                  } else {
                    // For questions, find the position among only question items
                    displayNumber = quizContent.filter(q => q.type === 'question' && quizContent.indexOf(q) <= index).length;
                  }
                  
                  return (
                    <Button
                      key={index}
                      size="sm"
                      variant={currentStep === index ? 'primary' : answers[item.id] !== undefined ? 'success' : 'outline-secondary'}
                      onClick={() => {
                        setAnimationClass('animate__fadeOut');
                        setTimeout(() => {
                          setCurrentStep(index);
                          setAnimationClass('animate__fadeIn');
                        }, 300);
                      }}
                      style={{
                        minWidth: '45px',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        backgroundColor: currentStep === index ? 'var(--navy-blue)' : answers[item.id] !== undefined ? 'var(--gold)' : 'white',
                        borderColor: 'var(--navy-blue)',
                        color: currentStep === index || answers[item.id] !== undefined ? 'white' : 'var(--navy-blue)',
                        transition: 'all 0.3s ease',
                        transform: currentStep === index ? 'scale(1.1)' : 'scale(1)'
                      }}
                    >
                      {displayNumber}
                    </Button>
                  );
                })}
              </div>
              
              <div className="d-flex flex-column flex-sm-row justify-content-between gap-3 gap-sm-0 mt-4">
                <Button 
                  className="btn-navy-blue"
                  style={{   color: 'var(--white)' }}
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                >
                  <FontAwesomeIcon icon={faArrowRight} /> السابق
                </Button>
                
                {currentStep < quizContent.length - 1 ? (
                  <Button 
                    className="btn-navy-blue"
                    // style={{ backgroundColor: 'var(--navy-blue)', borderColor: 'var(--navy-blue)', color: 'var(--white)' }}
                    onClick={handleNext}
                  >
                    التالي <FontAwesomeIcon icon={faArrowLeft} />
                  </Button>
                ) : quizContent && quizContent.length > 0 && currentStep < quizContent.length && quizContent[currentStep] ? (
                  <Button 
                    className="btn-navy-blue"
                    // style={{ backgroundColor: 'var(--navy-blue)', borderColor: 'var(--navy-blue)', color: 'var(--white)' }}
                    onClick={handleSubmit}
                  >
                    إنهاء الإختبار <FontAwesomeIcon icon={faCheck} />
                  </Button>
                ) : (
                  <div className="alert alert-danger" role="alert">
                    بيانات الاختبار غير متوفرة أو غير صحيحة
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="result-container text-center">
              <h3 className="mb-4" style={{ color: 'var(--navy-blue)' }}>نتيجة الإختبار</h3>
              <p className="lead">
                لقد حصلت على {calculateScore().score} من أصل {calculateScore().totalQuestions} نقطة
              </p>
              
              {showCorrectAnswers && (
                <div className="correct-answers mt-4">
                  <h4 className="mb-3" style={{ color: 'var(--navy-blue)' }}>الإجابات الصحيحة</h4>
                  {quizContent.filter(item => item.type === 'question').map((question) => {
                    const isCorrect = answers[question.id] === question.correctAnswer;
                    return (
                      <Card key={question.id} className="mb-3" style={{ border: isCorrect ? '2px solid var(--navy-blue)' : '2px solid var(--pink)' }}>
                        <Card.Body>
                          <h5>{question.question}</h5>
                          <p>
                            <strong>إجابتك: </strong> 
                            {answers[question.id] !== undefined ? question.options[answers[question.id]] : 'لم تجب'}
                          </p>
                          <p style={{ color: 'var(--navy-blue)', fontWeight: 'bold' }}>
                            <strong>الإجابة الصحيحة: </strong> 
                            {question.options[question.correctAnswer]}
                          </p>
                          {question.id === 1 && (
                            <p className="explanation" style={{ color: 'var(--grey)' }}>
                              <strong>التوضيح: </strong>كما ورد في النص، تقع نظرية سكنر في مجموعتين هما عملية التعلم ونواتج (عواقب) التعلم.
                            </p>
                          )}
                          {question.id === 2 && (
                            <p className="explanation" style={{ color: 'var(--grey)' }}>
                              <strong>التوضيح: </strong>الإجابة الصحيحة هي "د- أ، ب معا" حيث ترتبط النواتج بالسلوك بطريق التعزيز الموجب والتعزيز السابق، والعقاب واستبعاد العقاب.
                            </p>
                          )}
                          {question.id === 3 && (
                            <p className="explanation" style={{ color: 'var(--grey)' }}>
                              <strong>التوضيح: </strong>كما ورد في النص، تصنف نظريات التدريس إلى النظرية السلوكية والمعرفية والبنائية.
                            </p>
                          )}
                          {question.id === 4 && (
                            <p className="explanation" style={{ color: 'var(--grey)' }}>
                              <strong>التوضيح: </strong>كما ورد في النص، يتكون نموذج ويتلي للتعلم البنائي من ثلاثة مكونات وهي: مهام التعلم، المجموعات المتعاونة، المشاركة.
                            </p>
                          )}
                          {question.id === 5 && (
                            <p className="explanation" style={{ color: 'var(--grey)' }}>
                              <strong>التوضيح: </strong>كما ورد في النص، تسير عملية التدريس بنموذج دورة التعلم وفقا لثلاث مراحل أساسية هي: مرحلة الاستكشاف، مرحلة الإبداع المفاهيمة، مرحلة الاتساع المفاهيمة.
                            </p>
                          )}
                          {question.id === 6 && (
                            <p className="explanation" style={{ color: 'var(--grey)' }}>
                              <strong>التوضيح: </strong>كما ورد في النص، يعتمد بناء التراكيب النظرية للنموذج المنظومي على ثلاث مصادر ، هي: نظرية بياجيه، علم النفس المعرفي، وكيفية تنظيم المعلومات داخل المخ البشري.
                            </p>
                          )}
                          {question.id === 11 && (
                            <p className="explanation" style={{ color: 'var(--grey)' }}>
                              <strong>التوضيح: </strong>كما ورد في النص، تشمل مفاهيمات النظرية السلوكية الإجرائية: السلوك والتعلم، المثير والاستجابة، والتعزيز والعقاب.
                            </p>
                          )}
                          {question.id === 12 && (
                            <p className="explanation" style={{ color: 'var(--grey)' }}>
                              <strong>التوضيح: </strong>كما ورد في النص، تشمل محددات المضمون المعرفي: محدد الإثارة، محدد التناسب والتكيف، ومحدد التعزيز الفوري.
                            </p>
                          )}
                        </Card.Body>
                      </Card>
                    );
                  })}
                </div>
              )}
              
              <Button 
                className="btn-navy-blue mt-3"
                style={{ backgroundColor: 'var(--navy-blue)', borderColor: 'var(--navy-blue)', color: 'var(--white)' }}
                onClick={() => window.location.href = '/react-physical-education/'}
              >
                العودة للصفحة الرئيسية
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  </div>
  </>
  );
}

// Wrap the Quiz component with ErrorBoundary
const QuizWithErrorBoundary = (props) => (
  <ErrorBoundary>
    <Quiz {...props} />
  </ErrorBoundary>
);

export default QuizWithErrorBoundary;
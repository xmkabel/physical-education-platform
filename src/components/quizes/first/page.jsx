import React, { useState } from 'react';
import { Container, Card, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft, faCheck, faBookOpen } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';

function FirstQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);
  
  // Quiz content with reading passages and questions
  const quizContent = [

    {
      type: 'reading',
      id: 'reading1',
      title: 'النص الأول للقراءة',
      content:
      'اهم نظرية تعلم سلوكية هي نظرية سكنر وتقع في مجموعتين:\n- عملية التعلم\nاهم تطبيق تربوي لعمليات التعلم السلوكية هو تحليل التعلم ، وحين يقوم المدرس بتحليل العلم فانه يجزئ مهمه التعلم او العمل التعليمي الى اجزائه او مكوناته والى الخطوات المتطلبة لكي تضع تنظيما هرميا للتعلم وحين يتحقق هذا فأنت تعرف بالضبط التتابع التعليمي لمهمه معينه.\n \n- نواتج (عواقب) التعلم .\nواهم تطبيق للنتائج السلوكية هو التحليل السلوكي وحين تقوم بتحليل سلوكي فانك تفحص سلوكا معينا لتحدد ما حدث قبله (السابق ) وما جدث بعده (اللحق او المترتب او النتيجة .'
    },
    {
      type: 'question',
      id: 1,
      question: 'تقع نظرية سكنر في مجموعتين :',
      options: ['أ- تعديل وإدارة السلوك .', 'ب- عملية التعلم', 'ج- نواتج (عواقب) التعلم .', 'د- ب،ج معا .'],
      correctAnswer: 3,
      relatedReading: 'reading1'
    },
    {
      type: 'question',
      id: 2,
      question: 'ترتبط النواتج بالسلوك بطريق من طرق اربعه :',
      options: ['أ-تعزيزموجب ، تعزيزسابق', 'ب- عقاب واستبعاد عقاب', 'ج- تعزيز سالب', 'د- أ، ب معا'],
      correctAnswer: 3,
      relatedReading: 'reading1'
    },

    {
      type: 'reading',
      id: 'reading2',
      title: 'تصنيف نظريات التدريس',
      content: 
      'تصنيف نظريات التدريس :\nالنظريات السلوكية : تشمل النظريات التي اهتمت بدراسة السلوك الظاهري للمتعلم .\n\nالنظرية المعرفية : وتضم تلك النظريات التي اهتمت بدراسة العمليات العقلية التي تحدث داخل عقل المتعلم .\n\nالنظرية البنائية : يعد المنحى البنائي احدث اتجاه في التدريس والذي يركز على العوامل الداخلية التي تؤثر على التعلم .اي ينصب التركيز على ما يجري بداخل عقل المتعلم حينما يتعرض للمواقف التعليمية .'



    },
    {
      type: 'question',
      id: 3,
      question: 'تصنيف نظريات التدريس:',
      options: ['أ- نظريات التعليم والتعلم.', 'ب- النظرية السلوكية, المعرفية, البنائية.', 'ج- النظرية الافتراضية والمعرفية.', 'د- نظريات تكامل القياسات, البناء المعرفي.'],
      correctAnswer: 1,
      relatedReading: 'reading2'
    },
    // Add more reading passages and questions as needed
  ];

  const handleAnswerSelect = (questionId, selectedOption) => {
    setAnswers({
      ...answers,
      [questionId]: selectedOption
    });
  };

  const handleNext = () => {
    if (currentStep < quizContent.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setShowCorrectAnswers(true);
    // Here you can add logic to calculate score, save results, etc.
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
    <Container className="py-4 animate__animated animate__fadeIn d-flex align-items-center justify-content-center min-vh-100 ">
            <div className="text-center mb-3 mb-sm-5 position-absolute top-0 w-100 px-3">
        <h1 className="display-6 display-sm-5 u-title m-3" >
          محتوى الاختبارات المعرفية للكتاب التفاعلي
        </h1>
      </div>
      <Card className="shadow-lg border-0 mb-3 mb-sm-5 mx-2" style={{ maxWidth: '800px', width: '100%' }}>
        <Card.Body className="p-3 p-sm-4 p-md-5">
          <h2 className="text-center mb-3 mb-sm-4 u-title fs-3 fs-sm-2" style={{ color: 'var(--navy-blue)' }}>
          الباب الأول / نظريات التعلم ونظريات التدريس
          </h2>
          
          {!isSubmitted ? (
            <>
              {quizContent[currentStep].type === 'reading' ? (
                <div className="reading-container mb-4">
                  <div className="d-flex align-items-center mb-3">
                    <FontAwesomeIcon icon={faBookOpen} className="me-2" />
                    <h4 className="mb-0 fs-5 fs-sm-4">{quizContent[currentStep].title}</h4>
                  </div>
                  <Card className="bg-light">
                    <Card.Body>
                      <pre className="reading-text" style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', margin: 0 }}>{quizContent[currentStep].content}</pre>
                    </Card.Body>
                  </Card>
                </div>
              ) : (
                <div className="question-container mb-4">
                  <h4 className="mb-3 fs-5 fs-sm-4">{quizContent[currentStep].question}</h4>
                  <Form>
                    {quizContent[currentStep].options.map((option, index) => (
                      <Form.Check
                        key={index}
                        type="radio"
                        id={`q${quizContent[currentStep].id}-option${index}`}
                        label={option}
                        name={`question-${quizContent[currentStep].id}`}
                        checked={answers[quizContent[currentStep].id] === index}
                        onChange={() => handleAnswerSelect(quizContent[currentStep].id, index)}
                        className="mb-2"
                      />
                    ))}
                  </Form>
                </div>
              )}

              <div className="d-flex flex-column flex-sm-row justify-content-between gap-3 gap-sm-0 mt-4">
                <Button 
                  className="btn-navy-blue"
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                >
                  <FontAwesomeIcon icon={faArrowRight} /> السابق
                </Button>
                
                {currentStep < quizContent.length - 1 ? (
                  <Button 
                    className="btn-navy-blue"
                    onClick={handleNext}
                  >
                    التالي <FontAwesomeIcon icon={faArrowLeft} />
                  </Button>
                ) : (
                  <Button 
                    className="btn-navy-blue"
                    onClick={handleSubmit}
                  >
                    إنهاء الإختبار <FontAwesomeIcon icon={faCheck} />
                  </Button>
                )}
              </div>
            </>
          ) : (
            <div className="result-container text-center">
              <h3 className="mb-4">نتيجة الإختبار</h3>
              <p className="lead">
                لقد حصلت على {calculateScore().score} من أصل {calculateScore().totalQuestions} نقطة
              </p>
              
              {showCorrectAnswers && (
                <div className="correct-answers mt-4">
                  <h4 className="mb-3">الإجابات الصحيحة</h4>
                  {quizContent.filter(item => item.type === 'question').map((question) => {
                    const isCorrect = answers[question.id] === question.correctAnswer;
                    return (
                      <Card key={question.id} className={`mb-3 ${isCorrect ? 'border-success' : 'border-danger'}`}>
                        <Card.Body>
                          <h5>{question.question}</h5>
                          <p>
                            <strong>إجابتك: </strong> 
                            {answers[question.id] !== undefined ? question.options[answers[question.id]] : 'لم تجب'}
                          </p>
                          <p style={{ color: 'var(--navy-blue)' }}>
                            <strong>الإجابة الصحيحة: </strong> 
                            {question.options[question.correctAnswer]}
                          </p>
                          {question.id === 1 && (
                            <p className="explanation text-muted">
                              <strong>التوضيح: </strong>كما ورد في النص، تقع نظرية سكنر في مجموعتين هما عملية التعلم ونواتج (عواقب) التعلم.
                            </p>
                          )}
                          {question.id === 2 && (
                            <p className="explanation text-muted">
                              <strong>التوضيح: </strong>الإجابة الصحيحة هي "د- أ، ب معا" حيث ترتبط النواتج بالسلوك بطريق التعزيز الموجب والتعزيز السابق، والعقاب واستبعاد العقاب.
                            </p>
                          )}
                          {question.id === 3 && (
                            <p className="explanation text-muted">
                              <strong>التوضيح: </strong>كما ورد في النص، تصنف نظريات التدريس إلى النظرية السلوكية والمعرفية والبنائية.
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
                onClick={() => window.location.href = '/'}
              >
                العودة للصفحة الرئيسية
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default FirstQuiz;
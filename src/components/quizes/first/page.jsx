import React, { useState, useEffect } from 'react';
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
  const [validationError, setValidationError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [animationClass, setAnimationClass] = useState('animate__fadeIn');
  
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
      options: ['أ‌- تعديل وإدارة السلوك .', 'ب- عملية التعلم', 'ج- نواتج (عواقب) التعلم .', 'د-  ب،ج معا'],
      correctAnswer: 3,
      relatedReading: 'reading1'
    },
    {
      type: 'question',
      id: 2,
      question: 'ترتبط النواتج بالسلوك بطريق من طرق اربعه :',
      options: ['أ-تعزيز موجب ، تعزيز سابق', 'ب- عقاب واستبعاد عقاب', 'ج- تعزيز سالب', 'د- أ،ب معا'],
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
      options: ['أ‌- نظريات التعليم والتعلم .', 'ب- النظرية السلوكية, المعرفية, البنائية.', 'ج- النظرية الافتراضية والمعرفية .', 'د- نظريات تكامل القياسات , البناء المعرفي.'],
      correctAnswer: 1,
      relatedReading: 'reading2'
    },
    {
      type: 'question',
      id: 4,
      question: 'الأسس التي تقوم عليها النظرية البنائية:',
      options: ['أ-تجعل المتعلمين كمبدعين', 'ب- تؤكد على حب الاستطلاع', 'ج-تؤكد على الاداء والفهم عند تقييم التعلم', 'د- جميع ما سبق'],
      correctAnswer: 3,
      relatedReading: 'reading3'
    },
    {
      type: 'question',
      id: 5,
      question: 'المفاهيم المتصلة بنظرية التعلم البنائية:',
      options: ['أ-مفهوم التكيف', 'ب- مفهوم الاستيعاب والتلائم', 'ج-مفهوم التنظيم', 'د- جميع ما سبق'],
      correctAnswer: 3,
      relatedReading: 'reading3'
    },
    {
      type: 'question',
      id: 6,
      question: 'استراتيجيات التدريس القائمة على الفكر البنائي:',
      options: ['أ- نموذج ويتلي للتعلم البنائي', 'ب- نموذج دورة التعلم', 'ج-جميع ما سبق', 'د- النموذج المنظومي'],
      correctAnswer: 2,
      relatedReading: 'reading3'
    },
    {
      type: 'question',
      id: 7,
      question: 'عوامل النضج المعرفي في نظرية بياجية:',
      options: ['أ- النضج البيولوجي', 'ب- التوازن', 'ج-الخبرات الاجتماعية', 'د- جميع ما سبق'],
      correctAnswer: 3,
      relatedReading: 'reading4'
    },
    {
      type: 'question',
      id: 8,
      question: 'خصائص الطفل المعرفية:',
      options: ['أ-التمركز حول الذات', 'ب- الخبرات الطبيعية للأشياء', 'ج- أ، ب معا', 'د- جميع ما سبق'],
      correctAnswer: 2,
      relatedReading: 'reading4'
    },
    {
      type: 'question',
      id: 9,
      question: 'المراحل العامة للنمو المعرفي عند بياجية:',
      options: ['أ-المرحلة الحسية الحركية', 'ب- مرحلة ما قبل العمليات ، مرحلة العمليات المحسوسة', 'ج- أ، ب، د معا', 'د- مرحلة العمليات الشكلية المجردة'],
      correctAnswer: 2,
      relatedReading: 'reading4'
    },
    {
      type: 'question',
      id: 10,
      question: 'المحاور الرئيسية لاختبارات بياجيه:',
      options: ['أ-اختبارات العلاقات المنطقية', 'ب- اختبارات التصنيف والتسلسل ، العدد', 'ج- اختبارات المكان والزمان والمصادفة', 'د- جميع ما سبق'],
      correctAnswer: 3,
      relatedReading: 'reading4'
    },
    {
      type: 'question',
      id: 11,
      question: 'مفاهيم النظرية السلوكية الإجرائية:',
      options: ['أ-السلوك والتعلم', 'ب- المثير والاستجابة', 'ج- التعزيز والعقاب', 'د- أ، ب، ج معا'],
      correctAnswer: 3,
      relatedReading: 'reading5'
    },
    {
      type: 'question',
      id: 12,
      question: 'من محددات المضمون المعرفي:',
      options: ['أ-محدد الإثارة', 'ب- محدد التناسب والتكيف', 'ج- محدد التعزيز الفوري', 'د- جميع ما سبق'],
      correctAnswer: 3,
      relatedReading: 'reading5'
    },
    {
      type: 'question',
      id: 13,
      question: 'من مفاهيم نظرية التعلم الجشطلتية:',
      options: ['أ-الجشطلت ، البنيه', 'ب-الاستبصار ،الدافعية الاصلية،الفهم والمعنى', 'ج-التنظيم ،إعادة التنظيم ،الانتقال', 'د- أ، ب، ج معا'],
      correctAnswer: 3,
      relatedReading: 'reading6'
    },
    {
      type: 'question',
      id: 14,
      question: 'من مبادئ التعلم في النظرية الجشطلتية:',
      options: ['أ- الاستبصار شرط للتعلم الحقيقي', 'ب- التعلم يقترن بالنتائج', 'ج- الاستبصار تفاعل إيجابي مع موضوع التعلم', 'د- جميع ما سبق'],
      correctAnswer: 3,
      relatedReading: 'reading6'
    },
    {
      type: 'question',
      id: 15,
      question: 'من تعريفات التصميد التربوي:',
      options: ['أ- هندسة العملية التعليمية للتطوير المنهجي', 'ب- فن تطبيقي لعلمي التدريس والتعلم ونظرياتهما', 'ج- خطوات منظمه متتابعة لتخطيط النشاطات والمواد التدريسية', 'د- جميع ما سبق'],
      correctAnswer: 3,
      relatedReading: 'reading7'
    },
    {
      type: 'question',
      id: 16,
      question: 'ينبثق تصميج التدريس من عدد من النظريات منها:',
      options: ['أ- نظرية النظم العامة', 'ب- نظريات التعلم (السلوكية, العقلية البنائية)', 'ج- نظريات الاتصال, التعلم, التدريس', 'د- جميع ما سبق'],
      correctAnswer: 3,
      relatedReading: 'reading7'
    },
    {
      type: 'question',
      id: 17,
      question: 'من أهمية التصميج التعليمي:',
      options: ['أ- تحسين الممارسات التربوية', 'ب- توفير الوقت والجهد', 'ج- تفاعل المتعلم مع المادة الدراسية', 'د- جميع ما سبق'],
      correctAnswer: 3,
      relatedReading: 'reading7'
    },
    {
      type: 'question',
      id: 18,
      question: 'خطوات التصميج التعليمي:',
      options: ['أ- تحديد الهدف التعليمي', 'ب- تحليل المهمه التعليمية, تحليل السلوك للمتعلم', 'ج- كتابة الأهداف السلوكية, تطوير الاختبارات المحكية, تطوير استراتيجية التعلم', 'د- جميع ما سبق'],
      correctAnswer: 3,
      relatedReading: 'reading7'
    },
    {
      type: 'question',
      id: 19,
      question: 'المشاركون في عملية التصميج:',
      options: ['أ- المصمم التدريسي, المدرس', 'ب- اختصاصي الموضوع', 'ج- المقوم', 'د- جميع ما سبق'],
      correctAnswer: 3,
      relatedReading: 'reading7'
    },
    {
      type: 'question',
      id: 20,
      question: 'من افتراضات نجاح تصميم التعليم:',
      options: ['أ- فعالا', 'ب- كافيا', 'ج- جذابا', 'د- جميع ما سبق'],
      correctAnswer: 3,
      relatedReading: 'reading8'
    },
    {
      type: 'question',
      id: 21,
      question: 'ابعاد تقنية التعليم:',
      options: ['أ- ب،ج معا', 'ب- المحتوى التعليمي', 'ج- الأداء التعليمي', 'د- الوسائل والمعدات'],
      correctAnswer: 0,
      relatedReading: 'reading8'
    },
    {
      type: 'question',
      id: 22,
      question: 'معادلة نجاح تقنية التعليم:',
      options: ['أ- وسيلة تعلم وتعليم مناسبه', 'ب- محتوى مناسب كما ونوعا', 'ج- أداء تعليمي فعال للمعلم والمتعلم', 'د- أ، ب، ج معا'],
      correctAnswer: 3,
      relatedReading: 'reading8'
    },
    {
      type: 'question',
      id: 23,
      question: 'مراحل تصميم التعلم:',
      options: ['أ- مرحلة التحليل', 'ب- مرحلة وضع الاستراتيجيات', 'ج- مرحلة التقويم', 'د- أ، ب، ج معا'],
      correctAnswer: 3,
      relatedReading: 'reading8'
    },
    {
      type: 'question',
      id: 24,
      question: 'نماذج تصميم التعليم :',
      options: ['أ-نموذج جانية وبرجز', 'ب-نموذج ديك وكاري', 'ج-المنحى المنظومي', 'د- جميع ما سبق'],
      correctAnswer: 3,
      relatedReading: 'reading8'
    }
  ];

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
    <div className="text-center mb-3 mb-sm-5 position-absolute top-0 w-100 px-3" style={{ textAlign: 'right' }}>
    <h1 className="display-6 display-sm-5 u-title mt-5 animate__animated animate__fadeIn" >
    الباب الأول 
    </h1>
    <Container className="py-4 animate__animated animate__slideInUp d-flex align-items-center justify-content-center min-vh-100 ">
      <Card className="shadow-lg border-0 mb-3 mb-sm-5 mx-2" style={{ maxWidth: '800px', width: '100%' }}>
        <Card.Body className="p-3 p-sm-4 p-md-5" style={{ textAlign: 'right' }}>
          <h2 className="text-center mb-3 mb-sm-4 u-title fs-3 fs-sm-2" style={{ color: 'var(--navy-blue)' }}>

          نظريات التعلم ونظريات التدريس          </h2>
          
          {!isSubmitted ? (
            <>
              <div className={`animate__animated ${animationClass}`}>
                {quizContent[currentStep].type === 'reading' ? (
                  <div className="reading-container mb-4">
                    <div className="d-flex align-items-center mb-3">
                      <FontAwesomeIcon icon={faBookOpen} className="me-2" />
                      <h4 className="mb-0 fs-5 fs-sm-4">{quizContent[currentStep].title}</h4>
                    </div>
                    <Card className="bg-light">
                      <Card.Body style={{ textAlign: 'right' }}>
                        <pre className="reading-text" style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', margin: 0, textAlign: 'right', direction: 'rtl' }}>{quizContent[currentStep].content}</pre>
                      </Card.Body>
                    </Card>
                  </div>
                ) : (
                  <div className="question-container mb-4" style={{ textAlign: 'right' }}>
                    <h4 className="mb-3 fs-5 fs-sm-4">{quizContent[currentStep].question}</h4>
                    <Form style={{ textAlign: 'right' }}>
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
              </div>
              {validationError && (
                <div className="alert alert-danger mb-3" role="alert" style={{ textAlign: 'right' }}>
                  {errorMessage}
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
                          {question.id === 4 && (
                            <p className="explanation text-muted">
                              <strong>التوضيح: </strong>كما ورد في النص، يتكون نموذج ويتلي للتعلم البنائي من ثلاثة مكونات وهي: مهام التعلم، المجموعات المتعاونة، المشاركة.
                            </p>
                          )}
                          {question.id === 5 && (
                            <p className="explanation text-muted">
                              <strong>التوضيح: </strong>كما ورد في النص، تسير عملية التدريس بنموذج دورة التعلم وفقا لثلاث مراحل أساسية هي: مرحلة الاستكشاف، مرحلة الإبداع المفاهيمي، مرحلة الاتساع المفاهيمي.
                            </p>
                          )}
                          {question.id === 6 && (
                            <p className="explanation text-muted">
                              <strong>التوضيح: </strong>كما ورد في النص، يعتمد بناء التراكيب النظرية للنموذج المنظومي على ثلاث مصادر ، هي: نظرية بياجيه، علم النفس المعرفي، وكيفية تنظيم المعلومات داخل المخ البشري.
                            </p>
                          )}
                          {question.id === 11 && (
                            <p className="explanation text-muted">
                              <strong>التوضيح: </strong>كما ورد في النص، تشمل مفاهيم النظرية السلوكية الإجرائية: السلوك والتعلم، المثير والاستجابة، والتعزيز والعقاب.
                            </p>
                          )}
                          {question.id === 12 && (
                            <p className="explanation text-muted">
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
                onClick={() => window.location.href = '/'}
              >
                العودة للصفحة الرئيسية
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  </div>
    
  );
}

export default FirstQuiz;
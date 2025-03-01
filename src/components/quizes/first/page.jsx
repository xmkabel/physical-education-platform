import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft, faCheck, faBookOpen } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import styles from '../Quiz.module.css';

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
      type: 'reading',
      id: 'reading3',
      title: 'استراتيجيات التدريس القائمة على الفكر البنائي',
      content: 
      'استراتيجيات التدريس القائمة على الفكر البنائي :\n\nأولا : نموذج ويتلي للتعلم البنائي :\nهو نموذج للتعلم المتمركز حول مشكلة في مجال التدريس . ويؤكد هذا النموذج على وجود المتعلم في موقف مشكل وذات معنى ، والتي يمكن ان تستخدم كنقطة انطلاق للاستقصاء والاكتشاف .\nويهدف التدريس بهذا النموذج الى مساعدة التلاميذ على تنمية التفكير وحل المشكلات ويشجعهم على التعاون والمناقشة .\nمكوناته : يتكون من ثلاثة مكونات وهي : مهام التعلم، المجموعات المتعاونة ، المشاركة .\n\nثانيا : نموذج دورة التعلم :\nتمتاز دورة التعلم عن غيرها من الطرق في انها تراعي قدرات المتعلم العقلية وتساعده على التفكير وتشجعه على التعاون والعمل الجماعي .\nتسير عملية التدريس بهذا النموذج وفقا لثلاث مراحل أساسية :\n1-مرحلة الاستكشاف .                    2- مرحلة الابداع المفاهيمي              3- مرحلة الاتساع المفاهيمي\n\nثالثا : النموذج المنظومي :\nيعتمد بناء التراكيب النظرية لذلك النموذج على ثلاث مصادر ، تتمثل في نظرية "بياجية" عن علم النفس النمائي ، علم النفس المعرفي ، وكيفية تنظيم المعلومات داخل المخ البشري .\nوهو قائم على الفلسفة البنائية التي تؤكد على أهمية ان يكون التعلم ذا معنى .ويتم في هذا النموذج مساعدة التلاميذ على بناء مفاهيمهم ومعارفهم العملية بصورة منظوميه مرتبه وفق ست مراحل أساسية متتالية  وهي :\n-التعرف على المعلومات السابقة .\n-الاشتراك " الاندماج " .\n-الاستكشاف .\n-تقديم المفهوم " الايضاح والتفسير"\n-التوسع " التفكير التفصيلي "\n-التقويم'
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
      type: 'reading',
      id: 'reading4',
      title: 'نظرية جان بياجية في النمو المعرفي',
      content: 
      'نظرية جان بياجية في النمو المعرفي :\nالنمو عملية انتقائية موصولة من التغيرات التي تكشف عن إمكانات الطفل وركز جان بياجية على أهمية اكساب الطفل الخبرات التعليمية المختلفة التي تساعدهم على اكتساب المفاهيم المختلفة خلال طفولتهم .\n\nعوامل النضج المعرفي:\n-النضج البيولوجي :\n-التوازن .\n-الخبرات الاجتماعية .\n\nخصائص الطفل المعرفية :\n-التمركز حول الذات .\n-الخبرات الطبيعية للأشياء .\n\nالمراحل العامة للنمو المعرفي عند بياجية :\nأولا: المرحلة الحسية الحركية .\nثانيا : مرحلة ما قبل العمليات (من سنتين – 7 سنوات )\nثالثا: مرحلة العمليات المحسوسة (من سبع سنوات وحتى احدى عشر سنه )\nرابعا: مرحلة العمليات الشكلية المجردة (11 سنه وحتى الرشد ).\n\nنظرية بياجية في اللعب تقوم على ثلاثة افتراضات رئيسية هي :\n1.يسير النمو العقلي في تسلسل محدد من الممكن تسريعه او تأخيره ولكن التجربة وحدها لا يمكن ان تغيره .\n2.ان هذا التسلسل لا يكون مستمرا بل يتألف من مراحل يجب ان تتم كل مرحلة منها قبل ان تبدأ المرحلة المعرفية التالية .\n3.وهذا التسلسل في النمو العقلي يمكن تفسيره اعتمادا على نوع العمليات المنطقية التي يشتمل عليها .\n\nالمحاور الرئيسية لاختبارات بياجيه :\n1.اختبارات العلاقات المنطقية .\n2.اختبارات الاحتفاظ بالمادة .\n3.اختبارات التصنيف والتسلسل .\n4.اختبارات العدد .\n5.اختبارات المكان والزمان والمصادفة .'
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
      type: 'reading',
      id: 'reading5',
      title: 'نظرية التعلم السلوكية',
      content: 
      'مفاهيم النظرية السلوكية الإجرائية :\n-السلوك    - المثير والاستجابة     - التعزيز والعقاب      - التعلم\n\nمحددات المضمون المعرفي :\n1.محدد الإثارة\n2.محدد العرض النسقي للمادة .\n3.محدد التناسب والتكيف .\n4.محدد التعزيز الفوري .'
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
      type: 'reading',
      id: 'reading6',
      title: 'نظرية التعلم الجشطلتية',
      content: 
      'نظرية التعلم الجشطلتية :\n-الجشطلت     - البنية    - الاستبصار    - التنظيم     - إعادة التنظيم    - الانتقال     - الدافعية الاصلية       - الفهم والمعنى\n\nمبادئ التعلم في النظرية الجشطلتيه :\n1.الاستبصار شرط للتعلم الحقيقي .\n2.ان الفهم وتحقيق الاستبصار يفترض إعادة البنية .\n3.التعلم يقترن بالنتائج .\n4.الانتقال شرط التعلم الحقيقي .\n5.الحفظ والتطبيق الالي للمعارف تعلم سلبي .\n6.الاستبصار حافز قوي والتعزيز الخارجي عامل سلبي .\n7.الاستبصار تفاعل إيجابي مع موضوع التعلم .'
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
      type: 'reading',
      id: 'reading7',
      title: 'نظريات تصميم التدريس',
      content: 
      'نظريات تصميم التدريس :\n-نظرية النظم العامة .\n-نظرية الاتصال .\n-نظريات التدريس .\n-نظريات التعلم .\n-نظريات التعلم السلوكية .\n-نظريات التعلم العقلية .\n-نظريات التعلم البنائية\n\nأهمية التصميم التعليمي :\n1.تحسين الممارسات التربوية .\n2.توفير الجهد والوقت .\n3.استعمال الوسائل والاجهزه والأدوات التعليمية بطريقة جيده .\n4.إيجاد علاقة بين المبادئ النظرية والتطبيقية في المواقف التعليمية .\n5.اعتماد المتعلم على جهده الذاتي اثناء عملية التعلم .\n6.تفاعل المتعلم مع الماده الدراسية .\n7.توضيح دور المعلم في تسهيل عملية التعلم .\n8.تفريغ المعلم للقيام بواجبات تربوية أخرى إضافة الى التعليم .\n9.التقويم السليم لتعلم الطلبة وعمل المعلم .\n\nخطوات التصميم التعليمي :\n1.تحديد الهدف التعليمي .                    5.تطوير الاختبارات المحكية\n2.تحليل المهمة التعليمية .                    6. تطوير استراتيجية التعلم\n3.تحليل السلوك للمتعلم .                     7. تنظيم المحتوى التعليمي\n4.كتابة الأهداف السلوكية                     8. تطوير المواد التعليمية\n9.تصميم عملية التقويم التكويني .\n\nالمشاركون في عملية التصميم :\n1.المصمم التدريس .\n2.المدرس\n3.اختصاصي الموضوع\n4.المقوم'
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
      type: 'reading',
      id: 'reading7',
      title: 'نظريات تصميم التدريس',
      content: 
      'نظريات تصميم التدريس :\n-نظرية النظم العامة .\n-نظرية الاتصال .\n-نظريات التدريس .\n-نظريات التعلم .\n-نظريات التعلم السلوكية .\n-نظريات التعلم العقلية .\n-نظريات التعلم البنائية\n\nأهمية التصميم التعليمي :\n1.تحسين الممارسات التربوية .\n2.توفير الجهد والوقت .\n3.استعمال الوسائل والاجهزه والأدوات التعليمية بطريقة جيده .\n4.إيجاد علاقة بين المبادئ النظرية والتطبيقية في المواقف التعليمية .\n5.اعتماد المتعلم على جهده الذاتي اثناء عملية التعلم .\n6.تفاعل المتعلم مع الماده الدراسية .\n7.توضيح دور المعلم في تسهيل عملية التعلم .\n8.تفريغ المعلم للقيام بواجبات تربوية أخرى إضافة الى التعليم .\n9.التقويم السليم لتعلم الطلبة وعمل المعلم .\n\nخطوات التصميم التعليمي :\n1.تحديد الهدف التعليمي .                    5.تطوير الاختبارات المحكية\n2.تحليل المهمة التعليمية .                    6. تطوير استراتيجية التعلم\n3.تحليل السلوك للمتعلم .                     7. تنظيم المحتوى التعليمي\n4.كتابة الأهداف السلوكية                     8. تطوير المواد التعليمية\n9.تصميم عملية التقويم التكويني .\n\nالمشاركون في عملية التصميم :\n1.المصمم التدريس .\n2.المدرس\n3.اختصاصي الموضوع\n4.المقوم'
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
    <div className="quiz-container position-relative min-vh-100 d-flex flex-column align-items-center justify-content-center py-5" style={{ textAlign: 'right', backgroundColor: 'var(--white)' }}>
    <h1 className="display-5 u-title mt-4 mb-4 animate__animated animate__fadeIn text-center" style={{ color: 'var(--navy-blue)' }}>
      محتوى الاختبارات المعرفية للكتاب التفاعلي
    </h1>
    <Container className="py-4 animate__animated animate__slideInUp d-flex align-items-center justify-content-center">
      <Card className="shadow-lg border-0 rounded-lg overflow-hidden" style={{ maxWidth: '800px', width: '100%' }}>
        <div className="p-3 text-center" style={{ backgroundColor: 'var(--navy-blue)', color: 'var(--white)' }}>
          <h2 className="mb-0 fs-4 fw-bold">الباب الأول / نظريات التعلم ونظريات التدريس</h2>
        </div>
        <Card.Body className="p-4 p-md-5" style={{ textAlign: 'right' }}>
          <div className="progress mb-4" style={{ height: '8px', backgroundColor: 'var(--white)', border: '1px solid var(--navy-blue)' }}>
            <div 
              className="progress-bar" 
              role="progressbar" 
              style={{ width: `${(currentStep / (quizContent.length - 1)) * 100}%`, backgroundColor: 'var(--gold)' }}
              aria-valuenow={(currentStep / (quizContent.length - 1)) * 100}
              aria-valuemin="0" 
              aria-valuemax="100">
            </div>
          </div>
          
          {!isSubmitted ? (
            <>
              <div className={`animate__animated ${animationClass}`}>
                {quizContent[currentStep].type === 'reading' ? (
                  <div className="reading-container mb-4">
                    <div className="d-flex align-items-center mb-3 bg-light p-2 rounded-top" style={{borderBottom: 'solid 1px var(--gold)'}}>
                      <FontAwesomeIcon icon={faBookOpen} className="me-2 ms-2" size="lg" style={{ color: 'var(--navy-blue)'}} />
                      <h4 className="mb-0 fs-5 fw-bold">{quizContent[currentStep].title}</h4>
                    </div>
                    <Card className="bg-light border-0 shadow-sm rounded-bottom">
                      <Card.Body className="p-4" style={{ textAlign: 'right' }}>
                        <pre className="reading-text fs-6" style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', margin: 0, textAlign: 'right', direction: 'rtl', lineHeight: '1.8' }}>{quizContent[currentStep].content}</pre>
                      </Card.Body>
                    </Card>
                  </div>
                ) : (
                  <div className="question-container mb-4" style={{ textAlign: 'right' }}>
                    <div className="p-3 rounded mb-3" style={{ backgroundColor: 'var(--light-bg)', borderLeft: '4px solid var(--navy-blue)' }}>
                      <h4 className="mb-0 fs-5 fw-bold">{quizContent[currentStep].question}</h4>
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
                )}
              </div>
              {validationError && (
                <div className="alert mb-3" role="alert" style={{ textAlign: 'right', backgroundColor: 'var(--light-pink)', color: 'var(--pink)', border: '1px solid var(--pink)' }}>
                  {errorMessage}
                </div>
              )}
              
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
                ) : (
                  <Button 
                    className="btn-navy-blue"
                    // style={{ backgroundColor: 'var(--navy-blue)', borderColor: 'var(--navy-blue)', color: 'var(--white)' }}
                    onClick={handleSubmit}
                  >
                    إنهاء الإختبار <FontAwesomeIcon icon={faCheck} />
                  </Button>
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
                              <strong>التوضيح: </strong>كما ورد في النص، تسير عملية التدريس بنموذج دورة التعلم وفقا لثلاث مراحل أساسية هي: مرحلة الاستكشاف، مرحلة الإبداع المفاهيمي، مرحلة الاتساع المفاهيمي.
                            </p>
                          )}
                          {question.id === 6 && (
                            <p className="explanation" style={{ color: 'var(--grey)' }}>
                              <strong>التوضيح: </strong>كما ورد في النص، يعتمد بناء التراكيب النظرية للنموذج المنظومي على ثلاث مصادر ، هي: نظرية بياجيه، علم النفس المعرفي، وكيفية تنظيم المعلومات داخل المخ البشري.
                            </p>
                          )}
                          {question.id === 11 && (
                            <p className="explanation" style={{ color: 'var(--grey)' }}>
                              <strong>التوضيح: </strong>كما ورد في النص، تشمل مفاهيم النظرية السلوكية الإجرائية: السلوك والتعلم، المثير والاستجابة، والتعزيز والعقاب.
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
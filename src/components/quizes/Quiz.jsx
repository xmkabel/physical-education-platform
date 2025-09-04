import React, { useState, useEffect, Component } from "react";
import { Container, Card, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCheck,
  faBookOpen,
  faArrowRight,
  faStar,
  faTrophy,
  faListAlt,
} from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import styles from "./Quiz.module.css";
import { useNavigate } from "react-router-dom";
import { saveExamScore } from "../../services/examService";

/* ---------------------------
   Error Boundary (same file)
   --------------------------- */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(/*error*/) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary p-4 text-center">
          <h2 style={{ color: "var(--pink)" }}>حدث خطأ ما</h2>
          <p>يرجى تحديث الصفحة أو العودة للصفحة الرئيسية</p>
          <Button
            className={styles.button}
            onClick={() =>
              (window.location.href = "/react-physical-education/")
            }
          >
            العودة للصفحة الرئيسية
          </Button>
        </div>
      );
    }
    return this.props.children;
  }
}

/* ---------------------------
   Small AnswerReview component
   (embedded — لو عندك واحد فعليًا ممكن تستبدله)
   --------------------------- */
function AnswerReview({ quizContent, userAnswers, onClose }) {
  return (
    <div style={{ textAlign: "right" }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5>مراجعة الإجابات</h5>
        <Button size="sm" onClick={onClose}>
          إغلاق
        </Button>
      </div>
      <div style={{ maxHeight: 320, overflowY: "auto" }}>
        {quizContent.map((item, idx) => {
          const isEssay = item.type === "essay";
          const userAns = userAnswers[item.id];
          const correctIndex = getCorrectIndex(item);
          return (
            <Card key={idx} className="mb-2">
              <Card.Body style={{ textAlign: "right" }}>
                <div className="mb-2">
                  <strong>
                    {(isEssay ? "مقالي" : "سؤال") + " " + (idx + 1)}:{" "}
                    {item.question}
                  </strong>
                </div>
                {!isEssay ? (
                  <div>
                    <div>إجابات:</div>
                    <ul style={{ paddingInlineStart: 20 }}>
                      {item.options &&
                        item.options.map((opt, i) => {
                          const isUser = userAns === i;
                          const isCorrect = correctIndex === i;
                          return (
                            <li
                              key={i}
                              style={{
                                color: isCorrect
                                  ? "green"
                                  : isUser
                                  ? "orange"
                                  : "inherit",
                                fontWeight: isCorrect || isUser ? "600" : "400",
                              }}
                            >
                              {opt}{" "}
                              {isCorrect
                                ? " (صحيح)"
                                : isUser
                                ? " (اختيارك)"
                                : ""}
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                ) : (
                  <div>
                    <div>
                      <strong>إجابتك:</strong>
                    </div>
                    <div style={{ whiteSpace: "pre-wrap" }}>
                      {userAns || <em>لم تُجب</em>}
                    </div>
                    <div className="mt-2 text-muted">
                      <small>هذه الأسئلة المقالية ستراجع من قبل المعلم.</small>
                    </div>
                  </div>
                )}
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------------------
   Helper: get correct index (handles camelCase / snake_case)
   --------------------------- */
function getCorrectIndex(item) {
  // support: correctAnswer, correct_answer, correct_answer_index, correctAnswerIndex
  if (item == null) return null;
  const val =
    item.correctAnswer ??
    item.correct_answer ??
    item.correctAnswerIndex ??
    item.correct_answer_index ??
    item.correct; // fallback
  // ensure number (0-based)
  if (val === undefined || val === null) return null;
  return Number(val);
}

/* ---------------------------
   Main Quiz Component
   --------------------------- */
function Quiz({ quizData, name, quizId }) {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(0);
  const [quizContent, setQuizContent] = useState([]);
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);
  const [validationError, setValidationError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [animationClass, setAnimationClass] = useState("animate__fadeIn");
  const [showAnswerReview, setShowAnswerReview] = useState(false);
  const [showQuestionNavigation, setShowQuestionNavigation] = useState(true);

  useEffect(() => {
    // if external prop provided, use it
    if (Array.isArray(quizData) && quizData.length > 0) {
      setQuizContent(normalizeQuiz(quizData));
      setAnswers({});
    }
  }, [quizData, quizId]);

  // normalize JSON: convert keys to expected form if needed (keeps original otherwise)
  function normalizeQuiz(raw) {
    // If user passed nested arrays, flatten
    let arr = raw;
    if (Array.isArray(arr) && arr.every(Array.isArray)) arr = arr.flat();
    return arr.map((item) => {
      // unify key names (but we won't rename, we only ensure options exists)
      return { ...item };
    });
  }

  const goBack = () => navigate("/exams");

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        let parsed = JSON.parse(ev.target.result);
        if (Array.isArray(parsed) && parsed.every(Array.isArray))
          parsed = parsed.flat();
        // if object with keys containing arrays
        if (!Array.isArray(parsed) && typeof parsed === "object") {
          const maybeArr = Object.values(parsed).find((v) => Array.isArray(v));
          if (maybeArr) parsed = maybeArr;
        }
        setQuizContent(normalizeQuiz(parsed));
        setAnswers({});
        setCurrentStep(0);
      } catch (err) {
        console.error(err);
        alert("ملف JSON غير صالح. افتح الملف وتأكد من الصيغة.");
      }
    };
    reader.readAsText(file);
  };

  const handleAnswerSelect = (questionId, selectedOption) => {
    setAnswers((prev) => ({ ...prev, [questionId]: selectedOption }));
  };

  const handleEssayAnswer = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentStep < quizContent.length - 1) {
      setAnimationClass("animate__fadeOut");
      setTimeout(() => {
        setCurrentStep((s) => s + 1);
        setAnimationClass("animate__fadeIn");
      }, 250);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setAnimationClass("animate__fadeOut");
      setTimeout(() => {
        setCurrentStep((s) => s - 1);
        setAnimationClass("animate__fadeIn");
      }, 250);
    }
  };

  const calculateScore = () => {
    let score = 0;
    let total = 0;
    quizContent.forEach((item) => {
      if (item.type === "question") {
        total++;
        const correctIndex = getCorrectIndex(item);
        if (correctIndex !== null && answers[item.id] !== undefined) {
          if (Number(answers[item.id]) === Number(correctIndex)) score++;
        }
      }
    });
    return { score, totalQuestions: total };
  };

  const getEssayQuestionsCount = () =>
    quizContent.filter((i) => i.type === "essay").length;

  const getRegularQuestionsCount = () =>
    quizContent.filter((i) => i.type === "question").length;

  const handleSubmit = async () => {
    // validation: ensure all non-essay questions answered, and essay has at least a char
    const unanswered = [];
    quizContent.forEach((item) => {
      if (item.type === "question" && answers[item.id] === undefined)
        unanswered.push(item.id);
      if (item.type === "essay") {
        const a = answers[item.id];
        if (!a || (typeof a === "string" && a.trim().length === 0))
          unanswered.push(item.id);
      }
    });

    if (unanswered.length > 0) {
      setValidationError(true);
      setErrorMessage("يرجى الإجابة على جميع الأسئلة قبل إنهاء الاختبار");
      const firstIndex = quizContent.findIndex((it) => it.id === unanswered[0]);
      if (firstIndex >= 0) setCurrentStep(firstIndex);
      return;
    }

    setValidationError(false);
    setErrorMessage("");
    setIsSubmitted(true);
    setShowCorrectAnswers(true);

    const { score, totalQuestions } = calculateScore();
    const percentage =
      totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

    try {
      await saveExamScore(percentage, quizId);
      console.log("Score saved:", percentage);
    } catch (err) {
      console.error("Error saving exam score:", err);
      // you may show user-friendly message here
    }
  };

  // UI helpers
  const answeredCount = Object.keys(answers).length;
  const totalVisibleQuestions = quizContent.filter(
    (i) => i.type === "question" || i.type === "essay"
  ).length;

  return (
    <div className={styles.quizContainer}>
      <div className={styles.examCardsHeader}>
        <button className={styles.backButton} onClick={goBack}>
          <FontAwesomeIcon icon={faArrowLeft} className={styles.backArrow} />{" "}
          العودة
        </button>
        <h1 className={styles.examCardsTitle}>
          محتوى الاختبارات المعرفية للكتاب التفاعلي
        </h1>
      </div>

      <Container className="py-4 animate__animated animate__slideInUp">
        <Card className={`${styles.card} shadow-lg overflow-hidden`}>
          <div
            className="p-3 text-center"
            style={{
              backgroundColor: "var(--navy-blue)",
              color: "var(--white)",
            }}
          >
            <h2
              className="mb-0 fs-4 fw-bold quiz-title"
              style={{ fontSize: "clamp(1rem, 4vw, 1.5rem)" }}
            >
              {name || "الاختبار"}
            </h2>
          </div>

          {/* If no quiz content loaded yet, allow file upload */}
          {quizContent.length === 0 && !isSubmitted && (
            <div className="p-4 text-center">
              <p>
                لم يتم تحميل أسئلة الاختبار بعد. يمكنك رفع ملف JSON يحتوي على
                الأسئلة.
              </p>
              <input
                type="file"
                accept=".json,application/json"
                onChange={handleFileUpload}
              />
            </div>
          )}

          {!isSubmitted && quizContent.length > 0 && (
            <div
              className="p-3 text-center"
              style={{
                backgroundColor: "#f8f9fa",
                borderBottom: "1px solid #eee",
              }}
            >
              <div className="d-flex justify-content-center align-items-center mb-2">
                <span style={{ fontSize: "0.9rem", color: "var(--navy-blue)" }}>
                  تم الإجابة على {answeredCount} من {totalVisibleQuestions} سؤال
                </span>
                <span
                  style={{
                    fontSize: "0.9rem",
                    color: "var(--gold)",
                    fontWeight: "bold",
                    marginRight: "12px",
                  }}
                >
                  {totalVisibleQuestions === 0
                    ? 0
                    : Math.round((answeredCount / totalVisibleQuestions) * 100)}
                  %
                </span>
              </div>
              <div className={styles.progressBarContainer}>
                <div
                  className={styles.progressBar}
                  style={{
                    width: `${
                      totalVisibleQuestions === 0
                        ? 0
                        : (answeredCount / totalVisibleQuestions) * 100
                    }%`,
                  }}
                />
              </div>
            </div>
          )}

          <Card.Body className="p-3 p-md-4" style={{ textAlign: "right" }}>
            {quizContent.length === 0 && !isSubmitted ? (
              <div
                className="alert alert-warning"
                role="alert"
                style={{ textAlign: "right" }}
              >
                لا توجد أسئلة متاحة للاختبار — ارفع ملف JSON أو أرسل `quizData`
                للكمبوننت.
              </div>
            ) : null}

            {!isSubmitted ? (
              <>
                <div className={`animate__animated ${animationClass}`}>
                  {quizContent &&
                  quizContent.length > 0 &&
                  quizContent[currentStep] &&
                  quizContent[currentStep].type === "reading" ? (
                    <div className="reading-container mb-4">
                      <div
                        className="d-flex align-items-center mb-3 bg-light p-2 rounded-top"
                        style={{ borderBottom: "solid 1px var(--gold)" }}
                      >
                        <FontAwesomeIcon
                          icon={faBookOpen}
                          className="me-2 ms-2"
                          size="lg"
                          style={{ color: "var(--navy-blue)" }}
                        />
                        <h4 className="mb-0 fs-5 fw-bold">
                          قراءة {currentStep + 1}:{" "}
                          {quizContent[currentStep].title}
                        </h4>
                      </div>
                      <Card className="bg-light border-0 shadow-sm rounded-bottom">
                        <Card.Body
                          className="p-4"
                          style={{
                            textAlign: "right",
                            maxHeight: "400px",
                            overflowY: "auto",
                          }}
                        >
                          <pre
                            className="reading-text fs-6"
                            style={{
                              whiteSpace: "pre-wrap",
                              fontFamily: "inherit",
                              margin: 0,
                              textAlign: "right",
                              direction: "rtl",
                              lineHeight: 1.8,
                            }}
                          >
                            {quizContent[currentStep].content}
                          </pre>
                        </Card.Body>
                      </Card>
                    </div>
                  ) : quizContent &&
                    quizContent.length > 0 &&
                    quizContent[currentStep] ? (
                    <div
                      className="question-container mb-4"
                      style={{ textAlign: "right" }}
                    >
                      <div
                        className="p-3 rounded mb-3"
                        style={{
                          backgroundColor: "var(--light-bg)",
                          borderLeft: "4px solid var(--navy-blue)",
                        }}
                      >
                        <h4 className="mb-0 fs-5 fw-bold">
                          {quizContent[currentStep].type === "essay"
                            ? "سؤال مقالي"
                            : "سؤال"}{" "}
                          {quizContent
                            .filter(
                              (item) =>
                                item.type === "question" ||
                                item.type === "essay"
                            )
                            .findIndex(
                              (q) => q.id === quizContent[currentStep].id
                            ) + 1}
                          : {quizContent[currentStep].question}
                        </h4>
                      </div>

                      <div className="d-grid gap-3">
                        {quizContent[currentStep].type === "essay" ? (
                          <Form.Control
                            key={quizContent[currentStep].id}
                            onChange={(e) =>
                              handleEssayAnswer(
                                quizContent[currentStep].id,
                                e.target.value
                              )
                            }
                            value={answers[quizContent[currentStep].id] || ""}
                            as="textarea"
                            rows={6}
                            placeholder="اكتب اجابتك هنا... (يجب كتابة حرف واحد على الأقل)"
                            style={{ direction: "rtl", textAlign: "right" }}
                          />
                        ) : (
                          (quizContent[currentStep].options || []).map(
                            (option, index) => (
                              <Button
                                key={index}
                                variant="outline-light"
                                className={`${styles.optionButton} ${
                                  answers[quizContent[currentStep].id] === index
                                    ? styles.selected
                                    : ""
                                }`}
                                onClick={() =>
                                  handleAnswerSelect(
                                    quizContent[currentStep].id,
                                    index
                                  )
                                }
                              >
                                {option}
                              </Button>
                            )
                          )
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="alert alert-danger" role="alert">
                      بيانات الاختبار غير متوفرة أو غير صحيحة
                    </div>
                  )}
                </div>

                {validationError && (
                  <div className={styles.errorMessage}>{errorMessage}</div>
                )}

                

                <div className="d-flex flex-column flex-sm-row justify-content-between gap-3 mt-4">
                  <Button
                    className={styles.button}
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                  >
                    <FontAwesomeIcon icon={faArrowRight} className="me-2" />{" "}
                    السابق
                  </Button>
                  <Button
                    className={styles.button}
                    onClick={handleNext}
                    disabled={currentStep === quizContent.length - 1}
                  >
                    التالي{" "}
                    <FontAwesomeIcon icon={faArrowLeft} className="ms-2" />
                  </Button>
                </div>

                <div className="d-flex justify-content-center my-4">
                  <Button className={styles.button} onClick={handleSubmit}>
                    إنهاء الاختبار
                  </Button>
                </div>

                <div className="d-flex justify-content-center mb-3">
                  <Button 
                    // variant="outline-secondary" 
                    size="sm"
                    onClick={() => setShowQuestionNavigation(!showQuestionNavigation)}
                    style={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: 'var(--navy-blue)',
                      padding: '0.25rem 1rem'
                    }}
                  >
                    {showQuestionNavigation ? `إخفاء التنقل \\/` : `إظهار التنقل/\\`}
                  </Button>
                </div>

                {!showQuestionNavigation && (
                  <div className="question-navigation mb-4 d-flex flex-wrap gap-2 justify-content-center">
                    {quizContent.map((item, index) => {
                      let displayNumber;
                      if (item.type === "reading") {
                        displayNumber = (
                          <FontAwesomeIcon
                            icon={faBookOpen}
                            className="me-2 ms-2"
                            size="lg"
                            style={{
                              color:
                                currentStep === index ||
                                answers[item.id] !== undefined
                                  ? "white"
                                  : "var(--navy-blue)",
                            }}
                          />
                        );
                      } else {
                        displayNumber = quizContent.filter(
                          (q) =>
                            (q.type === "question" || q.type === "essay") &&
                            quizContent.indexOf(q) <= index
                        ).length;
                      }

                      return (
                        <Button
                          key={index}
                          size="sm"
                          variant={
                            currentStep === index
                              ? "primary"
                              : answers[item.id] !== undefined
                              ? "success"
                              : "outline-secondary"
                        }
                          onClick={() => {
                            setAnimationClass("animate__fadeOut");
                            setTimeout(() => {
                              setCurrentStep(index);
                              setAnimationClass("animate__fadeIn");
                            }, 200);
                          }}
                          style={{
                            minWidth: "45px",
                            padding: "8px 12px",
                            borderRadius: "8px",
                            backgroundColor:
                              currentStep === index
                                ? "var(--navy-blue)"
                                : answers[item.id] !== undefined
                                ? "var(--gold)"
                                : "white",
                            borderColor: "var(--navy-blue)",
                            color:
                              currentStep === index ||
                              answers[item.id] !== undefined
                                ? "white"
                                : "var(--navy-blue)",
                            transition: "all 0.3s ease",
                            transform:
                              currentStep === index ? "scale(1.05)" : "scale(1)",
                          }}
                        >
                          {displayNumber}
                        </Button>
                      );
                    })}
                  </div>
                )}
              </>
            ) : (
              <div className="animate__animated animate__fadeIn">
                <div className="text-center mb-4">
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="text-success mb-3"
                    size="3x"
                  />
                  <h3 className="mb-3">تم إنهاء الاختبار!</h3>
                  {(() => {
                    const { score, totalQuestions } = calculateScore();
                    const essayCount = getEssayQuestionsCount();
                    const regularCount = getRegularQuestionsCount();
                    const percentage =
                      totalQuestions > 0
                        ? Math.round((score / totalQuestions) * 100)
                        : 0;

                    return (
                      <div className="text-center">
                        {regularCount > 0 ? (
                          <>
                            <h4 className="mb-3">
                              النتيجة: {score} من {totalQuestions}
                            </h4>
                            <div className="d-flex justify-content-center mb-1">
                              <span
                                style={{
                                  fontSize: "0.9rem",
                                  color: "var(--gold)",
                                  fontWeight: "bold",
                                }}
                              >
                                {percentage}%
                              </span>
                            </div>
                            <div className={styles.progressBarContainer}>
                              <div
                                className={styles.progressBar}
                                style={{
                                  width: `${percentage}%`,
                                  background:
                                    percentage >= 70
                                      ? "linear-gradient(45deg, #3498db, #f1c40f)"
                                      : "linear-gradient(45deg, #e74c3c, #3498db)",
                                }}
                              />
                            </div>
                          </>
                        ) : (
                          <h4 className="mb-3">
                            اختبار مقالي - سيتم مراجعة الإجابات من قبل المعلم
                          </h4>
                        )}

                        {essayCount > 0 && (
                          <div
                            className="alert alert-info mt-3"
                            style={{ textAlign: "right" }}
                          >
                            <strong>ملاحظة:</strong> هذا الاختبار يحتوي على{" "}
                            {essayCount} سؤال مقالي سيتم مراجعته من قبل المعلم
                          </div>
                        )}

                        <div
                          className={`${styles.medalContainer} mt-4 animate__animated animate__bounceIn`}
                        >
                          {/* Medal visual */}
                          {regularCount > 0 &&
                            (() => {
                              if (percentage === 100)
                                return (
                                  <>
                                    <div className={styles.medal}>🎖</div>
                                    <p
                                      className={styles.medalText}
                                      style={{ color: "var(--gold)" }}
                                    >
                                      ممتاز!
                                    </p>
                                  </>
                                );
                              if (percentage >= 75)
                                return (
                                  <>
                                    <div className={styles.medal}>🏅</div>
                                    <p className={styles.medalText}>
                                      جيد جداً!
                                    </p>
                                  </>
                                );
                              if (percentage >= 50)
                                return (
                                  <>
                                    <div className={styles.medal}>🏅</div>
                                    <p className={styles.medalText}>جيد!</p>
                                  </>
                                );
                              return (
                                <>
                                  <div className={styles.medal}>🥉</div>
                                  <p
                                    className={styles.medalText}
                                    style={{ color: "var(--pink)" }}
                                  >
                                    حاول مرة أخرى!
                                  </p>
                                </>
                              );
                            })()}

                          {regularCount === 0 && (
                            <>
                              <div className={styles.medal}>📝</div>
                              <p
                                className={styles.medalText}
                                style={{ color: "var(--navy-blue)" }}
                              >
                                تم حفظ الإجابات
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {console.log(quizContent)}
                {!showAnswerReview ? (
                  <div className="d-flex flex-column flex-sm-row justify-content-center gap-3 mt-4">
                    <Button
                      className={styles.button}
                      onClick={() => setShowAnswerReview(true)}
                    >
                      <FontAwesomeIcon icon={faListAlt} className="me-2" /> عرض
                      الإجابات
                    </Button>
                    <Button
                      className={styles.button}
                      onClick={() => {
                        setIsSubmitted(false);
                        restartOnSubmit();
                      }}
                      style={{
                        backgroundColor: "var(--gold)",
                        borderColor: "var(--gold)",
                      }}
                    >
                      إعادة الاختبار
                    </Button>
                    <Button className={styles.button} onClick={goBack}>
                      العودة للاختبارات
                    </Button>
                  </div>
                ) : (
                  <>
                    <AnswerReview
                      quizContent={quizContent.filter(
                        (item) =>
                          item.type === "question" || item.type === "essay"
                      )}
                      userAnswers={answers}
                      onClose={() => setShowAnswerReview(false)}
                    />
                  </>
                )}
              </div>
            )}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );

  // small helper to reset view after pressing "اعادة الاختبار" from submitted state
  function restartOnSubmit() {
    setCurrentStep(0);
    setAnswers({});
    setIsSubmitted(false);
    setShowCorrectAnswers(false);
    setValidationError(false);
    setErrorMessage("");
    setShowAnswerReview(false);
    setAnimationClass("animate__fadeIn");
  }
}

export { ErrorBoundary };
export default Quiz;

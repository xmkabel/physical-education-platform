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
import AnswerReview from "./AnswerReview";
import { saveExamScore } from "../../services/examService";

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
      errorInfo: errorInfo,
    });
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

function Quiz({ quizData, name, quizId }) {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);
  const [validationError, setValidationError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [animationClass, setAnimationClass] = useState("animate__fadeIn");
  const [showAnswerReview, setShowAnswerReview] = useState(false);

  const goBack = () => {
    navigate(-1); // العودة للصفحة السابقة
  };
  console.log(quizId);

  // Restart Quiz
  const restartQuiz = () => {
    setCurrentStep(0);
    setAnswers({});
    setIsSubmitted(false);
    setShowCorrectAnswers(false);
    setValidationError(false);
    setErrorMessage("");
    setShowAnswerReview(false);
    setAnimationClass("animate__fadeIn");
  };

  // Quiz Content from props
  const [quizContent, setQuizContent] = useState([]);

  // Initialize quiz content
  useEffect(() => {
    if (quizData) {
      setQuizContent(quizData);
      setAnswers({});
    }
  }, [quizData, quizId]);

  const handleAnswerSelect = (questionId, selectedOption) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: selectedOption,
    }));
  };

  const handleEssayAnswer = (questionId, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleNext = () => {
    if (currentStep < quizContent.length - 1) {
      setAnimationClass("animate__fadeOut");
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setAnimationClass("animate__fadeIn");
      }, 300);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setAnimationClass("animate__fadeOut");
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        setAnimationClass("animate__fadeIn");
      }, 300);
    }
  };

  const handleSubmit = async () => {
    const unanswered = [];

    quizContent.forEach((item) => {
      if (item.type === "question" && answers[item.id] === undefined) {
        unanswered.push(item.id);
      } else if (item.type === "essay") {
        const answer = answers[item.id];
        if (!answer || answer.trim().length === 0) {
          unanswered.push(item.id);
        }
      }
    });

    if (unanswered.length > 0) {
      setValidationError(true);
      setErrorMessage(`يرجى الإجابة على جميع الأسئلة قبل إنهاء الاختبار`);

      const firstUnansweredIndex = quizContent.findIndex(
        (item) => item.id === unanswered[0]
      );
      if (firstUnansweredIndex !== -1) {
        setCurrentStep(firstUnansweredIndex);
      }
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
      console.log("Score saved successfully ✅ : ", percentage);
    } catch (error) {
      console.error("Error saving exam score:", error);
    }
  };

  const calculateScore = () => {
    let score = 0;
    let total = 0;

    quizContent.forEach((item) => {
      if (item.type === "question") {
        total++;
        if (answers[item.id] === item.correctAnswer) {
          score++;
        }
      }
    });

    return { score, totalQuestions: total };
  };

  const getEssayQuestionsCount = () =>
    quizContent.filter((item) => item.type === "essay").length;

  const getRegularQuestionsCount = () =>
    quizContent.filter((item) => item.type === "question").length;

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
              {name}
            </h2>
          </div>
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
                  تم الإجابة على {Object.keys(answers).length} من{" "}
                  {
                    quizContent.filter(
                      (item) =>
                        item.type === "question" || item.type === "essay"
                    ).length
                  }{" "}
                  سؤال
                </span>
                <span
                  style={{
                    fontSize: "0.9rem",
                    color: "var(--gold)",
                    fontWeight: "bold",
                    marginRight: "12px",
                  }}
                >
                  {Math.round(
                    (Object.keys(answers).length /
                      quizContent.filter(
                        (item) =>
                          item.type === "question" || item.type === "essay"
                      ).length) *
                      100
                  )}
                  %
                </span>
              </div>
              <div className={styles.progressBarContainer}>
                <div
                  className={styles.progressBar}
                  style={{
                    width: `${
                      (Object.keys(answers).length /
                        quizContent.filter(
                          (item) =>
                            item.type === "question" || item.type === "essay"
                        ).length) *
                      100
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          )}
          <Card.Body className="p-3 p-md-4" style={{ textAlign: "right" }}>
            {quizContent.length === 0 && !isSubmitted && (
              <div
                className="alert alert-warning"
                role="alert"
                style={{ textAlign: "right" }}
              >
                لا توجد أسئلة متاحة للاختبار
              </div>
            )}

            {!isSubmitted ? (
              <>
                <div className="animate__animated animate__fadeIn">
                  {quizContent &&
                  quizContent.length > 0 &&
                  currentStep < quizContent.length &&
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
                              lineHeight: "1.8",
                            }}
                          >
                            {quizContent[currentStep].content}
                          </pre>
                        </Card.Body>
                      </Card>
                    </div>
                  ) : quizContent &&
                    quizContent.length > 0 &&
                    currentStep < quizContent.length &&
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
                          quizContent[currentStep].options.map(
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

                <div className="question-navigation mb-4 d-flex flex-wrap gap-2 justify-content-center">
                  {quizContent.map((item, index) => {
                    // Calculate question number for display
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
                      // For questions, find the position among only question items
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
                          }, 300);
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
                            currentStep === index ? "scale(1.1)" : "scale(1)",
                        }}
                      >
                        {displayNumber}
                      </Button>
                    );
                  })}
                </div>

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

                <div className="d-flex justify-content-center mt-4">
                  <Button className={styles.button} onClick={handleSubmit}>
                    إنهاء الاختبار
                  </Button>
                </div>
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
                                {Math.round((score / totalQuestions) * 100)}%
                              </span>
                            </div>
                            <div className={styles.progressBarContainer}>
                              <div
                                className={styles.progressBar}
                                style={{
                                  width: `${(score / totalQuestions) * 100}%`,
                                  background:
                                    score / totalQuestions >= 0.7
                                      ? "linear-gradient(45deg, #3498db, #f1c40f)"
                                      : "linear-gradient(45deg, #e74c3c, #3498db)",
                                }}
                              ></div>
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
                          {regularCount > 0 &&
                            (() => {
                              const percentage = (score / totalQuestions) * 100;

                              if (percentage === 100) {
                                return (
                                  <>
                                    <div
                                      className={styles.perfectScoreCelebration}
                                    >
                                      <div className={styles.confettiContainer}>
                                        <div
                                          className={`${styles.confetti} ${styles.confetti1}`}
                                        ></div>
                                        <div
                                          className={`${styles.confetti} ${styles.confetti2}`}
                                        ></div>
                                        <div
                                          className={`${styles.confetti} ${styles.confetti3}`}
                                        ></div>
                                        <div
                                          className={`${styles.confetti} ${styles.confetti4}`}
                                        ></div>
                                        <div
                                          className={`${styles.confetti} ${styles.confetti5}`}
                                        ></div>
                                        <div
                                          className={`${styles.confetti} ${styles.confetti6}`}
                                        ></div>
                                        <div
                                          className={`${styles.confetti} ${styles.confetti7}`}
                                        ></div>
                                        <div
                                          className={`${styles.confetti} ${styles.confetti8}`}
                                        ></div>
                                      </div>

                                      <div className={styles.starContainer}>
                                        <FontAwesomeIcon
                                          icon={faStar}
                                          className={`${styles.star} ${styles.star1}`}
                                        />
                                        <FontAwesomeIcon
                                          icon={faStar}
                                          className={`${styles.star} ${styles.star2}`}
                                        />
                                        <FontAwesomeIcon
                                          icon={faStar}
                                          className={`${styles.star} ${styles.star3}`}
                                        />
                                      </div>

                                      <div className={styles.trophyContainer}>
                                        <FontAwesomeIcon
                                          icon={faTrophy}
                                          className={styles.trophy}
                                        />
                                      </div>

                                      <div className={styles.medal}>🎖</div>
                                      <p
                                        className={`${styles.medalText} animate__animated animate__tada animate__infinite`}
                                        style={{ color: "var(--gold)" }}
                                      >
                                        ممتاز!
                                      </p>
                                      <p
                                        className={`${styles.perfectScoreText} animate__animated animate__fadeIn`}
                                      >
                                        أحسنت! لقد حصلت على العلامة الكاملة! 🎉
                                      </p>
                                    </div>
                                  </>
                                );
                              } else if (percentage >= 50) {
                                return (
                                  <>
                                    <div className={styles.medal}>🏅</div>
                                    <p
                                      className={styles.medalText}
                                      style={{ color: "var(--gold)" }}
                                    >
                                      {percentage >= 75 ? "جيد جداً!" : "جيد!"}
                                    </p>
                                  </>
                                );
                              } else if (percentage > 0) {
                                return (
                                  <>
                                    <div className={styles.medal}>🥉</div>
                                    <p
                                      className={styles.medalText}
                                      style={{ color: "var(--pink)" }}
                                    >
                                      استمر!
                                    </p>
                                  </>
                                );
                              } else {
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
                              }
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
                      onClick={restartQuiz}
                      style={{
                        backgroundColor: "var(--gold)",
                        borderColor: "var(--gold)",
                      }}
                    >
                      <FontAwesomeIcon icon={faArrowRight} className="me-2" />{" "}
                      إعادة الاختبار
                    </Button>
                    <Button className={styles.button} onClick={goBack}>
                      العودة للاختبارات
                    </Button>
                  </div>
                ) : (
                  <AnswerReview
                    quizContent={quizContent}
                    userAnswers={answers}
                    onClose={() => setShowAnswerReview(false)}
                  />
                )}
              </div>
            )}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default Quiz;
import React, { useState, useEffect, Component } from "react";
import { Container, Card, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faArrowLeft,
  faCheck,
  faBookOpen,
  faArrowRight,
  faStar,
  faTrophy,
  faListAlt,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import styles from "./Quiz.module.css";
import { useNavigate, useParams } from "react-router-dom";
import AnswerReview from "./AnswerReview";
import { saveExamScore } from "../../services/examService";

import Video from "../Video";
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

function QuizWithVideos({ quizData, name , quizId}) {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(0);
  const [videoPath, setVideoPath] = useState(`/videos/4_1_1.mp4`);
  const [videoTitle, setVideoTitle] = useState("");
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);
  const [validationError, setValidationError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [animationClass, setAnimationClass] = useState("animate__fadeIn");
  const [showAnswerReview, setShowAnswerReview] = useState(false);
  const [showQuestionNavigation, setShowQuestionNavigation] = useState(true);

  const goBack = () => {
    navigate(-1); // This will go back to the previous page (chapter view)
  };

  // Function to restart the quiz
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

  // Use quiz data from props
  const [quizContent, setQuizContent] = useState([]);

  // Initialize quiz content from props
  useEffect(() => {
    if (quizData) {
      setQuizContent(quizData);
    }
  }, [quizData]);

  // Second useEffect that depends on quizContent being set
  useEffect(() => {
    const currentItem = quizContent[currentStep];
    if (currentItem && currentItem.type === "video") {
      setVideoPath(currentItem.path);
      setVideoTitle(currentItem.title);
    }
  }, [quizContent, currentStep]);

  const handleAnswerSelect = (questionId, selectedOption) => {
    setAnswers({
      ...answers,
      [questionId]: selectedOption,
    });
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
    // Check if all questions have been answered
    const unansweredQuestions = [];

    quizContent.forEach((item) => {
      if (item.type === "question" && answers[item.id] === undefined) {
        unansweredQuestions.push(item.id);
      }
    });

    if (unansweredQuestions.length > 0) {
      setValidationError(true);
      setErrorMessage(`يرجى الإجابة على جميع الأسئلة قبل إنهاء الاختبار`);

      // Find the first unanswered question and navigate to it
      const firstUnansweredQuestionIndex = quizContent.findIndex(
        (item) => item.type === "question" && item.id === unansweredQuestions[0]
      );

      if (firstUnansweredQuestionIndex !== -1) {
        setCurrentStep(firstUnansweredQuestionIndex);
      }

      return;
    }

    // If all questions are answered, proceed with submission
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

  const calculateScore = () => {
    let score = 0;
    let totalQuestions = 0;

    quizContent.forEach((item) => {
      if (item.type === "question") {
        totalQuestions++;
        if (answers[item.id] === item.correctAnswer) {
          score++;
        }
      }
    });

    return { score, totalQuestions };
  };

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
                    quizContent.filter((item) => item.type === "question")
                      .length
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
                      quizContent.filter((item) => item.type === "question")
                        .length) *
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
                        quizContent.filter((item) => item.type === "question")
                          .length) *
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
                  quizContent[currentStep].type === "video" ? (
                    <div className="reading-container mb-4">
                      <div
                        className="d-flex align-items-center mb-3 bg-light p-2 rounded-top"
                        style={{ borderBottom: "solid 1px var(--gold)" }}
                      >
                        <FontAwesomeIcon
                          icon={faVideo}
                          className="me-2 ms-2"
                          size="lg"
                          style={{ color: "var(--navy-blue)" }}
                        />
                        <h4 className="mb-0 fs-5 fw-bold">
                          فيديو {currentStep + 1}:{" "}
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
                          {
                            <Video
                              key={quizContent[currentStep].path}
                              path={quizContent[currentStep].path}
                              title={quizContent[currentStep].title}
                            />
                          }
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
                          سؤال{" "}
                          {quizContent
                            .filter((item) => item.type === "question")
                            .findIndex(
                              (q) => q.id === quizContent[currentStep].id
                            ) + 1}
                          : {quizContent[currentStep].question}
                        </h4>
                      </div>
                      <div className="d-grid gap-3">
                        {quizContent[currentStep].options.map(
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
                    size="sm"
                    onClick={() =>
                      setShowQuestionNavigation(!showQuestionNavigation)
                    }
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      color: "var(--navy-blue)",
                      padding: "0.25rem 1rem",
                    }}
                  >
                    <FontAwesomeIcon
                      icon={
                        showQuestionNavigation ? faChevronUp : faChevronDown
                      }
                      size="lg"
                    />
                  </Button>
                </div>

                {/* هنا نستخدم AnimatePresence */}
                <AnimatePresence>
                  {showQuestionNavigation && (
                    <motion.div
                      className="question-navigation mb-4 d-flex flex-wrap gap-2 justify-content-center"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.1 }}
                    >
                      {quizContent.map((item, index) => {
                        // نفس اللوجيك بتاعك لعرض السؤال أو الفيديو
                        let displayNumber;
                        if (item.type === "video") {
                          displayNumber = (
                            <FontAwesomeIcon
                              icon={faVideo}
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
                              q.type === "question" &&
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
                                currentStep === index
                                  ? "scale(1.1)"
                                  : "scale(1)",
                            }}
                          >
                            {displayNumber}
                          </Button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
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
                    const percentage = (score / totalQuestions) * 100;

                    return (
                      <div className="text-center">
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
                            {Math.round(percentage)}%
                          </span>
                        </div>
                        <div className={styles.progressBarContainer}>
                          <div
                            className={styles.progressBar}
                            style={{
                              width:
                                percentage === 0
                                  ? "0%"
                                  : `${Math.max(percentage, 1)}%`,
                              background:
                                percentage >= 70
                                  ? "linear-gradient(45deg, #3498db, #f1c40f)"
                                  : "linear-gradient(45deg, #e74c3c, #3498db)",
                            }}
                          ></div>
                        </div>
                        <div
                          className={`${styles.medalContainer} mt-4 animate__animated animate__bounceIn`}
                        >
                          {percentage === 100 && (
                            <>
                              <div className={styles.perfectScoreCelebration}>
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
                          )}

                          {percentage >= 50 && percentage < 100 && (
                            <>
                              <div className={styles.medal}>🏅</div>
                              <p
                                className={styles.medalText}
                                style={{ color: "var(--gold)" }}
                              >
                                {percentage >= 75 ? "جيد جداً!" : "جيد!"}
                              </p>
                            </>
                          )}

                          {percentage > 0 && percentage < 50 && (
                            <>
                              <div className={styles.medal}>🥉</div>
                              <p
                                className={styles.medalText}
                                style={{ color: "var(--pink)" }}
                              >
                                استمر!
                              </p>
                            </>
                          )}

                          {percentage === 0 && (
                            <>
                              <div className={styles.medal}>🥉</div>
                              <p
                                className={styles.medalText}
                                style={{ color: "var(--pink)" }}
                              >
                                حاول مرة أخرى!
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
                      quizContent={quizContent.filter(
                        (item) =>
                          item.type === "question" || item.type === "essay"
                      )}
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

export default QuizWithVideos;

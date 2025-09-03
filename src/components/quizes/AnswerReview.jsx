import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faArrowLeft, faEdit } from '@fortawesome/free-solid-svg-icons';
import styles from './AnswerReview.module.css';

const AnswerReview = ({ quizContent, userAnswers, onClose }) => {
  // Filter only question items
  const questions = quizContent;
  // .filter(item => item.type === 'question' || item.type === 'essay');
//   const questions = quizContent.filter(
//   item => (item.type === 'question' || item.type === 'essay') && item.question
// );

  return (
    <div className={styles.reviewContainer}>
      <div className={styles.reviewHeader}>
        <h3 className={styles.reviewTitle}>مراجعة الإجابات</h3>
        <p className={styles.reviewSubtitle}>مقارنة إجاباتك مع الإجابات الصحيحة</p>
      </div>

      <div className={styles.questionsContainer}>
        {questions.map((question, index) => {
          const userAnswer = userAnswers[question.id];
          const isEssayQuestion = question.type === 'essay';
          const isCorrect = isEssayQuestion ? null : userAnswer === question.correctAnswer;

          return (
            <Card key={question.id} className={`${styles.questionCard} ${isEssayQuestion ? styles.essayCard : (isCorrect ? styles.correctCard : styles.incorrectCard)}`}>
              <Card.Header className={styles.questionHeader}>
                <div className={styles.questionNumber}>
                  {isEssayQuestion ? 'سؤال مقالي' : 'سؤال'} {index + 1}
                </div>
                <div className={styles.questionStatus}>
                  {isEssayQuestion ? (
                    <span className={styles.essayStatus}>
                      <FontAwesomeIcon icon={faEdit} /> مقالي
                    </span>
                  ) : (
                    isCorrect ? (
                      <span className={styles.correct}>
                        <FontAwesomeIcon icon={faCheck} /> صحيح
                      </span>
                    ) : (
                      <span className={styles.incorrect}>
                        <FontAwesomeIcon icon={faTimes} /> غير صحيح
                      </span>
                    )
                  )}
                </div>
              </Card.Header>
              <Card.Body>
                <div className={styles.questionText}>{question.question}</div>

                <div className={styles.answersContainer}>
                  {isEssayQuestion ? (
                    <div className={styles.essayAnswerContainer}>
                      <div className={styles.essayAnswer}>
                        <h5 className={styles.answerLabel}>إجابتك:</h5>
                        <div className={styles.essayText}>
                          {userAnswer ? userAnswer : 'لم يتم الإجابة على هذا السؤال'}
                        </div>
                      </div>
                      
                      {question.correctAnswer && (
                        <div className={styles.essayAnswer}>
                          <h5 className={styles.answerLabel}>الإجابة النموذجية:</h5>
                          <div className={styles.essayText} style={{ whiteSpace: 'pre-line' }}>
                            {question.correctAnswer}
                          </div>
                        </div>
                      )}
                      
                      {!question.correctAnswer && (
                        <div className={styles.essayAnswer}>
                          <h5 className={styles.answerLabel}>ملاحظة:</h5>
                          <div className={styles.essayText} style={{ color: 'var(--navy-blue)', fontStyle: 'italic' }}>
                            سيتم مراجعة إجابتك من قبل المعلم
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    question.options.map((option, optionIndex) => {
                      const isUserSelection = userAnswer === optionIndex;
                      const isCorrectAnswer = question.correctAnswer === optionIndex;

                      let optionClass = styles.option;
                      if (isUserSelection) {
                        optionClass = isCorrectAnswer ? styles.correctSelection : styles.incorrectSelection;
                      } else if (isCorrectAnswer) {
                        optionClass = styles.correctAnswer;
                      }

                      return (
                        <div key={optionIndex} className={optionClass}>
                          <div className={styles.optionText}>{option}</div>
                          <div className={styles.optionIndicator}>
                            {isUserSelection && isCorrectAnswer && <FontAwesomeIcon icon={faCheck} className={styles.correctIcon} />}
                            {isUserSelection && !isCorrectAnswer && <FontAwesomeIcon icon={faTimes} className={styles.incorrectIcon} />}
                            {!isUserSelection && isCorrectAnswer && <FontAwesomeIcon icon={faCheck} className={styles.correctIcon} />}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </Card.Body>
            </Card>
          );
        })}
      </div>

      <div className={styles.actionContainer}>
        <Button className={styles.closeButton} onClick={onClose}>
          <FontAwesomeIcon icon={faArrowLeft} className="ms-2" /> العودة للنتائج
        </Button>
      </div>
    </div>
  );
};

export default AnswerReview;

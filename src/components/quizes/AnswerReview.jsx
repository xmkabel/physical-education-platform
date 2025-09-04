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
  faTimes,
  faEdit
} from "@fortawesome/free-solid-svg-icons";
// import { motion, AnimatePresence } from "framer-motion";
import styless from './AnswerReview.module.css';

import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import styles from "./Quiz.module.css";

export function getCorrectIndex(item) {
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
          const isCorrect =
            !isEssay && userAns !== undefined && userAns === correctIndex;

          return (
            <Card key={idx} className="mb-2">
              <Card.Header className={styless.questionHeader}>
                <div className={styless.questionNumber}>
                  {isEssay ? "سؤال مقالي" : "سؤال"} {idx + 1}
                </div>
                <div className={styles.questionStatus}>
                  {isEssay ? (
                    <span className={styless.essayStatus}>
                      <FontAwesomeIcon icon={faEdit} /> مقالي
                    </span>
                  ) : isCorrect ? (
                    <span className={styless.correct}>
                      <FontAwesomeIcon icon={faCheck} /> صحيح
                    </span>
                  ) : (
                    <span className={styless.incorrect}>
                      <FontAwesomeIcon icon={faTimes} /> غير صحيح
                    </span>
                  )}
                </div>
              </Card.Header>

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
                          const optionCorrect = correctIndex === i;
                          return (
                            <li
                              key={i}
                              style={{
                                color: optionCorrect
                                  ? "green"
                                  : isUser
                                  ? "orange"
                                  : "inherit",
                                fontWeight:
                                  optionCorrect || isUser ? "600" : "400",
                              }}
                            >
                              {opt}{" "}
                              {optionCorrect
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
                      <small>
                        هذه الأسئلة المقالية ستراجع من قبل المعلم.
                      </small>
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

export default AnswerReview;
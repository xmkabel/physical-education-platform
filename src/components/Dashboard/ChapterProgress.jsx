import React, { useState } from "react";
import { Card, ProgressBar, Row, Col, Modal, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";

const ChaptersProgress = ({ profileData }) => {
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleChapterClick = (chapterIndex) => {
    setSelectedChapter(chapterIndex);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedChapter(null);
  };

  // عدد الاختبارات فى كل فصل
  const examCountMap = { 1: 8, 2: 2, 3: 5, 4: 3, 5: 1, 6: 3 };

  // بيانات افتراضية للفصول والاختبارات
  const defaultChapters = Object.keys(examCountMap).map((key) => ({
    completed: 0,
    total: examCountMap[key],
    score: 0,
    tests: Array(examCountMap[key])
      .fill(null)
      .map((_, i) => ({
        score: Math.floor(Math.random() * 11), // درجة عشوائية من 0 إلى 10
        fullScore: 10,
      })),
  }));

  const safeProfile = {
    chapters: profileData?.chapters?.length
      ? profileData.chapters
      : defaultChapters,
  };

  const renderTestCard = (idx, test, isPassing, percentage) => (
    <div
      key={idx}
      className="test-result-card"
      style={{
        padding: "10px",
        border: `1px solid ${isPassing ? "#28a745" : "#dc3545"}`,
        borderRadius: "8px",
        marginBottom: "8px",
        backgroundColor: isPassing ? "#f8fff9" : "#fff9f9",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "5px",
        }}
      >
        <span style={{ fontWeight: 600 }}>اختبار {idx + 1}</span>
        <span
          style={{
            backgroundColor: isPassing ? "#28a745" : "#dc3545",
            color: "white",
            padding: "2px 8px",
            borderRadius: "12px",
            fontSize: "0.8em",
          }}
        >
          {isPassing ? "ناجح" : "لم يجتاز"}
        </span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontWeight: 600,
            fontSize: "1.1em",
            color: "#1b3058",
          }}
        >
          {test.score ?? 0} / {test.fullScore ?? 10}
        </span>
        <span
          style={{
            fontWeight: 500,
            color: isPassing ? "#28a745" : "#dc3545",
          }}
        >
          {percentage ?? 0}%
        </span>
      </div>
    </div>
  );

  return (
    <Card className="cardD mb-4">
      <Card.Header className="cardHeader">
        <FontAwesomeIcon icon={faTrophy} className="mx-2" />
        تقدم الفصول
      </Card.Header>
      <Card.Body>
        <Row>
          {[1, 2, 3, 4, 5, 6].map((item) => {
            const chapter = safeProfile.chapters[item - 1];
            const examCount = examCountMap[item] || 0;

            const percent =
              examCount > 0
                ? Math.round((chapter.completed / examCount) * 100)
                : 0;

            return (
              <Col md={6} lg={4} key={item} className="mb-3">
                <div
                  className="chapterCard clickable"
                  onClick={() => handleChapterClick(item)}
                  style={{
                    cursor: "pointer",
                    transition: "transform 0.2s",
                  }}
                >
                  <h6 className="chapterTitle text-center">الفصل {item}</h6>
                  <ProgressBar
                    now={percent}
                    className="smallProgressBar mb-2"
                    variant="primary"
                  />
                  <div className="d-flex justify-content-between small">
                    <span>
                      {chapter.completed}/{examCount} مكتمل
                    </span>
                    <span>{percent}%</span>
                  </div>
                  <div
                    className="chapter-score mt-2 text-center"
                    style={{ color: "#1b3058", fontWeight: 600 }}
                  >
                    الدرجة الكلية: {chapter.score}
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>

        {/* ✅ المودال */}
        <Modal show={showModal} onHide={handleClose} centered size="lg">
          <Modal.Header >
            <Modal.Title>
              تفاصيل اختبارات التقويم {selectedChapter}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedChapter ? (
              (() => {
                const chapter =
                  safeProfile.chapters[selectedChapter - 1] || {
                    tests: [],
                    score: 0,
                  };
                const examCount = examCountMap[selectedChapter] || 0;

                return examCount > 0 ? (
                  Array(examCount)
                    .fill(null)
                    .map((_, idx) => {
                      const test = chapter.tests?.[idx] || {
                        score: null,
                        fullScore: 10,
                      };
                      const isPassing =
                        test.score != null &&
                        test.score >= test.fullScore * 0.6;
                      const percentage =
                        test.score != null
                          ? Math.round((test.score / test.fullScore) * 100)
                          : 0;
                      return renderTestCard(idx, test, isPassing, percentage);
                    })
                ) : (
                  <div className="text-center text-muted">
                    لا يوجد اختبارات لهذا الفصل
                  </div>
                );
              })()
            ) : (
              <div className="text-center text-muted">اختر فصل لعرض التفاصيل</div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              إغلاق
            </Button>
          </Modal.Footer>
        </Modal>
      </Card.Body>
    </Card>
  );
};

export default ChaptersProgress;

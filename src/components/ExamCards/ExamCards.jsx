import { useNavigate } from "react-router-dom";
import "./ExamCards.css";
import { useState, useEffect } from "react";
import Nav from "../Nav/Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faCircle } from "@fortawesome/free-solid-svg-icons";
import get from "../api/get";
import { useExamData } from "../../services/GetExams";
import MyAlert from "../alert/MyAlert";
import LoadingScreen from "../LoadingScreen";
import { isFinalExamAvailable } from "../../services/isFinalExamAvailable";
const ExamCards = () => {
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // first exam data
  const { examData: firstExamData } = useExamData("start");

  // final exam availability state
  const [finalExamAllowed, setFinalExamAllowed] = useState(false);
  const [finalExamChecked, setFinalExamChecked] = useState(false);

  const [firstChapterCount, setFirstChapterCount] = useState(0);
  const [secondChapterCount, setSecondChapterCount] = useState(0);
  const [thirdChapterCount, setThirdChapterCount] = useState(0);
  const [fourthChapterCount, setFourthChapterCount] = useState(0);
  const [fifthChapterCount, setFifthChapterCount] = useState(0);
  const [sixthChapterCount, setSixthChapterCount] = useState(0);
////////////////////////////////////////
 const fetchFirstChapterCount = async ()=>{
    let firstChapterCount= await get('/chapter-exams-count/1 ');
  return firstChapterCount}

  const fetchSecondChapterCount = async ()=>{
    let secondChapterCount= await get('/chapter-exams-count/2 ');
  return secondChapterCount}

  const fetchThirdChapterCount = async ()=>{
    let thirdChapterCount= await get('/chapter-exams-count/3 ');
  return thirdChapterCount}

  const fetchFourthChapterCount = async ()=>{
    let fourthChapterCount= await get('/chapter-exams-count/4 ');
  return fourthChapterCount}

  const fetchFifthChapterCount = async ()=>{
    let fifthChapterCount= await get('/chapter-exams-count/5 ');
  return fifthChapterCount}

  const fetchSixthChapterCount = async ()=>{
    let sixthChapterCount= await get('/chapter-exams-count/6 ');
  return sixthChapterCount}

  useEffect(() => {
    const fetchFirstChapterCountData = async () => {
      const FirstChapterCountData = await fetchFirstChapterCount();
      setFirstChapterCount(FirstChapterCountData.finished_exams);


      console.log("after setting state:", firstChapterCount);
    };
    fetchFirstChapterCountData();

    const fetchSecondChapterCountData = async () => {
      const SecondChapterCountData = await fetchSecondChapterCount();
      setSecondChapterCount(SecondChapterCountData.finished_exams);
      console.log("after setting state:", secondChapterCount);
    };
    fetchSecondChapterCountData();

    const fetchThirdChapterCountData = async () => {
      const ThirdChapterCountData = await fetchThirdChapterCount();
      setThirdChapterCount(ThirdChapterCountData.finished_exams);
      console.log("after setting state:", thirdChapterCount);
    };
    fetchThirdChapterCountData();

    const fetchFourthChapterCountData = async () => {
      const FourthChapterCountData = await fetchFourthChapterCount();
      setFourthChapterCount(FourthChapterCountData.finished_exams);
      console.log("after setting state:", fourthChapterCount);
    };
    fetchFourthChapterCountData();

    const fetchFifthChapterCountData = async () => {
      const FifthChapterCountData = await fetchFifthChapterCount();
      setFifthChapterCount(FifthChapterCountData.finished_exams);
      console.log("after setting state:", fifthChapterCount);
    }

    fetchFifthChapterCountData();

    const fetchSixthChapterCountData = async () => {
      const SixthChapterCountData = await fetchSixthChapterCount();
      setSixthChapterCount(SixthChapterCountData.finished_exams);
      console.log("after setting state:", sixthChapterCount);
    } ;
    fetchSixthChapterCountData();
  }, []);

  // // /////////////////////////////////

  // call API once on mount
  useEffect(() => {
    const checkFinalExam = async () => {
      try {
        const allowed = await isFinalExamAvailable();
        setFinalExamAllowed(allowed);
      } catch (err) {
        console.error("Error checking final exam availability:", err);
        setFinalExamAllowed(false);
      } finally {
        setFinalExamChecked(true);
      }
    };
    checkFinalExam();
  }, []);

  const categoryStats = {
    start: {
      completedCount: firstExamData ? firstExamData[0] : 0,
      totalExams: 1,
    },
    first: { completedCount: firstChapterCount, totalExams: 8 },
    second: { completedCount: secondChapterCount, totalExams: 2 },
    third: { completedCount: thirdChapterCount, totalExams: 5 },
    fourth: { completedCount: fourthChapterCount, totalExams: 3 },
    fifth: { completedCount: fifthChapterCount, totalExams: 1 },
    sixth: { completedCount: sixthChapterCount, totalExams: 3 },
    final: { completedCount: 0, totalExams: 1 },
  };

  const categories = [
    { id: "start", title: "الاختبار القبلي", description: "اختبار بداية الكورس" },
    { id: "first", title: "التقويم الاول", description: "نظريات التعلم ونظريات التدريس" },
    { id: "second", title: "التقويم الثاني", description: "المدخل لطرق وأساليب واستراتيجيات التدريس" },
    { id: "third", title: "التقويم الثالث", description: "مهارات التدريس والتدريس الفعال" },
    { id: "fourth", title: "التقويم الرابع", description: "استراتيجيات وطرق وأساليب التدريس في التربية الرياضية" },
    { id: "fifth", title: "التقويم الخامس", description: "التقويم" },
    { id: "sixth", title: "التقويم السادس", description: "أسئلة عامة" },
    { id: "final", title: "الاختبار البعدى", description: "اختبار نهاية الكورس" },
  ];

  const start = () => {
    setAlert({
      type: "success",
      message: "انت بالفعل أنهيت الاختبار القبلي بنجاح!",
    });
  };

  const showDangerAlert = () => {
    setAlert({
      type: "danger",
      message: "عذراً، الاختبار البعدى غير متاح حالياً.",
    });
  };

  const closeAlert = () => {
    setAlert(null);
  };

  const handleCategoryClick = (categoryId) => {
    if (categoryId === "first") {
      navigate("/exams/first");
    } else if (categoryId === "second") {
      navigate("/exams/second");
    } else if (categoryId === "third") {
      navigate("/exams/third");
    } else if (categoryId === "fourth") {
      navigate("/exams/fourth");
    } else if (categoryId === "fifth") {
      navigate("/exams/fifth");
    } else if (categoryId === "sixth") {
      navigate("/exams/sixth");
    } else if (categoryId === "final") {
      if (!finalExamChecked) {
        // still checking API
        showDangerAlert();
        return;
      }
      if (finalExamAllowed) {
        navigate("/exams/final");
      } else {
        showDangerAlert();
      }
    } else if (categoryId === "start") {
      if (firstExamData && firstExamData[0] === 1) {
        start();
      } else {
        navigate("/exams/start");
      }
    } else {
      setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
    }
  };

  const onCategorySelect = (categoryId) => {
    handleCategoryClick(categoryId);
  };

  const onSetSelectedCategory = (category) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <Nav
        title={
          selectedCategory
            ? categories.find((cat) => cat.id === selectedCategory)?.title ||
              "اختبارات المرحلة"
            : "اختبارات المرحلة"
        }
        selectedCategory={selectedCategory}
        setSelectedCategory={onSetSelectedCategory}
      />
      <div className="exam-cards-container loaded">
        <div className="exam-cards-section">
          {!selectedCategory ? (
            <div className="exam-cards-grid">
              {categories.map((category, index) => {
                const stats = categoryStats[category.id] || {
                  completedCount: 0,
                  totalExams: 0,
                };
                const isFullyCompleted =
                  stats.completedCount === stats.totalExams;

                let cardClass = "exam-card";
                if (category.id === "start") {
                  cardClass += " before-card";
                } else if (category.id === "final") {
                  cardClass += " after-card";
                }
                if (isFullyCompleted) {
                  cardClass += " fully-completed";
                }

                return (
                  <div
                    key={category.id}
                    className={cardClass}
                    onClick={() => onCategorySelect(category.id)}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="card-number">{index + 1}</div>
                    <div className="exam-card-content">
                      <div>
                        <h2 className="exam-card-title">{category.title}</h2>
                        <p className="exam-card-description">
                          {category.description}
                        </p>
                        <div className="exam-completion-status">
                          <FontAwesomeIcon
                            icon={isFullyCompleted ? faCheckCircle : faCircle}
                            className={`exam-completion-indicator ${
                              isFullyCompleted ? "completed" : ""
                            }`}
                          />
                          <span>
                            {stats.completedCount}/{stats.totalExams} مكتمل
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="selected-category-content">
              <h2>
                تفاصيل الفئة:{" "}
                {categories.find((cat) => cat.id === selectedCategory)?.title}
              </h2>
            </div>
          )}
        </div>
      </div>
      {alert && (
        <MyAlert
          type={alert.type}
          message={alert.message}
          onClose={closeAlert}
        />
      )}
    </>
  );
};

export default ExamCards;

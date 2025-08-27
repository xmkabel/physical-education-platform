import { Route } from 'react-router-dom';
import Quiz from '../quizes/Quiz';
import quizData7_1 from '../../data/final/1.json';
import quizData7_2 from '../../data/final/2.json';
import quizData7_3 from '../../data/final/3.json';
import FinalCards from '../ExamCards/FinalCards';

const finalRoutes = [
  <Route key="finals" path="/exams/final/" element={<FinalCards />} />,
  <Route key="final_1" path="/exams/final/1" element={<Quiz quizData={quizData7_2} name={"الاختبار القبلى"} />} />,
  <Route key="final_2" path="/exams/final/2" element={<Quiz quizData={quizData7_1} name={"الاختبار القبلى"} />} />,
  <Route key="final_3" path="/exams/final/3" element={<Quiz quizData={quizData7_3} name={"الاختبار القبلى"} />} />,
];

export default finalRoutes;
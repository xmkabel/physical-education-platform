import { Route } from 'react-router-dom';
import Quiz from '../quizes/Quiz';
import quizData7_1 from '../../data/final/1.json';
import quizData7_2 from '../../data/final/2.json';
import quizData7_3 from '../../data/final/3.json';
import StartCards from '../ExamCards/StartCards';

const StartRoutes = [
  <Route key="finals" path="/exams/start/" element={<StartCards />} />,
  <Route key="final_1" path="/exams/start/1" element={<Quiz quizData={quizData7_2} name={"الاختبار القبلى"} />} />,
  <Route key="final_2" path="/exams/start/2" element={<Quiz quizData={quizData7_1} name={"الاختبار القبلى"} />} />,
  <Route key="final_3" path="/exams/start/3" element={<Quiz quizData={quizData7_3} name={"الاختبار القبلى"} />} />,
];

export default StartRoutes;
import { Route } from 'react-router-dom';
import Quiz from '../quizes/Quiz';
import quizData7_1 from '../../data/final/1.json';
import StartCards from '../ExamCards/StartCards';

const StartRoutes = [
  // <Route key="finals" path="/exams/start/" element={<StartCards />} />,
  <Route key="final_1" path="/exams/start/" element={<Quiz quizData={quizData7_1} quizId={11} name={"الاختبار القبلى"} />} />,
];

export default StartRoutes;
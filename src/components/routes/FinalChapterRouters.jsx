import { Route } from 'react-router-dom';
import Quiz from '../quizes/Quiz';
import quizData7_1 from '../../data/final/1.json';
import quizData7_2 from '../../data/final/2.json';
import quizData7_3 from '../../data/final/3.json';
import FinalCards from '../ExamCards/FinalCards';

const FinalRoutes = [
  // <Route key="finals" path="/exams/final/" element={<FinalCards />} />,
  <Route key="final_1" path="/exams/final/" element={<Quiz quizData={quizData7_1} quizId={81} name={"الاختبار البعدى"} />} />,

];

export default FinalRoutes;
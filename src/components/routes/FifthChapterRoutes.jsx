import { Route } from 'react-router-dom';
import Quiz from '../quizes/Quiz';
import quizData5_1 from '../../data/fifth/1.json';
import FourthCards from '../ExamCards/FourthCards';
import FifthCards from '../ExamCards/FifthCards';

const FifthChapterRoutes = [
  <Route key="fifth-cards" path="/exams/fifth" element={<FifthCards />} />,
  <Route key="fifth-1" path="/exams/fifth/1" element={<Quiz quizData={quizData5_1} name={"التقويم"} />} />,
];

export default FifthChapterRoutes;
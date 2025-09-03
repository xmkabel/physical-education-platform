import { Route } from 'react-router-dom';
import Quiz from '../quizes/Quiz';
import quizData6_1 from '../../data/sixth/1.json';
import quizData6_2 from '../../data/sixth/2.json';
import quizData6_3 from '../../data/sixth/3.json';
import SixthCards from '../ExamCards/SixthCards';

const SixthChapterRoutes = [
  <Route key="sixth-cards" path="/exams/sixth" element={<SixthCards />} />,
  <Route key="sixth-1" path="/exams/sixth/1" element={<Quiz quizData={quizData6_1} quizId={71} name={"أسئلة  عامة "} />} />,
  <Route key="sixth-2" path="/exams/sixth/2" element={<Quiz quizData={quizData6_2} quizId={72} name={"أسئلة  عامة "} />} />,
  <Route key="sixth-3" path="/exams/sixth/3" element={<Quiz quizData={quizData6_3} quizId={73} name={"أسئلة  عامة "} />} />,
];

export default SixthChapterRoutes;
import { Route } from 'react-router-dom';
import Quiz from '../quizes/Quiz';
import quizData4_1 from '../../data/fourth/1.json';
import quizData4_2 from '../../data/fourth/2.json';
import quizData4_3 from '../../data/fourth/3.json';
import QuizWithVideos from '../quizes/QuizWithVideos';
import FourthCards from '../ExamCards/FourthCards';

const FourthChapterRoutes = [
  <Route key="fourth-cards" path="/exams/fourth" element={<FourthCards />} />,
  <Route key="fourth-1" path="/exams/fourth/1" element={<QuizWithVideos quizData={quizData4_1} quizId={51} name={"استراتيجيات وطرق وأساليب التدريس في التربية الرياضية"} />} />,
  <Route key="fourth-2" path="/exams/fourth/2" element={<QuizWithVideos quizData={quizData4_2} quizId={52} name={"استراتيجيات وطرق وأساليب التدريس في التربية الرياضية"} />} />,
  <Route key="fourth-3" path="/exams/fourth/3" element={<QuizWithVideos quizData={quizData4_3} quizId={53} name={"استراتيجيات وطرق وأساليب التدريس في التربية الرياضية"} />} />,
];

export default FourthChapterRoutes;
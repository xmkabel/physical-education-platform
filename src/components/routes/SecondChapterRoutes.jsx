import { Route } from 'react-router-dom';
import Quiz from '../quizes/Quiz';
import SecondCards from '../ExamCards/SecondCards';

import quizData2_1 from '../../data/second/1.json';
import quizData2_2 from '../../data/second/2.json';

const SecondChapterRoutes = [
  <Route key="second-cards" path="/exams/second" element={<SecondCards />} />,
  <Route key="second-1" path="/exams/second/1" element={<Quiz quizData={quizData2_1} name={" المدخل لطرق وأساليب واستراتيجيات التدريس"} />} />,
  <Route key="second-2" path="/exams/second/2" element={<Quiz quizData={quizData2_2} name={" لمدخل لطرق وأساليب واستراتيجيات التدريس"} />} />
];

export default SecondChapterRoutes;
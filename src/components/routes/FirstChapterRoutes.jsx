import { Route } from 'react-router-dom';
import Quiz from '../quizes/Quiz';
import FirstCards from '../ExamCards/FirstCards';

import quizData1_1 from '../../data/first/1.json';
import quizData1_2 from '../../data/first/2.json';
import quizData1_3 from '../../data/first/3.json';
import quizData1_4 from '../../data/first/4.json';
import quizData1_5 from '../../data/first/5.json';
import quizData1_6 from '../../data/first/6.json';
import quizData1_7 from '../../data/first/7.json';
import quizData1_8 from '../../data/first/8.json';

const FirstChapterRoutes = [
  <Route key="first-cards" path="/exams/first" element={<FirstCards />} />,
  <Route key="first-1" path="/exams/first/1" element={<Quiz quizData={quizData1_1} name={"نظريات التعلم ونظريات التدريس"} />} />,
  <Route key="first-2" path="/exams/first/2" element={<Quiz quizData={quizData1_2} name={"نظريات التعلم ونظريات التدريس"} />} />,
  <Route key="first-3" path="/exams/first/3" element={<Quiz quizData={quizData1_3} name={"نظريات التعلم ونظريات التدريس"} />} />,
  <Route key="first-4" path="/exams/first/4" element={<Quiz quizData={quizData1_4} name={"نظريات التعلم ونظريات التدريس"} />} />,
  <Route key="first-5" path="/exams/first/5" element={<Quiz quizData={quizData1_5} name={"نظريات التعلم ونظريات التدريس"} />} />,
  <Route key="first-6" path="/exams/first/6" element={<Quiz quizData={quizData1_6} name={"نظريات التعلم ونظريات التدريس"} />} />,
  <Route key="first-7" path="/exams/first/7" element={<Quiz quizData={quizData1_7} name={"نظريات التعلم ونظريات التدريس"} />} />,
  <Route key="first-8" path="/exams/first/8" element={<Quiz quizData={quizData1_8} name={"نظريات التعلم ونظريات التدريس"} />} />
];

export default FirstChapterRoutes;
import { Route } from 'react-router-dom';
import Quiz from '../quizes/Quiz';
import ThirdCards from '../ExamCards/ThirdCards';

import quizData3_1 from '../../data/third/1.json';
import quizData3_2 from '../../data/third/2.json';
import quizData3_3 from '../../data/third/3.json';
import quizData3_4 from '../../data/third/4.json';
import quizData3_5 from '../../data/third/5.json';

const ThirdChapterRoutes = [
  <Route key="third-cards" path="/exams/third" element={<ThirdCards />} />,
  <Route key="third-1" path="/exams/third/1" element={<Quiz quizData={quizData3_1} name={"مهارات التدريس والتدريس الفعال"} />} />,
  <Route key="third-2" path="/exams/third/2" element={<Quiz quizData={quizData3_2} name={"مهارات التدريس والتدريس الفعال"} />} />,
  <Route key="third-3" path="/exams/third/3" element={<Quiz quizData={quizData3_3} name={"مهارات التدريس والتدريس الفعال"} />} />,
  <Route key="third-4" path="/exams/third/4" element={<Quiz quizData={quizData3_4} name={"مهارات التدريس والتدريس الفعال"} />} />,
  <Route key="third-5" path="/exams/third/5" element={<Quiz quizData={quizData3_5} name={"مهارات التدريس والتدريس الفعال"} />} />
];

export default ThirdChapterRoutes;
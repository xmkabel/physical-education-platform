import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './Nav.css';
import { useLocation } from 'react-router-dom';

const Nav = ({title, selectedCategory, setSelectedCategory}) => {
    const location = useLocation();
    const navigate = useNavigate();
    
    const goBack = () => {
        const currentPath = location.pathname;
        
        if (selectedCategory && setSelectedCategory) {
            setSelectedCategory(null);
            return;
        }
        
        if (currentPath === '/exams') {
            navigate('/');
        } else if (currentPath.startsWith('/exams/')) {
            const pathParts = currentPath.split('/').filter(part => part !== '');
            
            if (pathParts.length === 3) {
                navigate(`/exams/${pathParts[1]}`);
            } else if (pathParts.length === 2) {
                navigate('/exams');
            } else {
                navigate('/exams');
            }
        } else {
            navigate('/');
        }
    };
    
  return (
    <div className="exam-cards-header">
        <button className="back-button" onClick={goBack}>
          <FontAwesomeIcon icon={faArrowLeft} className="back-arrow" /> العودة
        </button>
        <h1 className="exam-cards-title">{title}</h1>
      </div>
  )
}
export default Nav;


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight , faArrowLeft } from '@fortawesome/free-solid-svg-icons';
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
            navigate('/exams');
        }
    };
    
  return (
    <div className="exam-cards-header nav-flex-layout">
      <button
        className="back-button nav-back-btn"
        onClick={goBack}
      >
        <FontAwesomeIcon icon={faArrowRight} className="back-arrow" /> العودة
      </button>
      <div className="nav-title-center">
    <h1 className="exam-cards-title" style={{ margin: 0 }}>{title}</h1>
      </div>
      <button
        className="back-button nav-profile-btn"
        onClick={() => {
          if (role === 'admin') navigate('/admin-dashboard');
          else navigate('/dashboard');
        }}
      >
        {role === 'admin' ? 'لوحة التحكم' : 'الملف الشخصي'} <FontAwesomeIcon icon={faArrowLeft} className="back-arrow" />
      </button>
    </div>
  )
}
export default Nav;


import React, { useState } from 'react';
import Alert from './MyAlert';

const AlertDemo = () => {
  const [alert, setAlert] = useState(null);

  const showSuccessAlert = () => {
    setAlert({
      type: 'success',
      message: 'تمت العملية بنجاح! تم حفظ البيانات بشكل صحيح.'
    });
  };

  const showDangerAlert = () => {
    setAlert({
      type: 'danger',
      message: 'حدث خطأ! يرجى التحقق من البيانات وإعادة المحاولة.'
    });
  };

  const closeAlert = () => {
    setAlert(null);
  };

  return (
    <div style={{ 
      padding: '2rem', 
      direction: 'rtl',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
    }}>
      <h2 style={{ 
        color: '#1b3058',
        marginBottom: '2rem',
        fontSize: '2rem'
      }}>
        معاينة تنبيهات النظام
      </h2>
      <div style={{ 
        margin: '1rem 0',
        display: 'flex',
        gap: '1rem',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        <button 
          onClick={showSuccessAlert}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '600',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
        >
          إظهار تنبيه ناجح
        </button>
        <button 
          onClick={showDangerAlert}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '600',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
        >
          إظهار تنبيه خطير
        </button>
      </div>

      {alert && (
        <Alert 
          type={alert.type} 
          message={alert.message} 
          onClose={closeAlert}
        />
      )}
    </div>
  );
};

export default AlertDemo;
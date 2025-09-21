import studentsData from '../data/students.json';

export const getStudents = () => {
  return studentsData.students;
};

export const getStudentStats = () => {
  const students = getStudents();
  return {
    totalStudents: students.length,
    completedPreTest: students.filter(s => s.preTest > 0).length,
    completedPostTest: students.filter(s => s.postTest > 0).length,
    completedBoth: students.filter(s => s.preTest > 0 && s.postTest > 0).length,
    averageImprovement: calculateAverageImprovement(students)
  };
};

export const calculateAverageImprovement = (students) => {
  const studentsWithBothTests = students.filter(s => s.preTest > 0 && s.postTest > 0);
  if (studentsWithBothTests.length === 0) return 0;

  const totalImprovement = studentsWithBothTests.reduce((sum, student) => {
    return sum + (student.postTest - student.preTest);
  }, 0);

  return totalImprovement / studentsWithBothTests.length;
};

export const updateStudent = (studentId, updates) => {
  const students = getStudents();
  const studentIndex = students.findIndex(s => s.id === studentId);
  
  if (studentIndex === -1) return false;

  students[studentIndex] = {
    ...students[studentIndex],
    ...updates,
    lastActive: new Date().toISOString()
  };

  // In a real application, you would save this back to the database
  // For now, we'll just return the updated student
  return students[studentIndex];
};

export const deleteStudent = (studentId) => {
  const students = getStudents();
  const filteredStudents = students.filter(s => s.id !== studentId);
  
  // In a real application, you would save this back to the database
  // For now, we'll just return true to indicate success
  return true;
};

export const updatePassword = (studentId, newPassword) => {
  const students = getStudents();
  const student = students.find(s => s.id === studentId);
  
  if (!student) return false;

  // In a real application, you would hash the password and save to database
  student.password = newPassword;
  return true;
};

// Helper function to format dates in Arabic
export const formatDate = (dateString) => {
  if (!dateString) return '-';
  return new Date(dateString).toLocaleDateString('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

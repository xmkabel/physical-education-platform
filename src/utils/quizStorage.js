// Utility functions for saving and loading quiz answers

/**
 * Save quiz answers to localStorage
 * @param {string} quizId - Unique identifier for the quiz
 * @param {Object} answers - Object containing question IDs and their answers
 * @param {Array} quizContent - The quiz content array
 */
export const saveQuizAnswers = (quizId, answers, quizContent) => {
  try {
    const quizData = {
      answers,
      quizContent,
      timestamp: new Date().toISOString(),
      lastSaved: new Date().toISOString()
    };
    
    localStorage.setItem(`quiz_${quizId}`, JSON.stringify(quizData));
    console.log(`Quiz answers saved for quiz: ${quizId}`);
  } catch (error) {
    console.error('Error saving quiz answers:', error);
  }
};

/**
 * Load quiz answers from localStorage
 * @param {string} quizId - Unique identifier for the quiz
 * @returns {Object|null} - The saved quiz data or null if not found
 */
export const loadQuizAnswers = (quizId) => {
  try {
    const savedData = localStorage.getItem(`quiz_${quizId}`);
    if (savedData) {
      const quizData = JSON.parse(savedData);
      console.log(`Quiz answers loaded for quiz: ${quizId}`);
      return quizData;
    }
    return null;
  } catch (error) {
    console.error('Error loading quiz answers:', error);
    return null;
  }
};

/**
 * Update quiz answers (for auto-save functionality)
 * @param {string} quizId - Unique identifier for the quiz
 * @param {Object} answers - Updated answers object
 * @param {Array} quizContent - The quiz content array
 */
export const updateQuizAnswers = (quizId, answers, quizContent) => {
  try {
    const existingData = loadQuizAnswers(quizId);
    const quizData = {
      answers,
      quizContent,
      timestamp: existingData?.timestamp || new Date().toISOString(),
      lastSaved: new Date().toISOString()
    };
    
    localStorage.setItem(`quiz_${quizId}`, JSON.stringify(quizData));
  } catch (error) {
    console.error('Error updating quiz answers:', error);
  }
};

/**
 * Clear quiz answers from localStorage
 * @param {string} quizId - Unique identifier for the quiz
 */
export const clearQuizAnswers = (quizId) => {
  try {
    localStorage.removeItem(`quiz_${quizId}`);
    console.log(`Quiz answers cleared for quiz: ${quizId}`);
  } catch (error) {
    console.error('Error clearing quiz answers:', error);
  }
};

/**
 * Get all saved quiz IDs
 * @returns {Array} - Array of quiz IDs that have saved data
 */
export const getSavedQuizIds = () => {
  try {
    const keys = Object.keys(localStorage);
    return keys
      .filter(key => key.startsWith('quiz_'))
      .map(key => key.replace('quiz_', ''));
  } catch (error) {
    console.error('Error getting saved quiz IDs:', error);
    return [];
  }
};

/**
 * Check if quiz has saved answers
 * @param {string} quizId - Unique identifier for the quiz
 * @returns {boolean} - True if quiz has saved answers
 */
export const hasSavedAnswers = (quizId) => {
  return localStorage.getItem(`quiz_${quizId}`) !== null;
};

/**
 * Get quiz save timestamp
 * @param {string} quizId - Unique identifier for the quiz
 * @returns {string|null} - ISO timestamp of when quiz was saved
 */
export const getQuizSaveTime = (quizId) => {
  try {
    const savedData = localStorage.getItem(`quiz_${quizId}`);
    if (savedData) {
      const quizData = JSON.parse(savedData);
      return quizData.lastSaved;
    }
    return null;
  } catch (error) {
    console.error('Error getting quiz save time:', error);
    return null;
  }
};

// ניהול מצב תצוגה - כהה/בהיר
import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

// הגדרת הטיפוס של ערכת הנושא
type Theme = 'light' | 'dark';

// הגדרת הטיפוס של ה-Context
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// יצירת Context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Provider component שעוטף את האפליקציה
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // קריאת ערכת נושא שמורה מ-localStorage, ברירת מחדל: light
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme');
    return (savedTheme as Theme) || 'light';
  });

  // פונקציה להחלפת ערכת הנושא
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // כל פעם שהנושא משתנה, נשמור ב-localStorage ונעדכן את ה-class ב-body
  useEffect(() => {
    localStorage.setItem('theme', theme);
    // הוספת class לגוף המסמך לשינוי העיצוב
    document.body.className = theme;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook מותאם לשימוש ב-context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

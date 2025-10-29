import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CalculatorPage } from '@/pages/CalculatorPage';

export const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/calculator" replace />} />
                <Route path="/calculator" element={<CalculatorPage />} />
            </Routes>
        </Router>
    );
};

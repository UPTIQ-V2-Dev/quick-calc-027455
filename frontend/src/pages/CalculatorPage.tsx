import { Display } from '@/components/calculator/Display';
import { ButtonGrid } from '@/components/calculator/ButtonGrid';
import { useCalculator } from '@/hooks/useCalculator';

export const CalculatorPage = () => {
  const { display, hasError, handleButtonClick } = useCalculator();

  return (
    <div className="min-h-screen bg-background p-4 flex items-center justify-center">
      <div className="w-full max-w-sm mx-auto">
        <div className="bg-card border rounded-2xl shadow-lg p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-center text-foreground mb-2">
              Calculator
            </h1>
            <p className="text-sm text-muted-foreground text-center">
              Simple Calculator App
            </p>
          </div>
          
          <Display value={display} hasError={hasError} />
          
          <ButtonGrid onButtonClick={handleButtonClick} />
        </div>
      </div>
    </div>
  );
};
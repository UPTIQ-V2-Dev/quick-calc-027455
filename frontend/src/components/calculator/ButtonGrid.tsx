import { CalculatorButton } from './CalculatorButton';
import { ButtonType, CalculatorButton as CalculatorButtonType } from '@/types/calculator';

interface ButtonGridProps {
  onButtonClick: (value: string, type: ButtonType) => void;
  disabled?: boolean;
}

const calculatorButtons: CalculatorButtonType[] = [
  { id: 'clear', label: 'C', value: 'clear', type: ButtonType.CLEAR },
  { id: 'plus-minus', label: '±', value: '±', type: ButtonType.OPERATION },
  { id: 'percent', label: '%', value: '%', type: ButtonType.OPERATION },
  { id: 'divide', label: '÷', value: '÷', type: ButtonType.OPERATION },
  
  { id: '7', label: '7', value: '7', type: ButtonType.NUMBER },
  { id: '8', label: '8', value: '8', type: ButtonType.NUMBER },
  { id: '9', label: '9', value: '9', type: ButtonType.NUMBER },
  { id: 'multiply', label: '×', value: '×', type: ButtonType.OPERATION },
  
  { id: '4', label: '4', value: '4', type: ButtonType.NUMBER },
  { id: '5', label: '5', value: '5', type: ButtonType.NUMBER },
  { id: '6', label: '6', value: '6', type: ButtonType.NUMBER },
  { id: 'subtract', label: '-', value: '-', type: ButtonType.OPERATION },
  
  { id: '1', label: '1', value: '1', type: ButtonType.NUMBER },
  { id: '2', label: '2', value: '2', type: ButtonType.NUMBER },
  { id: '3', label: '3', value: '3', type: ButtonType.NUMBER },
  { id: 'add', label: '+', value: '+', type: ButtonType.OPERATION },
  
  { id: '0', label: '0', value: '0', type: ButtonType.NUMBER },
  { id: 'decimal', label: '.', value: '.', type: ButtonType.DECIMAL },
  { id: 'equals', label: '=', value: '=', type: ButtonType.EQUALS },
];

export const ButtonGrid = ({ onButtonClick, disabled = false }: ButtonGridProps) => {
  return (
    <div className="grid grid-cols-4 gap-3">
      {calculatorButtons.map((button) => {
        // Make the 0 button span 2 columns  
        const isZero = button.value === '0';
        
        let className = '';
        if (isZero) {
          className = 'col-span-2';
        }

        return (
          <CalculatorButton
            key={button.id}
            label={button.label}
            value={button.value}
            type={button.type}
            onClick={onButtonClick}
            className={className}
            disabled={disabled}
          />
        );
      })}
    </div>
  );
};
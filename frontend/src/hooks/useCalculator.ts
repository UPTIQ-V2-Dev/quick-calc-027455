import { useState, useCallback } from 'react';
import { CalculatorState, Operation, ButtonType } from '@/types/calculator';
import { performCalculation, parseDisplayValue } from '@/utils/calculator';

const initialState: CalculatorState = {
  display: '0',
  previousValue: null,
  operation: null,
  waitingForNewValue: false,
  hasError: false,
};

export const useCalculator = () => {
  const [state, setState] = useState<CalculatorState>(initialState);

  const reset = useCallback(() => {
    setState(initialState);
  }, []);

  const handleNumber = useCallback((number: string) => {
    setState((prev) => {
      if (prev.hasError) {
        return {
          ...initialState,
          display: number,
        };
      }

      if (prev.waitingForNewValue) {
        return {
          ...prev,
          display: number,
          waitingForNewValue: false,
        };
      }

      const newDisplay = prev.display === '0' ? number : prev.display + number;
      
      // Limit display length to prevent overflow
      if (newDisplay.length > 12) {
        return prev;
      }

      return {
        ...prev,
        display: newDisplay,
      };
    });
  }, []);

  const handleDecimal = useCallback(() => {
    setState((prev) => {
      if (prev.hasError) {
        return {
          ...initialState,
          display: '0.',
        };
      }

      if (prev.waitingForNewValue) {
        return {
          ...prev,
          display: '0.',
          waitingForNewValue: false,
        };
      }

      if (prev.display.includes('.')) {
        return prev;
      }

      return {
        ...prev,
        display: prev.display + '.',
      };
    });
  }, []);

  const handleOperation = useCallback((operation: Operation) => {
    setState((prev) => {
      if (prev.hasError) {
        return {
          ...initialState,
          previousValue: 0,
          operation,
          waitingForNewValue: true,
        };
      }

      const currentValue = parseDisplayValue(prev.display);

      if (prev.previousValue === null) {
        return {
          ...prev,
          previousValue: currentValue,
          operation,
          waitingForNewValue: true,
        };
      }

      if (prev.operation && !prev.waitingForNewValue) {
        const result = performCalculation(prev.previousValue, currentValue, prev.operation);
        
        if (result.hasError) {
          return {
            ...prev,
            hasError: true,
            display: '0',
          };
        }

        return {
          ...prev,
          display: result.result.toString(),
          previousValue: result.result,
          operation,
          waitingForNewValue: true,
        };
      }

      return {
        ...prev,
        operation,
        waitingForNewValue: true,
      };
    });
  }, []);

  const handleEquals = useCallback(() => {
    setState((prev) => {
      if (prev.hasError || prev.previousValue === null || prev.operation === null) {
        return prev;
      }

      const currentValue = parseDisplayValue(prev.display);
      const result = performCalculation(prev.previousValue, currentValue, prev.operation);

      if (result.hasError) {
        return {
          ...prev,
          hasError: true,
          display: '0',
        };
      }

      return {
        ...prev,
        display: result.result.toString(),
        previousValue: null,
        operation: null,
        waitingForNewValue: true,
      };
    });
  }, []);

  const handleSpecialOperation = useCallback((op: string) => {
    setState((prev) => {
      if (prev.hasError) {
        return prev;
      }

      const currentValue = parseDisplayValue(prev.display);

      switch (op) {
        case '±':
          return {
            ...prev,
            display: (currentValue * -1).toString(),
          };
        case '%':
          return {
            ...prev,
            display: (currentValue / 100).toString(),
          };
        default:
          return prev;
      }
    });
  }, []);

  const handleButtonClick = useCallback((value: string, type: ButtonType) => {
    switch (type) {
      case ButtonType.NUMBER:
        handleNumber(value);
        break;
      case ButtonType.DECIMAL:
        handleDecimal();
        break;
      case ButtonType.OPERATION:
        if (value === '±' || value === '%') {
          handleSpecialOperation(value);
        } else {
          handleOperation(value as Operation);
        }
        break;
      case ButtonType.EQUALS:
        handleEquals();
        break;
      case ButtonType.CLEAR:
        reset();
        break;
    }
  }, [handleNumber, handleDecimal, handleOperation, handleEquals, handleSpecialOperation, reset]);

  return {
    display: state.display,
    hasError: state.hasError,
    handleButtonClick,
    reset,
  };
};
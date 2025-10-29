import { Operation, CalculationResult } from '@/types/calculator';

export const performCalculation = (
  previousValue: number,
  currentValue: number,
  operation: Operation
): CalculationResult => {
  let result: number;
  let hasError = false;
  let errorMessage: string | undefined;

  try {
    switch (operation) {
      case Operation.ADD:
        result = previousValue + currentValue;
        break;
      case Operation.SUBTRACT:
        result = previousValue - currentValue;
        break;
      case Operation.MULTIPLY:
        result = previousValue * currentValue;
        break;
      case Operation.DIVIDE:
        if (currentValue === 0) {
          hasError = true;
          errorMessage = 'Cannot divide by zero';
          result = 0;
        } else {
          result = previousValue / currentValue;
        }
        break;
      default:
        hasError = true;
        errorMessage = 'Invalid operation';
        result = 0;
    }

    // Check for invalid results
    if (!isFinite(result) || isNaN(result)) {
      hasError = true;
      errorMessage = 'Invalid result';
      result = 0;
    }
  } catch (error) {
    hasError = true;
    errorMessage = 'Calculation error';
    result = 0;
  }

  return {
    result,
    hasError,
    errorMessage,
  };
};

export const isValidNumber = (value: string): boolean => {
  return !isNaN(parseFloat(value)) && isFinite(parseFloat(value));
};

export const parseDisplayValue = (display: string): number => {
  const parsed = parseFloat(display);
  return isNaN(parsed) ? 0 : parsed;
};
export enum Operation {
  ADD = '+',
  SUBTRACT = '-',
  MULTIPLY = '×',
  DIVIDE = '÷',
}

export enum ButtonType {
  NUMBER = 'number',
  OPERATION = 'operation',
  EQUALS = 'equals',
  CLEAR = 'clear',
  DECIMAL = 'decimal',
}

export interface CalculatorState {
  display: string;
  previousValue: number | null;
  operation: Operation | null;
  waitingForNewValue: boolean;
  hasError: boolean;
}

export interface CalculatorButton {
  id: string;
  label: string;
  value: string;
  type: ButtonType;
  gridPosition?: string;
}

export interface CalculationResult {
  result: number;
  hasError: boolean;
  errorMessage?: string;
}
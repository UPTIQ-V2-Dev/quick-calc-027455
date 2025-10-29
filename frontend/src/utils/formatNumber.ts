export const formatDisplayNumber = (value: string | number): string => {
  if (typeof value === 'string') {
    // If it's already a string, return as is for input state
    return value;
  }

  // Convert number to string and handle special cases
  if (!isFinite(value) || isNaN(value)) {
    return 'Error';
  }

  // Handle very large or very small numbers with scientific notation
  if (Math.abs(value) >= 1e15 || (Math.abs(value) < 1e-6 && value !== 0)) {
    return value.toExponential(6);
  }

  // Format with appropriate decimal places
  const formatted = value.toString();
  
  // Limit decimal places to prevent display overflow
  if (formatted.includes('.') && formatted.split('.')[1].length > 8) {
    return parseFloat(value.toFixed(8)).toString();
  }

  return formatted;
};

export const truncateDisplay = (display: string, maxLength: number = 12): string => {
  if (display.length <= maxLength) {
    return display;
  }

  // If it's a number, try to convert to scientific notation
  const numValue = parseFloat(display);
  if (!isNaN(numValue)) {
    return numValue.toExponential(3);
  }

  // Otherwise truncate the string
  return display.substring(0, maxLength - 3) + '...';
};
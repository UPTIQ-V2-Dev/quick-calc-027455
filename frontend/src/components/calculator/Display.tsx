import { formatDisplayNumber, truncateDisplay } from '@/utils/formatNumber';

interface DisplayProps {
  value: string;
  hasError: boolean;
}

export const Display = ({ value, hasError }: DisplayProps) => {
  const displayValue = hasError ? 'Error' : truncateDisplay(formatDisplayNumber(value));

  return (
    <div className="w-full bg-background border rounded-lg p-6 mb-4">
      <div className="text-right">
        <div 
          className={`text-4xl md:text-5xl font-mono font-light tracking-wider min-h-[3rem] flex items-center justify-end ${
            hasError ? 'text-destructive' : 'text-foreground'
          }`}
          data-testid="calculator-display"
        >
          {displayValue}
        </div>
      </div>
    </div>
  );
};
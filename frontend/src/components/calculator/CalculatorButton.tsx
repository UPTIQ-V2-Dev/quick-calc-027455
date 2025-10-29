import { Button } from '@/components/ui/button';
import { ButtonType } from '@/types/calculator';
import { cn } from '@/lib/utils';

interface CalculatorButtonProps {
  label: string;
  value: string;
  type: ButtonType;
  onClick: (value: string, type: ButtonType) => void;
  className?: string;
  disabled?: boolean;
}

export const CalculatorButton = ({ 
  label, 
  value, 
  type, 
  onClick, 
  className,
  disabled = false 
}: CalculatorButtonProps) => {
  const getButtonVariant = () => {
    switch (type) {
      case ButtonType.OPERATION:
      case ButtonType.EQUALS:
        return 'default';
      case ButtonType.CLEAR:
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const getButtonStyles = () => {
    const baseStyles = 'h-16 text-lg font-semibold transition-all duration-150 active:scale-95';
    
    switch (type) {
      case ButtonType.OPERATION:
        return cn(baseStyles, 'bg-primary text-primary-foreground hover:bg-primary/90');
      case ButtonType.EQUALS:
        return cn(baseStyles, 'bg-primary text-primary-foreground hover:bg-primary/90 font-bold');
      case ButtonType.CLEAR:
        return cn(baseStyles, 'bg-destructive text-destructive-foreground hover:bg-destructive/90');
      case ButtonType.NUMBER:
        return cn(baseStyles, 'bg-secondary text-secondary-foreground hover:bg-secondary/80');
      case ButtonType.DECIMAL:
        return cn(baseStyles, 'bg-secondary text-secondary-foreground hover:bg-secondary/80');
      default:
        return baseStyles;
    }
  };

  return (
    <Button
      variant={getButtonVariant()}
      className={cn(getButtonStyles(), className)}
      onClick={() => onClick(value, type)}
      disabled={disabled}
      data-testid={`calculator-button-${value}`}
    >
      {label}
    </Button>
  );
};
"use client";
import { useState, useEffect } from 'react';
import { Calculator, Backspace, Divide, Minus, Plus, X, Equal } from 'lucide-react';

export default function CalculatorPage() {
  const [displayValue, setDisplayValue] = useState<string>('0');
  const [firstOperand, setFirstOperand] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState<boolean>(false);

  const inputDigit = (digit: string) => {
    if (waitingForSecondOperand) {
      setDisplayValue(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? digit : displayValue + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplayValue('0.');
      setWaitingForSecondOperand(false);
      return;
    }

    if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
    }
  };

  const clearDisplay = () => {
    setDisplayValue('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const handleOperator = (nextOperator: string) => {
    const inputValue = parseFloat(displayValue);

    if (firstOperand === null) {
      setFirstOperand(displayValue);
    } else if (operator) {
      const result = performCalculation();
      setDisplayValue(String(result));
      setFirstOperand(String(result));
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const performCalculation = (): number => {
    const first = parseFloat(firstOperand || '0');
    const second = parseFloat(displayValue);
    let result = 0;

    switch (operator) {
      case '+':
        result = first + second;
        break;
      case '-':
        result = first - second;
        break;
      case '*':
        result = first * second;
        break;
      case '/':
        result = first / second;
        break;
      default:
        result = second;
    }

    return result;
  };

  const calculateResult = () => {
    if (firstOperand && operator && !waitingForSecondOperand) {
      const result = performCalculation();
      setDisplayValue(String(result));
      setFirstOperand(null);
      setOperator(null);
      setWaitingForSecondOperand(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (/^[0-9]$/.test(event.key)) {
      inputDigit(event.key);
    } else if (event.key === '.') {
      inputDecimal();
    } else if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
      handleOperator(event.key);
    } else if (event.key === 'Enter' || event.key === '=') {
      calculateResult();
    } else if (event.key === 'Escape') {
      clearDisplay();
    } else if (event.key === 'Backspace') {
      setDisplayValue(displayValue.length > 1 ? displayValue.slice(0, -1) : '0');
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [displayValue, firstOperand, operator, waitingForSecondOperand]);

  const buttons = [
    { label: '7', value: '7', type: 'digit' },
    { label: '8', value: '8', type: 'digit' },
    { label: '9', value: '9', type: 'digit' },
    { label: '/', value: '/', type: 'operator', icon: <Divide className="h-4 w-4" /> },
    { label: '4', value: '4', type: 'digit' },
    { label: '5', value: '5', type: 'digit' },
    { label: '6', value: '6', type: 'digit' },
    { label: '*', value: '*', type: 'operator', icon: <X className="h-4 w-4" /> },
    { label: '1', value: '1', type: 'digit' },
    { label: '2', value: '2', type: 'digit' },
    { label: '3', value: '3', type: 'digit' },
    { label: '-', value: '-', type: 'operator', icon: <Minus className="h-4 w-4" /> },
    { label: '0', value: '0', type: 'digit', colSpan: 2 },
    { label: '.', value: '.', type: 'decimal' },
    { label: '+', value: '+', type: 'operator', icon: <Plus className="h-4 w-4" /> },
    { label: '=', value: '=', type: 'equals', icon: <Equal className="h-4 w-4" /> },
    { label: 'C', value: 'C', type: 'clear' },
    { label: '⌫', value: '⌫', type: 'backspace', icon: <Backspace className="h-4 w-4" /> },
  ];

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 mb-4">
            <Calculator className="h-8 w-8 text-primary-600" />
          </div>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">MiniCalc</h1>
          <p className="max-w-[700px] text-gray-500 md:text-xl">
            Simple and efficient calculator for everyday use
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="h-20 flex items-center justify-end mb-6 px-4 rounded-lg bg-gray-100 overflow-hidden">
            <div className="text-4xl font-medium text-gray-800 truncate">
              {displayValue}
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {buttons.map((button, index) => (
              <button
                key={index}
                className={`flex items-center justify-center p-4 rounded-lg text-xl font-medium transition-colors
                  ${button.type === 'digit' ? 'bg-gray-100 hover:bg-gray-200' : ''}
                  ${button.type === 'operator' ? 'bg-primary-100 hover:bg-primary-200 text-primary-600' : ''}
                  ${button.type === 'equals' ? 'bg-primary-500 hover:bg-primary-600 text-white' : ''}
                  ${button.type === 'clear' ? 'bg-red-100 hover:bg-red-200 text-red-600' : ''}
                  ${button.type === 'backspace' ? 'bg-yellow-100 hover:bg-yellow-200 text-yellow-600' : ''}
                  ${button.colSpan ? 'col-span-2' : ''}
                `}
                onClick={() => {
                  switch (button.type) {
                    case 'digit':
                      inputDigit(button.value);
                      break;
                    case 'decimal':
                      inputDecimal();
                      break;
                    case 'operator':
                      handleOperator(button.value);
                      break;
                    case 'equals':
                      calculateResult();
                      break;
                    case 'clear':
                      clearDisplay();
                      break;
                    case 'backspace':
                      setDisplayValue(displayValue.length > 1 ? displayValue.slice(0, -1) : '0');
                      break;
                  }
                }}
              >
                {button.icon ? button.icon : button.label}
              </button>
            ))}
          </div>
        </div>

        <div className="text-center text-sm text-gray-500 mt-6">
          <p>Use your keyboard for faster input</p>
          <p className="mt-1">Press Esc to clear, Enter to calculate</p>
        </div>
      </div>
    </div>
  );
}
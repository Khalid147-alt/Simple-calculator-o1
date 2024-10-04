import { useState } from 'react';

function Calculator() {
  const [displayValue, setDisplayValue] = useState('0');
  const [operator, setOperator] = useState<null | '+' | '-' | '*' | '/'>(null);
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [currency, setCurrency] = useState('USD');

  const handleNumberClick = (number: string) => {
    if (displayValue === '0') {
      setDisplayValue(number);
    } else {
      setDisplayValue(displayValue + number);
    }
  };

  const handleOperatorClick = (op: '+' | '-' | '*' | '/') => {
    setOperator(op);
    setFirstOperand(parseFloat(displayValue));
    setDisplayValue('0');
  };

  const handleEqualsClick = () => {
    const secondOperand = parseFloat(displayValue);
    let result: number | string;
    switch (operator) {
      case '+':
        result = firstOperand! + secondOperand;
        break;
      case '-':
        result = firstOperand! - secondOperand;
        break;
      case '*':
        result = firstOperand! * secondOperand;
        break;
      case '/':
        if (secondOperand === 0) {
          setDisplayValue('Error');
          return;
        }
        result = firstOperand! / secondOperand;
        break;
      default:
        result = displayValue;
    }
    setDisplayValue(result.toString());
  };

  const handleClearClick = () => {
    setDisplayValue('0');
    setOperator(null);
    setFirstOperand(null);
  };

  const handleCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(event.target.value);
  };

  const formatCurrency = (value: number) => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    });
    return formatter.format(value);
  };

  return (
    <div className="calculator" style={{ backgroundColor: '#111', color: '#0f0' }}>
      <div className="display" style={{ backgroundColor: '#f00', color: '#800080' }}>
        {formatCurrency(parseFloat(displayValue))}
      </div>
      <div className="buttons">
        <button onClick={() => handleNumberClick('7')}>7</button>
        <button onClick={() => handleNumberClick('8')}>8</button>
        <button onClick={() => handleNumberClick('9')}>9</button>
        <button onClick={() => handleOperatorClick('+')}>+</button>
        <br />
        <button onClick={() => handleNumberClick('4')}>4</button>
        <button onClick={() => handleNumberClick('5')}>5</button>
        <button onClick={() => handleNumberClick('6')}>6</button>
        <button onClick={() => handleOperatorClick('-')}>-</button>
        <br />
        <button onClick={() => handleNumberClick('1')}>1</button>
        <button onClick={() => handleNumberClick('2')}>2</button>
        <button onClick={() => handleNumberClick('3')}>3</button>
        <button onClick={() => handleOperatorClick('*')}>*</button>
        <br />
        <button onClick={() => handleNumberClick('0')}>0</button>
        <button onClick={() => handleNumberClick('.')}>.</button>
        <button onClick={handleEqualsClick}>=</button>
        <button onClick={() => handleOperatorClick('/')}>/</button>
        <br />
        <button onClick={handleClearClick}>C</button>
        <select value={currency} onChange={handleCurrencyChange}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="JPY">JPY</option>
        </select>
      </div>
    </div>
  );
}

export default Calculator;

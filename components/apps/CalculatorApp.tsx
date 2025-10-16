
import React, { useState } from 'react';

const buttonClasses = "bg-gray-700 border border-cyan-500 text-cyan-300 text-2xl hover:bg-cyan-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-300 transition-all duration-150 shadow-[0_0_5px_#0ff]";
const operatorButtonClasses = "bg-purple-700 border border-fuchsia-500 text-fuchsia-300 text-2xl hover:bg-fuchsia-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-300 transition-all duration-150 shadow-[0_0_5px_#f0f]";

export const CalculatorApp: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');

  const handleNumberClick = (num: string) => {
    if (display === '0' || display === 'Error') {
      setDisplay(num);
    } else {
      setDisplay(display + num);
    }
  };

  const handleOperatorClick = (op: string) => {
    setExpression(display + op);
    setDisplay('0');
  };

  const handleEquals = () => {
    const fullExpression = expression + display;
    try {
      // Using eval is generally unsafe, but acceptable for this contained calculator simulation.
      const result = eval(fullExpression.replace(/x/g, '*'));
      setDisplay(String(result));
      setExpression('');
    } catch (error) {
      setDisplay('Error');
      setExpression('');
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setExpression('');
  };
  
  const handleDecimal = () => {
    if (!display.includes('.')) {
        setDisplay(display + '.');
    }
  };

  return (
    <div className="w-full h-full bg-black bg-opacity-70 p-2 flex flex-col">
      <div className="bg-gray-900 text-right p-4 mb-2 border-2 border-cyan-400 text-4xl text-green-300 shadow-inner shadow-cyan-500/50">
        {display}
      </div>
      <div className="grid grid-cols-4 gap-2 flex-grow">
        <button onClick={handleClear} className={`${operatorButtonClasses} col-span-2`}>C</button>
        <button onClick={() => handleOperatorClick('/')} className={operatorButtonClasses}>/</button>
        <button onClick={() => handleOperatorClick('*')} className={operatorButtonClasses}>x</button>

        <button onClick={() => handleNumberClick('7')} className={buttonClasses}>7</button>
        <button onClick={() => handleNumberClick('8')} className={buttonClasses}>8</button>
        <button onClick={() => handleNumberClick('9')} className={buttonClasses}>9</button>
        <button onClick={() => handleOperatorClick('-')} className={operatorButtonClasses}>-</button>

        <button onClick={() => handleNumberClick('4')} className={buttonClasses}>4</button>
        <button onClick={() => handleNumberClick('5')} className={buttonClasses}>5</button>
        <button onClick={() => handleNumberClick('6')} className={buttonClasses}>6</button>
        <button onClick={() => handleOperatorClick('+')} className={operatorButtonClasses}>+</button>

        <button onClick={() => handleNumberClick('1')} className={buttonClasses}>1</button>
        <button onClick={() => handleNumberClick('2')} className={buttonClasses}>2</button>
        <button onClick={() => handleNumberClick('3')} className={buttonClasses}>3</button>
        <button onClick={handleEquals} className={`${operatorButtonClasses} row-span-2`}>=</button>

        <button onClick={() => handleNumberClick('0')} className={`${buttonClasses} col-span-2`}>0</button>
        <button onClick={handleDecimal} className={buttonClasses}>.</button>
      </div>
    </div>
  );
};

import { useEffect, useState } from "react";
import "./Calculator.css";


const Calculator = () => {
  const [currentValue, setCurrentValue] = useState<string>("0");
  const [previous, setPrevious] = useState<string>("");
const [isGlowing, setIsGlowing] = useState<boolean>(false);
  /**
   * The current operation symbol (+, -, *, /) or null if none.
   */
  const [operation, setOperation] = useState<string | null>(null);

  function chooseOperation(op: string | null) {
    if (currentValue === "") return;

    if (previous !== "") {
      calculate();
    } else {
      setPrevious(currentValue);
    }
    setOperation(op);
    setCurrentValue(op || "");
  }

  /**
   * Calculates the result of the current operation and updates the current input value.
   * If the previous or current input values are not valid numbers, or the operation is null, does nothing.
   */
  function calculate() {
    const num1 = parseFloat(previous);
    const num2 = parseFloat(currentValue);
  
    if(isNaN(num1) || isNaN(num2) || !operation) return;

    let result: number;
    switch (operation) {
        case "+":
            result = num1 + num2;
            break;
        case "-":
            result = num1 - num2;
            break;
        case "*":
            result = num1 * num2;
            break;
        case "/":
            if(num2 === 0) {
                setCurrentValue(num1.toString());
                return
            }else{
            result = num1 / num2;
        }
            break;
        default:
            return;
    }
    // Updating display:
    setCurrentValue(result.toString());
    setOperation(null);
    setPrevious("");
}
  /**
   * Appends a number to the current input value and updates the currentValue.
   * @param num - The number to append.
   */
// Append
function appendNumber(num: string) {
    // If the display is showing an operator, replace it with the new number.
    if (["+", "-", "*", "/"].includes(currentValue)) {
      setCurrentValue(num);
    } else {
        // Avoid multiple decimals
      if (num === "." && currentValue.includes(".")) return;
      setCurrentValue(currentValue === "0" ? num : currentValue + num);
    }
  }

  // CLEAR 

  function clear() {
    setCurrentValue("0");
    setPrevious("");
    setOperation(null);
  }
function toggleGlow() {
    setIsGlowing(!isGlowing);
  }
  // Keyboard support:
  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
// Numbers 0-9
      if (event.key >= "0" && event.key <= "9") {
        appendNumber(event.key);
      }
  // Decimal
      if (event.key === ".") {
        appendNumber(event.key);
      }
  // Operators
      if (["+", "-", "*", "/"].includes(event.key)) {
        chooseOperation(event.key);
    
      }
    // Equals
      if (event.key === "Enter") {
        calculate();
      }
      if (event.key === "Escape"|| event.key === "Delete" || event.key === "Backspace") {
        clear();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentValue, previous, operation]);


  return (
    <div className={`calculator ${isGlowing ? "glow" : ""}`}>
      <div className="display">{currentValue}</div>
      <div className="buttons">
        <button className="button1 clear" onClick={clear}>AC</button>
        <button className="button1" onClick={() => appendNumber("7")}>7</button>
        <button className="button1" onClick={() => appendNumber("8")}>8</button>
        <button className="button1" onClick={() => appendNumber("9")}>9</button>
        <button className="button1" onClick={() => chooseOperation("/")}>/</button>

        <button className="button1" onClick={() => appendNumber("4")}>4</button>
        <button className="button1" onClick={() => appendNumber("5")}>5</button>
        <button className="button1" onClick={() => appendNumber("6")}>6</button>
        <button className="button1" onClick={() => chooseOperation("*")}>*</button>

        <button className="button1" onClick={() => appendNumber("1")}>1</button>
        <button className="button1" onClick={() => appendNumber("2")}>2</button>
        <button className="button1" onClick={() => appendNumber("3")}>3</button>
        <button className="button1" onClick={() => chooseOperation("-")}>-</button>

        <button className="button1" onClick={() => appendNumber("0")}>0</button>
        <button className="button1" onClick={() => appendNumber(".")}>.</button>
        <button className="button1" onClick={calculate}>=</button>
        <button className="button1 plus"  onClick={() => chooseOperation("+")}>+</button>
      </div>
      <div className="toggleBtn">
      <button className="glowBtn" onClick={toggleGlow}>Toggle Glow</button>
      </div>
    </div>
  );
};

export default Calculator;

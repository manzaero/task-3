import {useState} from 'react'
import './App.css'

const arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '=', 'C'];

function App() {
    const [powerCalculate, setPowerCalculate] = useState(true);
    const [inputChange, setInputChange] = useState('');
    const [ready, setReady] = useState(false);

    const powerCalculateChange = () => {
        setPowerCalculate(!powerCalculate);
        setInputChange('')
    }

    const result = (input) => {
        let result = 0;
        let currentNumber = '';
        let currentOperator = '+'

        for (let i = 0; i < input.length; i++) {
            const char = input[i];
            if (!isNaN(char) && char !== ' ') {
                currentNumber += char;
            } else if (char === '+' || char === '-'){
                result = currentOperator === '+' ? result + parseInt(currentNumber) : result - parseInt(currentNumber);
                currentOperator = char;
                currentNumber = '';
            }
        }
        if (currentOperator !== ''){
            result = currentOperator === '+' ? result + parseInt(currentNumber) : result - parseInt(currentNumber);
        }
        return result;
    }

    const orderBtn = (e) => {
        switch (e){
            case 'C':
                setInputChange('')
                setReady(false)
                break;
            case '=':
                setReady(true)
                setInputChange(String(result(inputChange)))
                break;
            default:
                setInputChange((updateValue) => updateValue + e)
                break;
        }
    }


    return (<>
        <div className="container">
            <div className={ready ? "scoreboard active" : "scoreboard"}>
                <p>{inputChange}</p>
            </div>
            <div className="btn-container">
                <ul className="grid-container">
                    {
                        arr.map((item, index) => (
                            <li key={item}>
                                <button
                                    onClick={() => orderBtn(item)}
                                    className={powerCalculate ? "calc-off" : "btn"} disabled={powerCalculate}>{item}</button>
                            </li>
                        ))
                    }
                    <li>
                        <button className={powerCalculate ? "btn" : "btn-off"}
                                onClick={powerCalculateChange}>{powerCalculate ? 'On' : 'Off'}</button>
                    </li>
                </ul>
            </div>
        </div>
    </>)
}

export default App

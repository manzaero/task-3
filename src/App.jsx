import {useState} from 'react'
import './App.css'

const arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '=', 'C'];

function App() {
    const [powerCalculate, setPowerCalculate] = useState(true);
    const [btn, setBtn] = useState(arr)
    const [inputChange, setInputChange] = useState('');
    const [ready, setReady] = useState(false);

    const powerCalculateChange = () => {
        setPowerCalculate(!powerCalculate);
        setInputChange('')
    }

    const result = () => {
        return new Function(`return ${inputChange}`)();
    }

    const orderBtn = (e) => {
        if (e !== '=' && e !== 'C'){
            setInputChange(updateValue => updateValue + e)
        } else if (e === 'C') {
            setInputChange('')
            setReady(false)
        } else {
            setReady(true)
            setInputChange(result())
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
                        btn.map((item, index) => (
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

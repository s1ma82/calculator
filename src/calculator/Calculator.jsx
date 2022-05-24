import React, {useState} from 'react';
import NumberComp from '../components/number.comp';
import OperatorComp from '../components/operator.comp';
import DisplayComp from '../components/display.comp';
import "./style.scss"

const Calculator = () => {
    const [inputValue, setInputValue] = useState(0)
    const [dot, setDot] = useState(false)
    const [operator, setOperator] = useState(false)

    function enter(value){
        const exp = [...[inputValue], ...[value]].join('')
        if(typeof value === 'string' && value !== "."){
            if(operator && String(inputValue).length > 1) {
                const newValue = String(inputValue).slice(0, String(inputValue).length - 1)
                return setInputValue(newValue + value)
            }else if(String(inputValue).slice(-1) === '-' || String(inputValue).slice(-1) === "."){
                return
            }
            if(!inputValue) {
                if(value !== "-") return 
                setOperator(true)
                return setInputValue(value)
            }
            setDot(false)
            setOperator(true)
        }else{
            if(!inputValue) return setInputValue(value)
            setOperator(false)
        }
        setInputValue(exp)
    }
    function action(name){
        switch(name){
            case "clear": 
                setDot(false)
                setOperator(false)
                setInputValue(0)
            break
            case "del":
                if(!inputValue) return
                if(String(inputValue).length === 1) {
                    setDot(false)
                    return setInputValue(0)
                }
                const newValue = String(inputValue).slice(0, String(inputValue).length - 1)
                setInputValue(newValue)
            break
            case "dot":
                if(dot) return
                enter(".")
                setDot(true)
            break
            case "enter":
                let value = String(inputValue)
                const lastElem = value.split('').slice(-1).join('')
                // eslint-disable-next-line no-eval
                const result = (/[0-9]/.test(lastElem)) ? eval(value) : () => {
                    setOperator(false)
                    // eslint-disable-next-line no-eval
                    return eval(value.slice(0, value.length-1))
                }
                if(result === Infinity) return setInputValue(0)
                setInputValue(result)
            break
            default: return
        }
    }
    return (
        <div className="calculator">
            <DisplayComp state={inputValue}/>
            <div className="calculator__nums">
                <NumberComp func={() => action("clear")} num={"C"} />
                <NumberComp func={() => alert("Реализация данного действия не готова")} num={"+/-"}/>
                <NumberComp func={() => enter("%")} num={"%"}/>
                <NumberComp func={() => enter(7)} num={7} />
                <NumberComp func={() => enter(8)} num={8} />
                <NumberComp func={() => enter(9)} num={9} />
                <NumberComp func={() => enter(4)} num={4} />
                <NumberComp func={() => enter(5)} num={5} />
                <NumberComp func={() => enter(6)} num={6} />
                <NumberComp func={() => enter(1)} num={1} />
                <NumberComp func={() => enter(2)} num={2} />
                <NumberComp func={() => enter(3)} num={3} />
                <NumberComp func={() => action("dot")} num={"."} />
                <NumberComp func={() => enter(0)} num={0} />
                <NumberComp func={() => action("del")} num={"del"} />
            </div>
            <div className="calculator__operators">
                <OperatorComp func={() => enter("/")} operator='/'/>
                <OperatorComp func={() => enter("*")} operator='&#215;'/>
                <OperatorComp func={() => enter("-")} operator='-'/>
                <OperatorComp func={() => enter("+")} operator='+'/>
                <OperatorComp func={() => action("enter")} operator='='/>
            </div>

        </div>
    );
}

export default Calculator;

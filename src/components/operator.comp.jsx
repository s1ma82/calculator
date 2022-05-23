const OperatorComp = ({operator, func}) => {
    return operator === '=' 
    ? <div onClick={func} style={{background: "#fec208", hover: {background: "#fec008cb"}}} className="calculator__item calculator__item_oper">{operator}</div>
    : <div onClick={func} className="calculator__item calculator__item_oper">{operator}</div> 
}

export default OperatorComp;

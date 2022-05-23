const NumberComp = ({num, func}) => {
    return (
        <div className="calculator__item calculator__item_num" onClick={func}>{num}</div>
    );
}

export default NumberComp;

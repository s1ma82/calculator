const DisplayComp = ({state}) => {
    return (
        <input className="calculator__display" readOnly type="text" value={state}/>
    );
}

export default DisplayComp;

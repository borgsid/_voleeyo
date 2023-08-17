const Loader =(model)=>{
    const color = model.color;
    const borderTopStyling= color?`16px solid ${color}`:'16px solid  rgb(225, 215, 172, 0.9)';
    return <>
        <div className="loader" 
            style={{ borderTop: borderTopStyling}}
        ></div>
    </>
}
export default Loader;
const BasicCard = (props) => {

    return (
        <>
            <div className="card" style={{ width: "30%" }}>    {/* , marginBottom: "1rem" }}> */}
                {props?.image ? (<img
                    src={props?.image?.src}
                    className="card-img-top"
                    alt={props?.image?.alt || "Image for card"}
                />)
                    : ""}
                <div className="card-body">
                    {props?.children || ""}
                </div>
            </div>
        </>
    )
}

export default BasicCard;

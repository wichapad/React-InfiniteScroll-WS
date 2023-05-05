

const PhotoCompo = ({urls:{regular},alt_description}) => {
    return(
        <div className="singlePhoto">
            <img src={regular} alt={alt_description}/>
        </div>
    )
}

export default PhotoCompo
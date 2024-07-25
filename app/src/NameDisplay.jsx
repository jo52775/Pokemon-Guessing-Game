import './NameDisplay.css'

const NameDisplay = (props) => {
    const displayName = props.name
    const imageLink = props.image
    const gameEnd = props.gameStatus
    
    return(
        <>
        <div className='nameDisplay'>
            <div className='imageBox'>
                {gameEnd == false && <img id='darkImage' src={imageLink} draggable='false'/>}
                {gameEnd == true && <img id='lightImage' src={imageLink}/>}
            </div>
        
            <div className='nameBox'>
                <h1 id='name'> {displayName} </h1>
            </div>
        
        </div>
        </>
    )
}

export default NameDisplay
import React from 'react' 
import './spinner.scss'
const Spinner = ({isStyle, loading}) => {
    return (
        <div>
            { loading && <div className={`spinner ${isStyle ? 'active' : ''}`} >
                <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>}
        </div>
        
    )
}

export default Spinner

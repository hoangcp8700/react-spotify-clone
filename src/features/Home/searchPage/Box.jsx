import React from 'react'
import {Link} from 'react-router-dom'
import randomColor from 'randomcolor'

const Box = ({categories}) => {
    return (
        categories.length > 0 && categories.map(category => {
            let color = randomColor()
            return (
                <Link key={category.id} to={`topics/${category?.id}`} className="box__link"> 
                    <div className="box" key={category?.id} style={{backgroundColor: color}}>
                        <span>{category?.name} </span>
                        <div className="box__poster">
                            <img src={category?.icons[0]?.url} alt={category?.id} />
                        </div>
                    </div>
                </Link>
            )
        }) 
    )
}

export default Box

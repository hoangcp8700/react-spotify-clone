import {Link} from 'react-router-dom'
export const LoopArtists = (artists, className = "", nav) => {
    if(!artists) return
    let comma = ','
    if(nav){
        if(artists.length > 1){
            return artists.map((val, ind) => val.name)
        }
        return artists[0].name
    }
    if(artists.length > 1){
        return artists.map((val, ind) => (
            <Link 
                key={ind}
                className={className} 
                to={`/artists/${val.id}`}> {ind !== 0 && comma} {val.name} </Link> 
        ))
    }
    return <Link className={className} to={`/artists/${artists[0].id}`}>{artists[0].name}</Link>
  
}
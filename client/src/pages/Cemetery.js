import './Cemetery.css'
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import {fetchCemetery} from '../store/gameSlice'
export default function Cemetery(){
const [ghost, setGhost] = useState(Math.random() < 0.3)
    const dispatch = useDispatch()
    const passedPets = useSelector(state => state.game.cemetery)

    useEffect(() => {
       dispatch(fetchCemetery())
    }, [dispatch])

    return (
        <div className="cemetery-container">
            {ghost ?  <div className="ghost-pop"><img src="https://i.imgur.com/o1V4Va8.gif" alt="ghost"/></div> : null}
        <div className="tombstone-container">
        {passedPets.map((pet) => <div className="tombstone" onClick={() => setGhost(mUv => !mUv)} key={pet.id}><img src="https://live.staticflickr.com/65535/51426137870_96aedb2582_o.png" alt="tombsotone"/><div className="engraving">{pet.name}</div></div>)}
        </div>
        </div>
    )
}


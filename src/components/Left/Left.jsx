import './Left.scss'
import left from '../../assets/icons/left.png'
import { useNavigate } from 'react-router-dom'
function Left() {
    const navigate = useNavigate();

    return (<>

        <img className="left" src={left} alt="left" onClick={() => navigate(-1)} />

    </>)
}
export default Left
import './NotFound.scss'
import Button from '../../components/Button/Button';
import { Link } from 'react-router-dom';
function NotFound(){
return(
    <div className="not-found">
    <h1>404 - Page Not Found</h1>
    <p>Oops! The page you are looking for has vanished or never existed.</p>
   
    <Link to="/">
    <Button type="button" text="Home" variant="contained"/>
    </Link>
  </div>
)
}
export default NotFound
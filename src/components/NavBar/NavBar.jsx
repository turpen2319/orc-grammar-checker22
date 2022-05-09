import { Link } from 'react-router-dom'
import * as userService from '../../utilities/users-service'

export default function NavBar({ user, setUser }) {

    function handleLogOut() {
        // Delegate to the user-service
        userService.logOut();
        // Update state will also cause a re-render
        setUser(null);
    }
    return (
        <nav>
            <Link to="/webcam">Take Photo</Link>
            &nbsp; | &nbsp;
            <Link to="" onClick={handleLogOut}>Log Out</Link>
            &nbsp; &nbsp;
            <span>Welcome, {user.name}</span>
        </nav>
    )
}
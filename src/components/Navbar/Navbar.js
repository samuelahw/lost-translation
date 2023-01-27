import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import Nav from "react-bootstrap/Nav"

//Navigation bar component

const Navbar = () => {

    const { loadedUser } = useSelector(state => state.user)

    useEffect(() => {
    }, [loadedUser])

    return (

        <Nav className="Navigation">
            {(loadedUser) ? <> <ul>
                <li>
                    <NavLink to="/translate">Translation</NavLink>
                </li>
            </ul>
                <ul>
                    <li>
                        <NavLink to="/profile">Profile</NavLink>
                    </li>
                </ul>
            </> : <></>

            }
        </Nav>

    )
}

export default Navbar
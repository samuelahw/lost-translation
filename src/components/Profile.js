import React, { useEffect } from "react"
import { makeImageArray } from "./ImageModule"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { storageDelete, storageRead } from '../utils/storage';
import { logOut, setUser, setStartIndex } from "../reducers/userReducer"
import { useState } from "react"
import { userById } from "../api/user"
import Button from "react-bootstrap/Button"

//Component for profile page

const Profile = () => {
    const { translations, loadingUser, loadedUser, startIndex, username } = useSelector(state => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [history, setHistory] = useState([])
    const [firstTime, setFirstTime] = useState(false)

    useEffect(() => {

        //Function for finding latest data from api and redux
        const findUser = async () => {
            const [error, latestUser] = await userById(storageRead("translator-user").id)
            if (error === null) {
                dispatch(setUser(latestUser))
                setHistory(translations.slice(Math.max(translations.length - 10, startIndex)).reverse())
            } else { //If user is not found, user will be navigated into login page
                dispatch(logOut())
                navigate('../')
            }
        }
        //If user is not logged in, user will be navigated into login page
        if (storageRead("translator-user") === null || (loadedUser && translations === undefined)) {
            dispatch(logOut())
            navigate('../')
        }
        if (!firstTime || history.length === 0) {
            if (storageRead('translator-user') !== null) {
                setFirstTime(true)
                findUser()
            } else {
                dispatch(logOut())
                navigate('../')
            }
        }

    }, [loadedUser, startIndex])

    //Function for handling logging out
    const handleLogoutClick = () => {
        if (window.confirm('Are you sure you want to log out?')) {
            storageDelete(('translator-user'))
            dispatch(logOut())
        }
    }

    //Function for handling delete/clear history
    const handleDeleteClick = () => {
        if (window.confirm('Are you sure to delete history? (this will only delete your history on this session)')) {
            dispatch(setStartIndex())
            setHistory([])
        }
    }

    return (
        <> {loadingUser ?
            <>
                <h2>loading</h2>
            </>
            :
            <div className="Profile">
                <div className="profileButtons">
                    <Button onClick={handleDeleteClick}>Delete history</Button>
                    <Button onClick={handleLogoutClick}>Log out</Button>
                </div>
                <div className="profileTexts">
                    <h1>PROFILE</h1>
                    <h4>Hey {username}!</h4>
                    <br></br>
                    <h3>HISTORY</h3>
                </div>
                {(history.length !== 0 && history !== []) && history.map((e, index, x) => <div key={index}> <legend>{e}</legend> <fieldset key={index}> {makeImageArray(e.replace(/\s/g, '')).map((image, index) => <img key={x + " " + index} src={image} alt="error" />)} </fieldset> </div>)}
            </div>}

        </>
    )
}

export default Profile
import React, { useEffect } from "react"
import { useState } from "react"
import { TranslateShow } from "./TranslateShow"
import { useDispatch, useSelector } from 'react-redux'
import { storageRead } from '../utils/storage';
import { useNavigate } from "react-router-dom"
import { logOut, setUser } from "../reducers/userReducer"
import { translationAdd } from "../api/translation"
import { userById } from "../api/user"
import Button from "react-bootstrap/Button"

//Component for translation page

export const Translation = (props) => {
    const [sentence, setSentence] = useState('')
    const [showTranslation, setShowTranslation] = useState(false)
    const [localUser, setLocalUser] = useState({})
    const { translations, loadedUser } = useSelector(state => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    //This function handles translation
    const handleTranslate = async (e) => {
        e.preventDefault()
        setShowTranslation(true)

        const translation = sentence
        const [error, result] = await translationAdd(localUser, translation)
        dispatch(setUser(result))
    }

    useEffect(() => {

        //Function for finding latest data from api and redux
        const findUser = async () => {
            const [error, latestUser] = await userById(storageRead("translator-user").id)
            if (error === null) {
                dispatch(setUser(latestUser))
                setLocalUser(latestUser)
            } else { //If user is not found, user will be navigated into login page
                dispatch(logOut())
                navigate('../')
            }
        }
        //If user is not logged in, user will be navigated into login page
        if (storageRead("translator-user") === null || (loadedUser && translations === undefined)) {
            dispatch(logOut())
            navigate('../')
        } else {
            findUser()
        }

    }, [showTranslation, loadedUser]);

    return (
        <>
            <div className="translatePage">
                <h1>TRANSLATE</h1>
                <p>(type only alphabets)</p>
                <form onSubmit={handleTranslate}>
                    <input value={sentence.toLowerCase()} onChange={(e) => {
                        setSentence(e.target.value.toLowerCase())
                        setShowTranslation(false)
                    }} pattern='[A-Za-z\\s]*'></input>
                    <Button type="submit">Translate</Button>
                </form>

                {showTranslation &&
                    <>
                        <TranslateShow props={sentence.toLowerCase()}></TranslateShow>
                    </>}
            </div>
        </>

    )
}

export default Translation 
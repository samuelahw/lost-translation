import { useForm } from 'react-hook-form'
import { loginUser } from '../api/user'
import { useState, useEffect } from 'react'
import { storageRead, storageSave } from '../utils/storage'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../reducers/userReducer'

//Component for login view

const usernameConfig = {
    required: true,
    minLength: 2
}

export const LoginForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [user, setUser] = useState()
    const navigate = useNavigate()
    const { translations } = useSelector(state => state.user)
    const dispatch = useDispatch()

    // Local States
    const [loading, setLoading] = useState(false)
    const [apiError, setApiError] = useState(null)

    useEffect(() => {
        console.log(storageRead("translator-user"))

        //If user is logged in, user will be navigated to translate page
        if (user !== undefined || translations.length !== 0 || storageRead("translator-user") !== null) {
            navigate('translate')
        }
    }, [user, navigate, translations])

    // Function for onSubmit event handling
    const onSubmit = async ({ username }) => {
        setLoading(true)
        const [error, userResponse] = await loginUser(username)
        if (error !== null) {
            setApiError(error)
        }
        if (userResponse !== null) {
            storageSave('translator-user', userResponse)
            setUser(userResponse)
            dispatch(fetchUser(userResponse.username))
        }
        setLoading(false)
    }


    //Function for error messages
    const errorMessage = (() => {
        if (!errors.username) {
            return null
        }

        if (errors.username.type === 'required') {
            return <span>Username is required</span>
        }

        if (errors.username.type === 'minLength') {
            return <span>Username is too short</span>
        }
    })()

    return (
        <>
            <div className='loginPage'>
                <h2>What's your name?</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset>
                        <label htmlFor='username'>Username: </label>
                        <input type="text"{...register("username", usernameConfig)} pattern='[A-Za-z\\s]*'></input>
                    </fieldset>
                    {errorMessage}
                    <button type="submit" disabled={loading}>Login</button>

                    {loading && <p>Logging in...</p>}
                    {apiError && <p>{apiError}</p>}
                </form>
            </div>
        </>
    )
}

export default LoginForm
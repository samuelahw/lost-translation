import { createHeaders } from "."

const apiUrl = process.env.REACT_APP_API_URL

export const translationAdd = async (user, text) => {
    try {
        console.log(user.id)
        const response = await fetch(`${apiUrl}/${user.id}`, {
            method: 'PATCH',
            headers: createHeaders(),
            body: JSON.stringify({
                username: user.username,
                translations: [...user.translations, text]
            })
        })
        if (!response.ok) {
            throw new Error('Could not update translations history')
        }

        const result = await response.json()
        return [null, result]
    } catch (error) {
        return [error.message, null]
    }
}

export const orderClearHistory = (user) => {

}
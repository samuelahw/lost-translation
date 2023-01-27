//utility for local storage

//Function for saving key and value in local storage
export const storageSave = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
}

//Function for reading key and value from local storage
export const storageRead = key => {
    const data = localStorage.getItem(key)
    if (data) {
        return JSON.parse(data)
    }
    return null
}

//Function for deleting key and value from local storage
export const storageDelete = key => {
    localStorage.removeItem(key)
}
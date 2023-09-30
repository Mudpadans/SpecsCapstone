const setItem = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value))
    } catch {
        console.error('Error saving to localStorage:', error)
    }
}

const getItem = (key) => {
    try {
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : null;
    } catch (err) {
        console.error("Error retrieving from localStorage:", err)
        return null;
    }
}

const removeItem = (key) => {
    try {
        localStorage.removeItem(key);
    } catch (err) {
        console.error("Error removing from localStorage:", err)
    }
}

const clearAll = () => {
    try {
        localStorage.clear()
    } catch (err) {
        console.error("Error clearing localStorage:", err)
    }
}

export const storage = {
    setItem,
    getItem,
    removeItem,
    clearAll
}
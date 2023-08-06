export const baseUrl = () => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        return 'http://localhost:8000/api';
    } else {
        return 'https://wisetruck-api.onrender.com/api';
    }
}
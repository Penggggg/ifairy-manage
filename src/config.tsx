let isDevelopment = process.env.NODE_ENV === 'development' ? true : false ;

export default {
    reqURL: isDevelopment ? 'http://localhost:3001' : ''
}
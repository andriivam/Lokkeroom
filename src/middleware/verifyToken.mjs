import jwt from 'jsonwebtoken';

const verifyToken = async (req, res, next) => {
    const token = await req.cookies.access_token;
    if(!token) {
        return res.send('You need to register')
    }
    try {
        const data = jwt.verify(token, process.env.jtwSecretKey);
        req.userId = data.users.id;
        req.userEmail = data.users.email;
        req.exp = data.exp;
        return next();
    } catch {
        return res.send(console.log(err.message))
    }
}

export default verifyToken;
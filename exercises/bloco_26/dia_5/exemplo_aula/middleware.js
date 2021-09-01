const validUser = {
    username: 'MestreCuca',
    password: 'MinhaSenhaSuperSeguraSqn'
};

const middlewareAutentication = (req,res,next) =>{
    const {username, password} = req.headers;

    if(!username && !password){
        return res.status(401).json({message:'Username and password cant be blank'});
    }

    if(username !== validUser.username || password !== validUser.password){
        return res.status(401).json({message:'Invalid credentials'});
    }

    next();
};

module.exports = middlewareAutentication;
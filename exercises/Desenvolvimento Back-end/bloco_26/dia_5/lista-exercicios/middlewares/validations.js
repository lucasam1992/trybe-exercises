const isValidUsername = (req,res,next) => {
    const {username} = req.body;

    if(!username || username.length < 3){
        return res.status(400).json({message: 'invalid data username'});
    }
    next();
};

const isValidEmail = (req,res,next) => {
    const {email} = req.body;

    if( !email || !email.includes('@') || !email.includes('.com')){
        return res.status(400).json({message: 'invalid data email'});
    }
    next();
};

const isValidPassword = (req,res,next) => {
    const {password} = req.body;
    const passReg = /^[0-9]*$/;

    if(password.length < 3 || password.length > 8 || !password.match(passReg)){
        res.status(400).json({message: 'invalid data password'});
    }
    next();
};

module.exports = {
    isValidUsername,
    isValidPassword,
    isValidEmail,
}
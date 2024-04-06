const jwt = require('jsonwebtoken');

// verify token
const verifyToken = (req, res, next) => {
    if(!req.headers.authorization) {
        return res.status(401).json({message: "Unauthorized"});
    }

    if(req.headers.authorization && req.headers.authorization.startswitch('Bearer ')){
        const token = req.headers.authorization.split(' ')[1];

        jwt.verify(token,proccess.env.JWT_SECRET, (err,data) =>{
            if(err){
                return res.status(403).json({message: "Forbidden"})
            }else{
                req.user = data;
                next();
            }
        } )
    }
};

// verifyTokenAdmin
const verifyTokenAdmin = (req, res, next) => {
    if(!req.headers.authorization) {
        return res.status(401).json({message: "Unauthorized"});
    }

    if(req.headers.authorization && req.headers.authorization.startswitch('Bearer ')){
        const token = req.headers.authorization.split(' ')[1];

        jwt.verify(token,proccess.env.JWT_SECRET, (err,data) =>{
            if(err){
                return res.status(403).json({message: "Forbidden"})
            }else{
                if(data.isAdmin){
                    if(!data.isAdmin){
                        return res.status(403).json({message: "you are not admin"})
                }

                
                
                req.user = data;
                next();
            }
        } 
    })
    }
}
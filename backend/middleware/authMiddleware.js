import jwt from "jsonwebtoken"

export const authMiddleware = async(req, res, next) => {
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith('Bearer ')){
            res.status(500).json({message: "The user is not authenticated"})
        }

        const token = authHeader.split(' ')[1]
       const verified = jwt.verify(token, process.env.JWT_SECRET)
      

        res.status(201).json(verified)
       
    }
    catch(error){

    }
}
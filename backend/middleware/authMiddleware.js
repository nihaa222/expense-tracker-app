import jwt from "jsonwebtoken"

export const authMiddleware = async(req, res, next) => {
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith('Bearer ')){
            res.status(500).json({message: "The user is not authenticated"})
        }

        const token = authHeader.split(' ')[1]
       const verified = jwt.verify(token, process.env.JWT_SECRET)
      
       req.user = {
        id: verified.id,
        role: decoded.role,
       }

       next()
       
    }
    catch(error){
        res.status(401).json({message: "Invalid or expired token"})

    }
}
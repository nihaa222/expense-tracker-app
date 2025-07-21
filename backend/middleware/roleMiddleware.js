
export const roleMiddleware = (req, res, next ) => {
  return(req, res, next) => {
    if(req.user.role !== requiredRole) {
        return res.status(403).json({message: "Access dennied"})
    }
    next()
  }
}
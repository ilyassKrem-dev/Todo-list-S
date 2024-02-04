const {CustomAPIError} = require('../errors/custom-error')
const errorHandlerMidlle = (err,req,res,next) => {
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({msg:err.message})
    }
    return res.status(err.status).json({msg:"Something went wrong, lease try again"})
}


module.exports = errorHandlerMidlle
const asyncHandler = (requestHandler) => {
    (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).
        catch((err) => next(err));
    }
}
// const asyncHandler = () => {};
// const asyncHandler = (func) => {() => {}} //higher order function
// const asyncHandler = (func) => async() => {} // remove curly braces as shortcut

// TRY CATCH syntax
// const asyncHandler = (func) => async(req, res, next) => {
//     try {
//         await func(req, res, next)
//     } catch(err) {
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message
//         })
//     }
// }

export { asyncHandler };
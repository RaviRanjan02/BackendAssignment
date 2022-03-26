
const authorise = (permittedRoles) =>{
    return (req,res,next) =>{

let ispermitted =false;

       
permittedRoles.map(role =>{
    if(req.user.role.includes(role)){
        ispermitted = true;
    }
});

if(ispermitted){
    return next();

}

else {
    return res.status(400).send({message:"You are not authorised to perform this operation"}) 
}
}
}
module.exports = authorise;


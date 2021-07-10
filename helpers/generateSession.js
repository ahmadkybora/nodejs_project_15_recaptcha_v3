async function generateSession(req, res, user){
    if(user){
        req.session.userId = user.id;
        return req.session.userId;
    }
}

// server.js
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
var jwt = require('jsonwebtoken');
var bodyParser=require('body-parser');
server.use(bodyParser.json())
server.use(middlewares)
server.use((req, res, next) => {
    // console.log(req.headers)
    var users = router.db.getState().users;
    if(req.headers.token){
        var x = jwt.verify(req.headers.token,"edosecretkey");
        console.log(x)
        next();
    }
    else{
        if(req.body.username){
            if(user=users.find(user=>(user.username==req.body.username&&user.password==req.body.password))){
                var token = jwt.sign(user, 'edosecretkey');
                res.header('token',token)
                res.json({msg:"loginsuccess",token})
            }
            else{
                res.json({msg:"credentials mismatch"})
            }
        }
        else{
            res.json({msg:'pleaselogin'})
        }
    }

})
server.use(router)
server.listen(4000, () => {
  console.log('JSON Server is running on 4000!!! Enjoyyyy')
})
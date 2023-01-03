const User = require('../model/user.model');

// Create user account with email and password.
exports.create = function (req,res){
    let user = new User({
        username: req.body.username,
        email: req.body.email,
        age: req.body.age,
        password: req.body.password
    });

    user.save(function(err){
        if(err){
            return next(err);
        }
        console.log('User Created Successfully');
        res.send('User Created Successfully');
    });
}

// Find user account with Object ID.
exports.read = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        res.send(user);
    })
}

// Update user details.
exports.update = function (req, res) {
    User.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, user) {
        res.send('User updated.');
    });
}

// Delete user account with Object ID.
exports.delete = function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err, user) {
        res.send('Delete user successfully')
    })
}

// View all user accounts.
exports.view = function (req,res){
    User.find(function(err, user) {
        if (err) return console.error(err);
        res.send(user);
    });
}

// Login with email and password
exports.login = function (req,res){
   let email = req.body.email;
   let password = req.body.password;

   User.findOne({ email: email })
   .exec((err, user) => {
    if (err)
        return console.log(err);
    if (!user){
        res.send("This email has never been created.");
        return console.log("This email has never been created.");
    }
    else{
        if (user.password == password) res.send(user);
        else res.send("Wrong Password 2");
    }
   });
}
const User = require('../model/user.model');

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

exports.read = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        res.send(user);
    })
}

exports.update = function (req, res) {
    User.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, user) {
        res.send('User updated.');
    });
}

exports.delete = function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err, user) {
        res.send('Delete user successfully')
    })
}

exports.view = function (req,res){
    User.find(function(err, user) {
        if (err) return console.error(err);
        res.send(user);
    });
}
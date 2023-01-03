const User = require('../model/user.model');

// Create user account with email and password.
exports.create = function (req, res) {
    let user = new User({
        username: req.body.username,
        email: req.body.email,
        age: req.body.age,
        password: req.body.password
    });

    User.findOne({ email: user.email })
    .exec((err, userCheck) => {
        if (err)
            return console.log(err);
        if (!userCheck) {
            user.save(function (err) {
                if (err) {
                    return next(err);
                }
                res.send('User account created successfully.');
                return console.log(`[account] (${user.email}) created successfully.`);
            });
        }
        else {
            res.send("This email has already been used.");
            return console.log(`[account] (${user.email}) was used to create the account again.`);
        }
    });
}

// Find user account with Object ID.
exports.read = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if(!user)
            return console.log(`[account] (${req.params.id}) not found.`);
        res.send(user);
    })
}

// Update user details.
exports.update = function (req, res) {
    User.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, user) {
        res.send('User updated.');
        return console.log(`[account] (${req.params.id}) updated.`);
    });
}

// Delete user account with Object ID.
exports.delete = function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err, user) {
        res.send('Delete user successfully')
        return console.log(`[account] (${req.params.id}) deleted.`);
    })
}

// View all user accounts.
exports.view = function (req, res) {
    User.find(function (err, user) {
        if (err) return console.error(err);
        res.send(user);
    });
}

// Login with email and password
exports.login = function (req, res) {
    let email = req.body.email;
    let password = req.body.password;

    User.findOne({ email: email })
        .exec((err, user) => {
            if (err)
                return console.log(err);
            if (!user) {
                res.send("This email has never been created.");
                return console.log(`[account] (${email}) has never been created account.`);
            }
            else {
                if (user.password == password){
                    res.send(user);
                    return console.log(`(${email}) Login successfully`);
                }
                else{
                    res.send("Wrong Password");
                    return console.log(`[account] (${email} Login failed due to incorrect password.)`);
                }
            }
        });
}
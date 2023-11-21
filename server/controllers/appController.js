const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const User = require('../models/user');

const handleErrors = (err) => {
    let errors = {};

    console.log(err);

    if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
        err.errors.forEach((error) => {
            if (error.message === 'email must be unique') {
                errors.email = 'Email has already been taken.';
            } else if (error.message === 'username must be unique') {
                errors.username = 'Username has already been taken.';
            } else {
                errors[error.path] = error.message;
            }
        });;
    } else {
        errors.message = 'An unexpected error occurred';
    }

    return errors;
};

const sendResetLink = (email, resetPasswordLink) => {
    console.log('Initiating send reset link through email.');
    const transporter = nodemailer.createTransport({
        service: "hotmail",
        auth: {
            user: "mattchootest@outlook.com",
            pass: "Dababysreal123$"
        }
    });

    const options = {
        from: "mattchootest@outlook.com",
        to: email,
        subject: "Password Change Request",
        html: `<h3>Click on the link below to reset your password.</h3>
        <p>Link: <a href="${resetPasswordLink}">${resetPasswordLink}</a></p>
        <p>If you didn't request a password change, just ignore this email.</p>
        <p>Please note that this request will expire in 1 hour. After that, you'll have to request a new password again.`
    };

    transporter.sendMail(options, function (err, info) {
        if (err) {
            console.log('Error:', err);
            return;
        }

        console.log("Sent:", info.response);
    });
};

module.exports.getAPI = (req, res, next) => {
    res.json({ "users": ["Lebron", "Bronny", "Kendrick Lamar"] });
};

module.exports.postSignup = async (req, res, next) => {
    const { email, username, name, password } = req.body;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const caseInsensitiveEmail = email.toLowerCase();
    const caseInsensitiveUsername = username.toLowerCase();

    try {
        const newUser = await User.create({
            username: caseInsensitiveUsername,
            email: caseInsensitiveEmail,
            name: name,
            password: hashedPassword
        });

        console.log('User created:', newUser.toJSON());
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        const errors = handleErrors(error);
        res.send(errors);
    };
};

module.exports.postForgotPassword = async (req, res, next) => {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
        res.send({ message: 'Email has not been registered.' });
        return;
    }

    if (user.resetToken) {
        await user.update({ resetToken: null });
    }

    const token = crypto.randomBytes(32).toString('hex');
    user.resetToken = token;
    await user.save();
    console.log('User Token:', user.resetToken);

    const resetPasswordLink = `http://localhost:3000/reset-password/${user.resetToken}/${user.id}`;
    console.log(resetPasswordLink);
    //sendResetLink(email, resetPasswordLink);
    res.send({ resetPasswordLink, message: 'User found.' });
}

module.exports.getResetPassword = async (req, res, next) => {
    const { token, id } = req.params;
    console.log('Token:', token);
    console.log('Id:', id);
    const user = await User.findOne({ where: { id, resetToken: token } });

    if (user) {
        console.log('Valid reset password link.');
        res.send('Valid reset password link.');
    } else {
        console.log('Invalid reset password link.');
        res.send('Reset password link is invalid.');
    }
}

module.exports.putResetPassword = async (req, res, next) => {
    const { token, id } = req.params;
    const { password } = req.body;

    try {
        const user = await User.findByPk(id);

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        user.password = hashedPassword;
        await user.save();

        console.log('New password successfully updated.');

        res.send('New password successfully updated.');
    } catch (error) {
        console.log('Error:', error);
    };
}

module.exports.getAuthentication = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.status(200).json({
            authenticated: true,
            name: req.user.name,
            username: req.user.username,
            email: req.user.email
        });
    } else {
        res.status(200).json({ authenticated: false });
    }
};

module.exports.logout = (req, res, next) => {
    console.log('Logout button clicked.');
    req.session.destroy((err) => {
        if (err) {
            console.log('Error destroying session:', err);
        }
    });
};

module.exports.clearUserTable = async (req, res) => {
    try {
        await User.destroy({ where: {} });
        res.status(200).json({ message: 'User table cleared successfully' });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: 'Failed to clear user table' });
    }
};
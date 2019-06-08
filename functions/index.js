const admin = require('firebase-admin')

admin.initializeApp()

exports.onUserStatusChanged = require('./triggers/onUserStatusChagned')

exports.helloWorld = require('./routes/helloWorld')

exports.onCleverBotMessage = require('./triggers/onCleverBotMessage')
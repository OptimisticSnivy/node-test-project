const bcrypt = require('bcrypt')

async function genHashedPass(password, saltRounds) {
	const salt = await bcrypt.genSalt(saltRounds)
	const passwordHash = await bcrypt.hash(password, salt)
	return passwordHash
}

module.exports = genHashedPass;

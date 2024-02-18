// Installing Dependencies

const jwt = require("jsonwebtoken");

require("dotenv").config();

// Exporting the authorization function

module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];
		const decodedToken = jwt.verify(token, process.env.JWT_VERIFICATION_CODE);
		const userId = decodedToken.userId;

		req.auth = { userId };

		if (req.body.userId && req.body.userId !== userId) {
			throw "Invalid User Id";
		} else {
			next();
		}
	} catch {
		res.status(401).json({
			error: new Error("Invalid request!"),
		});
	}
};

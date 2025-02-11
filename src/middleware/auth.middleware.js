const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        
        // Read token from HttpOnly cookie
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        // Verify JWT using the same secret as Auth Service
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.id }; // Attach user ID to request

        next(); // Proceed to controller
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};

module.exports = authMiddleware;

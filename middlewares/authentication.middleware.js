import jwt from "jsonwebtoken";

const authenticationMiddleware = (req, res, next) => {
  // Verify jwt token first
  const token = req.headers.authorization;
  if (!token) return res.status(404).json({ message: "token not found" });

  jwt.verify(token, process.env.JWT_SECRETE, (error, payload) => {
    if (error)
      return res.status(401).json({ message: "token expired or tamparted" });
    req.user = payload;
  });

  next();
};

export default authenticationMiddleware;

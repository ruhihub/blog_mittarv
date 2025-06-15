const jwt = require('jsonwebtoken');

// const authMiddleware = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) return res.status(401).json({ message: "Access denied" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded.id;
//     next();
//   } catch (err) {
//     res.status(401).json({ message: "Invalid token" });
//   }
// };
const authMiddleware = async (req, res, next) => {
  // try {
  //   const token = req.header("Authorization")?.replace("Bearer ", "");
  //   if (!token) return res.status(401).json({ message: "No token provided" });

  //   const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //   const user = await User.findById(decoded.id);

  //   if (!user) return res.status(401).json({ message: "User not found" });

  //   req.user = user._id; // Attach user to request if needed
  //   next();
  // } catch (err) {
  //   res.status(401).json({ message: "Invalid token" });
  // }
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // req.user = decoded;
      req.user = { id: decoded.id }; //
      next();
    } catch (err) {
      return res.status(401).json({ msg: "Invalid Token" });
    }
  } else {
    return res.status(401).json({ msg: "No token provided" });
  }
};


module.exports = authMiddleware;

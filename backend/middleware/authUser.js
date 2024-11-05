import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized Access", success: false });
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
      res.status(401).json({ message: "Invalid Credentials", success: false });
    }
    req.id = decode.userId;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export default authUser;

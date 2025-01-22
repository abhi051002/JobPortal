import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.json({ message: "Unauthorized Access", success: false });
    }
    // console.log(req.headers);
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
      res.json({ message: "Invalid Credentials", success: false });
    }
    req.id = decode.userId;
    next();
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Server error" });
  }
};

export default authUser;

import jwt from 'jsonwebtoken';

const checkRole = (roles) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!roles.includes(decoded.role))
      return res.status(403).json({ error: 'Access denied' });
    next();
  };
};

export default checkRole;
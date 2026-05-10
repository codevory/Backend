export function requireAuth(req, res, next) {
  try {
    if (!req.session.userId) {
      console.error("Access protected route blocked");
      return res.status(401).json({ error: "Unauthorized" });
    }
    next();
  } catch (err) {
    console.error("Error occured : ", err.message);
  }
}

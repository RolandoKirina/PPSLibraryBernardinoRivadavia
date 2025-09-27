export  const validateIdParam = (label = "id") => {
     return (req, res, next) => {
        const { id } = req.params;
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ msg: `Invalid ${label}` });
        }
        next(); 
  };
}
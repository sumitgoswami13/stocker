module.exports = (req, res, next) => {
    const clientSecret = req.headers['x-client-secret']; // Custom header for the secret key
    const expectedSecret = process.env.CLIENT_SECRET; // Load the expected secret key from environment variables
  
    if (!clientSecret) {
      return res.status(403).json({ error: 'Forbidden: Missing client secret' });
    }
  
    if (clientSecret !== expectedSecret) {
      return res.status(403).json({ error: 'Forbidden: Invalid client secret' });
    }

    next();
  };
  
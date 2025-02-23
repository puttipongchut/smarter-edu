export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { username, password } = req.body;
      // Authenticate the user and issue a JWT token
      // Set the JWT token in a cookie or return it in the response
      res.status(200).json({ message: "Success", token: jwtToken });
    } else {
      res.status(405).json({ message: "Method Not Allowed" });
    }
  }
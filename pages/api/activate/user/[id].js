export default async function activateUser(req, res) {
    const id = req.query.id;
    console.log(req.query.id)
    if (!id) {  
      return res.status(401).json({message: 'Cannot Validate an User!'})
    }
  
    const response = await fetch(`http://localhost:5000/api/activate/user/${id}`);
    if (response.status >= 400) {
      return res.status(401).json({message: 'Cannotm Validate an User!'})
    } else {
      res.writeHead(307, { Location: '/users/activated' });
      res.end();
    }
  }
  
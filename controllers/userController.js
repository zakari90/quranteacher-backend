const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Controller example for user CRUD
exports.getUsers = async (req, res) => {
  console.log("getUsers");
  
  try {
    const users = await prisma.user.findMany();
    console.log("getUsers", users);
    
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;  // Capture the user ID from the URL params
  console.log(`Fetching user with id: ${id}`);

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),  // Assuming the id is a number. If it's a string, you can remove parseInt().
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });  // Handle case when user is not found
    }

    console.log('User found:', user);
    return res.status(200).json(user);  // Respond with the user data
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({ error: 'Internal Server Error' });  // Catch and return any errors
  }
};


exports.createUser = async (req, res) => {
  console.log("createUser", req.body);
  
  try {
    const user = await prisma.user.create({ data: req.body });
    res.status(201).json(user);
  } catch (error) {
    console.log("createUser", error);
    res.status(500).json({ error: error.message });
  }
};
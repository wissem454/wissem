const User = require('../models/user'); 
const jwt = require('jsonwebtoken'); 

exports.registerUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        
        const hashedPassword = await bcrypt.hash(password, 10);

        
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'Utilisateur créé avec succès' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        
        const user = await User.findOne({ username });

     
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Mot de passe incorrect' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, 
            { expiresIn: '30d' });

      
        res.json({ token });
    } catch (error) {
        
        res.status(500).json({ message: error.message });
    }
};

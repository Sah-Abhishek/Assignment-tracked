const express = require('express');
const cors = require('cors');
const connectDB = require('./connection');
const { User, Subject } = require('./model');
const jwt = require("jsonwebtoken")
const authenticateToken = require('./middlewares/authenticateToken.js')
// const { }

const app = express();
app.use(express.json());
app.use
app.use(cors());
const PORT = 3000;
const JWT_SECRET = 'Hakuna-matata';

// Connect to DB

connectDB('mongodb+srv://abhish:6YAt8eAogRGC5dhR@cluster0.jv7k7a6.mongodb.net/assignment');

app.post("/signup", async (req, res) => {
    try {
        const { name, username, year, password, confirmPassword } = req.body;
        console.log("Data: ", { name, username, year, password, confirmPassword });

        // Basic validation
        
        if (!name || !username || !year || !password || !confirmPassword) {
            return res.status(400).json({ message: "All fields are required." });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match." });
        }
        const existingUser = await User.findOne({username});

        if(existingUser)
            return res.status(409).json({
                message: "Username already exist"
        })
        const token = jwt.sign({ id: username, password}, JWT_SECRET);



        // Create a new user instance
        const newUser = new User({
            name,
            username,
            year,
            password,
            confirmPassword // confirmPassword will be removed in pre-save hook
        });

        // Save user to the database
        await newUser.save();

        res.status(201).json({ message: "User created successfully.",
            token: token
         });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error." });
    }

})




app.get("/subjects", authenticateToken, async (req, res) => {
    const user = req.user;
    console.log("This is the user", user);
    const username = user.username;
    console.log("This is the username", username);
    console.log("Thi is the user information from the mongodb database: ", req.user);
    try{
        const populatedsubjects = await User.findOne({ username }).populate('data.subjects');
        console.log("These are the fetched subjects", populatedsubjects, typeof(populatedsubjects));
        res.status(200).json({
            data: populatedsubjects.data.subjects
        });
    }
    catch(error){
        console.log("There was some error while fetching subjects from the User model", error);
    }
        
});


app.post("/login", async(req, res)=> {
    try{
        const { username, password } = req.body;
        console.log("username: ", username);
        console.log("password: ", password);

        if(!username || !password)
            return res.status(400).json({ message: "Username and Password are required"});
         //Find the User by Username
         const user = await User.findOne({username});

         if(!user)
            return res.status(401).json({ message: "Invalid Username or Password "});
        
         // Check if the password matches the stored Password

         if(password != user.password)
            return res.status(401).json({ message: "Invalid Usernae or Password"});
        
         // Generate jwt token

         const token = jwt.sign({ username, password }, JWT_SECRET);

         // Successful Login

         res.status(200).json({
            token: token,
            message: "Login Sucesssfull"
         })


    }catch(error){
        res.status(500).json({
            message: "Internal Server Error"
        })
        console.log("Error while Signing up", error);
    }
})


const createSubjectForUser = async (userId, subjectTitle) => {
    try {
        const newSubject = new Subject({
            title: subjectTitle,
             // This will default to 5 units due to schema definition
            users: userId
        });
        console.log("This is a check");

        await newSubject.save();
        await User.findByIdAndUpdate(userId, { $push: { 'data.subjects': newSubject._id } });

        console.log('Subject created for user:', newSubject);
        return newSubject; // Return the new subject
    } catch (error) {
        console.error('Error creating subject:', error);
        throw error; // Handle the error appropriately
    }
};



app.post("/addsubject", authenticateToken, async (req, res) => {
    const { subject } = req.body; // Extracting the subject field
    const user = req.user; // This is the authenticated user
    console.log("This is the user:", user);
    console.log("Received subject:", subject);


    try{
        const newSubject = await createSubjectForUser(user._id, subject);
        console.log("Data added succesfully");
        res.status(201).json({ message: 'Subject added successfully', subject: newSubject });


    }catch(error){
        res.status(500).json({ message: 'Error creating subject', error: error.message });

    }
    
    
});






app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));



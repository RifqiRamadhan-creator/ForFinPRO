const express = require('express'); 
const bodyParser = require('body-parser'); 
const userRoutes = require('./routes/UserRoutes'); 
const TaskRoutes = require('./routes/TaskRoutes');
const NoteRoutes = require('./routes/NoteRoutes');
const PetRoutes = require('./routes/PetRoutes');
const {pool} = require('./config/db.config');
const port = process.env.PORT; 
const app = express(); 
const cors = require('cors');
const userController = require("./repositories/user.js");
const taskController = require("./repositories/task.js");
const noteController = require("./repositories/note.js");
const petController = require("./repositories/repository.pet.js");

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/user', userRoutes);
app.use('/task', TaskRoutes);
app.use('/note', NoteRoutes);
app.use('/pet', PetRoutes);

//users
app.post("/login", userController.login);
app.post("/signup", userController.signup);
app.post("/nickname", userController.getNick); //this get nickname

//Tasks
app.post("/addT", taskController.addTask);
app.post("/getT", taskController.getTask);
app.post("/delT", taskController.delTask);
//Notes
app.post("/addN", noteController.addNotes);
app.post("/getN",noteController.getNotes);
//Pets
app.post("/getOwnedP",petController.getOwnedPets);
app.post("/getAllP",petController.getAllPets);
app.post("/getNewP", petController.getMyNewestPet);



pool.connect(() => {
    console.log("Connected to database");
});

app.listen(port, () => { 
    console.log('Server is running and listening on port', port); 
});
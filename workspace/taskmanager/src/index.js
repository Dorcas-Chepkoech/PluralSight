const express = require('express');   // reuire express from node modules
require('./db/mongoose');  // requiring db/mongoose file
const User = require('./models/user'); // require user.js file which is in models fldr
const Task = require('./models/task');
 
const app = express();   // invoking a func or package
const port = process.env.PORT ||3000;  // read the port if it doesnt exist put a no
 
app.use(express.json());  // use express for formatting, structure
 
app.post('/users', async (req, res) => {  // .post method to create through /users
    const user = new User(req.body);  // request body
 
    /* user.save().then(() => {  // save then promise brings back the status if successful
        res.status(201).send(user);
    }).catch((error) => {  // if not successful it will catch an error
        res.status(400).send(error);
    }); */
 
    try{ // a feature used when something works / successful
        await user.save();
        res.status(201).send(user);   
    }catch (e){  // catch any error
        res.status(400).send(e);
    }
});
 
app.get('/users',async (req, res) =>{  // retrieving data from users
    
    /* User.find({}).then((users) =>{
        res.send(users);
    }).catch((error) =>{
        res.status(500).send();
    });  */
 
    try{
const users = await user.find({});
res.send(users);
    }catch{
        res.status(500).send();
    }
});
 
app.get('/users/:id', async (req, res) =>{  // retrieving based on id
    const _id = req.params.id;
    // User.findById(_id).then((user) =>{
    //     if(!user){
    //         return res.status(404).send();
    //     }
 
    //     res.send(user);
    // }).catch(() =>{
    //     res.status(500).send();
    // });
    try{
        const user = await User.findById(_id);
        if (!user){
            return res.status(404).send();
        
        }
        res.send(user);
    } catch (e){
        res.status(500).send();
    }
});
app.patch('/users/:id', async (req, res) =>{
    const updates = Object.keys(req.body);
    const allowedUpdates= ['name','email','password','age'];
    const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update));

    if (!isValidOperation){
        return res.status(400).send({error: 'Invalid updates'});
    }
    try{
        const user = await User.findByIdAndUpdate(req.params.id,
            req.body, { new: true, runValidators: true});

            if (!user){
                return res.status(404).send();
            }
            res.send(user);
    }catch (e){
        res.status(400).send(e);
    }
})
 
app.post('/tasks', (req, res) =>{
    const task = new Task(req.body);
 
    // task.save().then(() =>{
    //     res.status(201).send(task);
    // }).catch((e) =>{
    //     res.status(400).send(e);
    // });
    try{
        await task.save();
        res.status(201).send(task);
    } catch (e){
        res.status(400).send(e);
    }
});
 
app.get('/tasks', async (req, res) =>{
    // Task.find({}).then((tasks) =>{
    //     res.send(tasks);
    // }).catch((e) =>{
    //     res.status(500).send(e);
    // });
    try{
        const tasks = await Task.find({});
        res.send(tasks);
    } catch (e){
        res.status(500).send(e);
    }
});
 
app.get('/tasks/:id', async (req, res) =>{
const _id = req.params.id;
 
// Task.findById(_id).then((task) =>{
//     if (!task){
//         return res.status(404).send();
//     }
//     res.send(task);
//     }).catch((e) =>{
//     res.status(500).send();
//     });
try{
    const task = await Task.findById(_id);
    if (!task){
        return res.status(404).send();
        
    }
    res.send(task);
} catch(e) {
     res.status(500).send();
}
});
 
app.listen(port, () =>{
    console.log('Server is up on port' +port);
});
 



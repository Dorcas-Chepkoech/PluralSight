require('../src/db/mongoose');
const User = require('../src/models/user');

User.findByIdAndUpdate('5db2f476f838a41ee5fc15ea',{age:19}).then((user)=>{
    console.log(user);
    return User.countDocuments({age:19});//counts the 
}).then((result)=>{
    console.log(result);
}).catch((e)=>{
    console.log(e);
});

const updateAgeAndCount = async (id, age) => {
     const user = await User.findByIdAndUpdate(id, {age});
     const count = await User.countDocuments({age});
     return count;
}
updateAgeAndCount('5db2f476f838a41ee5fc15ea',78).then((count) => {
    console.log(count);

})
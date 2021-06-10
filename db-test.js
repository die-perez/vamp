// Make sure to require your models in the files where they will be used.
const db = require('./models');

// db.user.findOrCreate({
//     where: {
//         name: 'Siouxsie Sioux',
//         email: 'bansheeforever@gmail.com'
//     }
// })
// .then((newUser) => {
//   console.log(newUser.get())
// })
// .catch((err) => {console.log(err)})

async function findUser(){
    try {
        const foundUser = await db.user.findOne({
            where: {name: 'Siouxsie Sioux'}
        })
        console.log(foundUser)
    } catch(error) {
        console.log(error)
    }
}

findUser()
// Make sure to require your models in the files where they will be used.
const db = require('./models');

// db.review.findOrCreate({
//     where: {
//         rating: 5,
//         content: 'This is fantastic'
//     }
// })
// .then((newUser) => {
//   console.log(newUser.get())
// })
// .catch((err) => {console.log(err)})

// async function findUser(){
//     try {
//         const foundUser = await db.user.findOne({
//             where: {name: 'Siouxsie Sioux'}
//         })
//         console.log(foundUser)
//     } catch(error) {
//         console.log(error)
//     }
// }

// findUser()
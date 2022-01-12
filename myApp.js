require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFoods: [String]
})

const Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  let bob = new Person({name: "Bob", age: 69, favoriteFoods: ["Pizza", "Ice Cream"]})
  bob.save( (err, data) => {
    if (err) return console.error(err)
    done(null, data)
  })
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) return console.error(err)
    done(null, data)
  })
};

const findPeopleByName = (personName, done) => {
  Person.find( {'name': personName}, (err, data) => {
    if (err) return console.error(err)
    done(null, data);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne( {'favoriteFoods': food}, (err, data) => {
    if (err) return console.error(err)
    done(null, data);
  })
};

const findPersonById = (personId, done) => {
  Person.findById( personId, (err, data) => {
    if (err) return console.error(err)
    done(null, data);
  })
};

const findEditThenSave = (personId, removePerson) => {
  const foodToAdd = "hamburger";
  Person.findById( personId, (err, foundPerson) => {
    if (err) return console.error(err)
    foundPerson.favoriteFoods.push(foodToAdd)
    foundPerson.save( (err, updatedPerson) => {
      if (err) return console.error(err)
      // removes person established in server.js
      // res.json(updatedPerson)
      removePerson(null, updatedPerson)
    })
  })
};

const findAndUpdate = (personName, removePerson) => {
  const ageToSet = 20;
  Person(Person.findOneAndUpdate( {'name': personName}, {'age': ageToSet}, {new: true}, (err, updatedPerson) => {
    if (err) return console.error(err)
    // removes person established in server.js
    // res.json(updatedPerson)
    removePerson(null, updatedPerson)
  } ))
};

const removeById = (personId, done) => {
  Person(Person.findByIdAndRemove( personId, (err, data) => {
    if (err) return console.error(err)
    done(null, data);
  }))
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person(Person.remove( {'name': nameToRemove}, (err, data) => {
    if (err) return console.error(err)
    done(null, data);
  }))
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person( Person.find( {'favoriteFoods': foodToSearch} )
                .sort({'name': 1})
                .limit(2)
                .select('-age')
                .exec((err, data) => {
                  if (err) return console.error(err)
                  done(null, data)
                }))
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;

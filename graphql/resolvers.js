const Cat = require('../models/Cat');

const resolvers = {
  Query: {
    hello: (parent, {name}) => {
      console.log(parent)
      return `hey ${name}`
    },
    cats: async () => {
      const cats = await Cat.find({});
      return cats
    },
    cat: async (parent, {catID}) => {
      console.log(catID)
      const cat = await Cat.findById(catID);
      console.log(cat)
      return cat
    }
  },
  Mutation: {
    addCat: async (parent, {cat}) => {
      console.log(parent, cat);
      const catInstance = new Cat({
        name: cat.name,
        age: cat.age,
        type: cat.type,
        children: cat.children
      });
      await catInstance.save();
      return "New Cat added successfully!"
    }
  }
};

module.exports = resolvers;
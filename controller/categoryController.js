const Category = require('../Models/categoryModel')

// add category
exports.addCategory = async (req, res) => {
    let category = await Category.findOne({ category_name: req.body.category_name })
    if (category) {
        return res.status(400).json({ error: "Category already exists." })
    }
    let categoryToAdd = new Category({
        category_name: req.body.category_name
    })
    categoryToAdd = await categoryToAdd.save()
    if (!categoryToAdd) {
        return res.status(400).json({ error: "Something went wrong" })
    }

    res.send(categoryToAdd)
}

/*
findOne()- search and return object {} which matches the filter object
find(filter)- returns all data in array [], which matches the filter objects
find() - returns all data
findById(id)- returns the object with id  
findByIdAndUpdate(id,{updates}, option)- finds an objects with given id and updates it with updates
findByIdAndDelete(id) or findByIdAndRemove(id) - finds an object with given id and removes it

req.body - to get values from form
req.params - to get values from url
req.query -to get values form url using named parameters
res.send(object) - to send objects to user
res.status(code).json(object)- to send json data to user with status code
    code- 400- error
    200 - success
res.json(json object) - to send json data to user
*/

//  to get all categories
exports.getAllCategories = async (req, res) => {
    let categories = await Category.find()
    if (!categories) {
        return res.status(400).json({ error: "something went wrong" })
    }
    res.send(categories)
}

// to get category details
exports.getCategoryDetails = async (req, res) => {
    let category = await Category.findById(req.params.id)
    if (!category) {
        return res.status(400).json({ error: "something went wrong" })
    }
    res.send(category)
}

// to update category
exports.updateCategory = async (req, res) => {
    let categoryToUpdate = await Category.findByIdAndUpdate(req.params.id, {
        category_name: req.body.category_name
    }, { new: true })

    if (!categoryToUpdate) {
        return res.status(400).json({ erro: "something went wrong" })
    }
    res.send(categoryToUpdate)
}

// to delete category using promise(.then)
exports.deleteCategory = (req, res) => {
    Category.findByIdAndRemove(req.params.id)
        .then(category => {
            if (!category) {
                return res.status(400).json({ error: "category not found" })
            }
            else {
                return res.status(200).josn({ message: "Category deleted successfully" })
            }
        })
        .catch(error => { return res.status(400).json({ error: error.message }) })
}

// delete category using async await
exports.deleteCategory=async(req,res)=>{
    try{
    let categoryToDelete = await Category.findByIdAndRemove(req.params.id)
    if(!categoryToDelete){
        return res.status(400).json({error:"Category not found"})
    }
        res.status(200).json({msg:"category deleted successfully"})
    }
    catch(error){
   res.status(400).json({error:error.message})}
}






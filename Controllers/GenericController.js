
const Genericfunctions = require("../GenericFunc/genericFunctions")

const GetAllData = async (req, res, model) => {
    console.log(model);
    let status = 200
    let MyData
    try {
        MyData = await Genericfunctions.GetAll(model)
        console.log(MyData);
        if (!MyData) {
            status = 404
            console.log(`no data!,more details`);
            // console.log(`no data!,more details-${err}`);
        }
        else {
            res.json(MyData)
            res.end()
        }
    }
    catch {
        status = 404
        console.log(`error in connected to db`)
        // console.log(`error in connected to db. see details:, ${err}`)
    }
    console.log(status);
    res.status(status, { 'Content-Type': 'applicatin/json' })

}

const GetDataById = async (req, res, model) => {
    console.log('model', model);
    let status = 200
    let MyData
    let MyId = req.params.id
    console.log('id', MyId);
    try {
        MyData = await Genericfunctions.findObjectById(model, MyId)
        console.log(MyData);
        if (!MyData) {
            status = 404
            console.log(`no data!,more details`);
            // console.log(`no data!,more details-${err}`);
        }
        else {
            res.json(MyData)
            res.end()
        }
    }
    catch {
        status = 404
        console.log(`error in connected to db`)
        // console.log(`error in connected to db. see details:, ${err}`)
    }
    console.log(status);
    res.status(status, { 'Content-Type': 'applicatin/json' })

}

const AddItem = async (req, res, model) => {
    let status = 200
    let myObj = req.body
    console.log("myObj",myObj);
    console.log("model",model);
    let count = model.count({})
    const id=`id${model}`
    try {
        model.create(
            { id: ++count }
            , myObj, (e, r) => {
                if (e)
                    console.log(e)
                else {
                    res.json(r)
                    res.end();
                }
            })
    }
    catch (err) {
        status = 404
        console.log(`error while connection to your db:, ${err}`)
    }

    res.status(status, { 'Content-Type': 'applicatin/json' })
}

const GetOneObject = async (req, res, model,filter) => {
    console.log('model', model);
    let status = 200
    let MyData
    console.log('filter', filter);
    try {
        MyData = await Genericfunctions.findOneObject(model,filter)
        console.log(MyData);
        if (!MyData) {
            status = 404
            console.log(`no data!,more details`);
            // console.log(`no data!,more details-${err}`);
        }
        else {
            res.json(MyData)
            res.end()
        }
    }
    catch {
        status = 404
        console.log(`error in connected to db`)
        // console.log(`error in connected to db. see details:, ${err}`)
    }
    console.log(status);
    res.status(status, { 'Content-Type': 'applicatin/json' })
    
}


module.exports = {
    GetAllData,
    GetDataById,
    AddItem,
    GetOneObject
}



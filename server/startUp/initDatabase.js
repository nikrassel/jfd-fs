const Profession = require('../models/Profession')
const Quality = require('../models/Quality')
const profMock = require('../mock/professions.json')
const qualMock = require('../mock/qualities.json')

module.exports = async () => {
    const professions = await Profession.find()
    if (professions.length !== profMock.length) {
        await createInitialEntity(Profession, profMock)
    }
}

module.exports = async () => {
    const qualities = await Quality.find()
    if (qualities.length !== qualMock.length) {
        await createInitialEntity(Quality, qualMock)
    }
}

async function createInitialEntity(Model, data) {
    await Model.collection.drop()
    return Promise.all(
        data.map(async item => {
            try {
                delete item._id
                const newItem = new Model(item)
                await newItem.save()
                return newItem
            } catch (e) {
                return e
            }
        })
    )
}
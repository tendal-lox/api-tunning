// Return error if there is the same isicId with the same managerNationalId and postalCode in adding request
try {
    const unitExistence = await db.unit.findAll({
        where: {
            managerNationalId: data.managerNationalId,
            postalCode: data.postalCode
        }
    })
    const arrayOfInputIsicId = data?.isicId.split(', ') || []

    if (unitExistence.length > 0) {
        unitExistence.forEach(item => {
            const arrayOfIsicIdInDB = item.isicId.split(', ')
            const status = arrayOfIsicIdInDB.some(each => arrayOfInputIsicId.includes(each))
            if (status) {
                return {
                    status: 403,
                    message: 'شناسه آسیک مورد نظر قبلا وارد شده است'
                }
            }
        })
    }
} catch (err) {
    return `Something went wrong during checking duplicated unit in adding unit request: ${err}`
}
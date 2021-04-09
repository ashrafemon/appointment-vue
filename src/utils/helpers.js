export const validateErrorPusher = (obj) => {
    let errors = []
    Object.keys(obj).map(key => {
        obj[key].map(item => errors.push(item))
    })
    return errors
}
export const messageSetter = (status, message) => {
    return {
        type: status === 'done' ? 'success' : status,
        text: message
    }
}
export const formDataBuilder = (obj) => {
    let formData = new FormData()
    Object.keys(obj).map(key => {
        formData.append(key, obj[key])
    })
    return formData
}
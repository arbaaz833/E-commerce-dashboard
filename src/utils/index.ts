export const objectToFormData = (
  obj: Record<string, any>,
  formData = new FormData(),
  parentKey = '',
) => {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      let propName = parentKey ? `${parentKey}[${key}]` : key
      if (typeof obj[key] === 'object' && !(obj[key] instanceof File)) {
        objectToFormData(obj[key], formData, propName)
      } else {
        console.log(`added ${propName}, ${obj[key]}`)
        formData.append(propName, obj[key])
      }
    }
  }
  return formData
}

import * as yup from 'yup'

const checkWordLength = (str, target = 40) => {
    const arr = str.split(' ');
    return (arr.filter(word => word !== '').length) < target;
}

const MAX_PRICE = 50 * 1000

const courseSchema = yup.object({
    title: yup.string().required().trim(),
    tagline: yup.string().required(),
    difficulty: yup.string().required(),
    category: yup.string().required(),
    about: yup.string().required(),
    price: yup.number().positive().integer().required().max(MAX_PRICE),
    thumbnail: yup.mixed().required()
}).required();  

export default courseSchema
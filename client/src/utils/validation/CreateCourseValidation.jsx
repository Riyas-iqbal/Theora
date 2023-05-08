import * as yup from 'yup'

const checkWordLength = (str, target = 40) => {
    const arr = str.split(' ');
    return (arr.filter(word => word !== '').length) < target;
}

const courseSchema = yup.object({
    title: yup.string().required().trim(),
    tagline: yup.string().required(),
    about: yup.string().required(),
    price: yup.number().positive().integer().required().max(1000 * 50),
    thumbnail: yup.mixed().required("Required")
}).required();

export default courseSchema
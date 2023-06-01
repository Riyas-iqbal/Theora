import * as yup from 'yup'


const lessonSchema = yup.object({
    title: yup.string().required().trim().min(3).max(30),
    description: yup.string().required().min(10).max(50),
}).required(); 

export default lessonSchema
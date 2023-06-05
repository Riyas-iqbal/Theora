import * as yup from 'yup'

// const URLRegex = /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm
const URLRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/


const profileSchema = yup.object({
    name: yup.string().required().trim().min(3).max(25),
    email: yup.string().email().required().trim(),
    phone: yup.string().matches(/^[0-9]+$/, 'Invalid Phone number').length(10),
    lastName: yup.string().trim().optional(),
    about: yup.string().optional(),
    website: yup.string().trim().test(
        'valid-url',
        'Invalid URL',
        value => {
            if (value && value.trim().length > 0) {
                return URLRegex.test(value.trim());
            }
            return true;
        }
    ).optional(),
})

export default profileSchema
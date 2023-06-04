import * as yup from 'yup'

const URL = /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm

const profileSchema = yup.object({
    name: yup.string().required().trim().min(3).max(25),
    email: yup.string().email().required().trim(),
    phone: yup.string().matches(/^[0-9]+$/,'Invalid Phone number').length(10),
    lastName: yup.string().min(3).max(25).trim(),
    about: yup.string(),
    // website: yup.string().test((value,no)=>{
    //     console.log(no)
    //     console.log(value)
    //     if (value) {
    //         return yup.string().matches(URL, 'URL Is not valid').trim()
    //     }
    //     return yup.string().optional()
    // }).optional(),
    website: yup.string().trim().test(
        'valid-url',
        'Invalid URL',
        value => {
          if (value && value.trim().length > 0) {
            const urlRegex = URL
            return urlRegex.test(value.trim());
          }
          return true;
        }
      ).optional(),
})

export default profileSchema
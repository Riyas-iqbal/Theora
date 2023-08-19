const userRepository = require('../repository/user.repository')
const firbaseService = require('./firebase.service')
const AppError = require('../utils/app.error.util')
const verifyToken = require('../utils/auth.util')
const { comparePasswords, createHashPassword } = require('../utils/bcrypt.util')
const { createAccessToken, createRefreshToken } = require('../utils/generate.tokens.util')

/**
 * Handles user sign-in.
 * @param {Object} credentials - User credentials. {email: string, password: string}
 * @returns {Promise<Object>} - Object with user data, access token, and refresh token.
 */

const handleSignIn = async ({ email, password }) => {
    let user = await userRepository.findUserByEmail(email)
    if (!user) throw AppError.validation('Email not registered')

    const isPasswordMatch = await comparePasswords(password, user.password)
    if (!isPasswordMatch) throw AppError.validation('Invalid Password')

    const isBlocked = await userRepository.checkIsBlocked(email)
    if (isBlocked) throw AppError.forbidden('Access denied')

    const { password: _, ...userWithoutPassword } = user.toObject()

    const accessToken = createAccessToken(userWithoutPassword)
    const refreshToken = createRefreshToken(userWithoutPassword)

    // commented until until database refresh token cleanUp is implemented
    await userRepository.addRefreshTokenById(user._id, refreshToken)

    return {
        user: userWithoutPassword,
        accessToken,
        refreshToken
    }
}

const handleSignUp = async ({ name, password, phone, email }) => {
    const isEmailTaken = await userRepository.findUserByEmail(email)
    if (isEmailTaken) {
        throw AppError.conflict('Email is already taken')
    }

    const isPhoneTaken = await userRepository.findUserByPhone(phone)
    if (isPhoneTaken) {
        throw AppError.conflict('Phone number is already taken')
    }

    const hashedPassword = await createHashPassword(password)

    const user = await userRepository.createUser({
        name,
        password: hashedPassword,
        phone,
        email
    })

    return user
}

const handleFirebaseSignIn = async (token) => {
    const { email } = await firbaseService.verifyToken(token)

    const user = await userRepository.findUserByEmail(email)
    if (!user) throw AppError.validation('Email not registered. Please create a new account')

    const isBlocked = await userRepository.checkIsBlocked(email)
    if (isBlocked) throw AppError.forbidden('Access denied')

    const { password: _, ...userWithoutPassword } = user.toObject()

    const accessToken = createAccessToken(userWithoutPassword)
    const refreshToken = createRefreshToken(userWithoutPassword)

    // commented until until database refresh token cleanUp is implemented
    await userRepository.addRefreshTokenById(user._id, refreshToken)

    return {
        user: userWithoutPassword,
        accessToken,
        refreshToken
    }
}

const getAccessTokenByRefreshToken = async refreshToken => {
    const user = await userRepository.findUserByToken(refreshToken)
    if (!user) {
        throw AppError.authentication('Invalid refresh token! please login again')
    }

    return verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET)
        .then(data => {
            const accessToken = createAccessToken(data)
            return accessToken
        })
        .catch(err => {
            console.log('error verifying refresh token - ', err)
            throw AppError.authentication(err.message)
        })
}

const getUserFromToken = async (accessToken) => {
    return verifyToken(accessToken, process.env.ACCESS_TOKEN_SECRET)
        .then(async data => await userRepository.findUserByEmail(data?.user.email))
        .catch(err => {
            console.log('error while decoding access token', err)
            return false
        })
    // if (!userData || !userData?.email) return false
}

// const checkPhoneExists = async (phone) => {
//     const isPhoneTaken = await User.findOne({ phone })
//     if (isPhoneTaken) {
//         return true
//     } else {
//         return false
//     }
// }

const checkTokenAndDelete = async (token) => {
    // const isTokenPresent = User.findOneAndUpdate({ token }, { $pull: { token } })
    const isTokenPresent = userRepository.findByTokenAndDelete(token)
    return isTokenPresent
}

const isEnrolledForCourse = async ({ courseId, userId }) => {
    const userData = await userRepository.findUserByCourseId({ courseId, userId })
    if (userData) {
        return true
    }
    return false
}

const getEnrolledStudentsCount = async (courseId) => {
    const enrolledStudentsCount = await userRepository.getEnrolledCountById(courseId)
    return enrolledStudentsCount
}

const getAllUsers = async () => {
    const users = await userRepository.getAllUsers()
    return users
}

const getUserDetails = async userId => {
    const userDetails = await userRepository.findUserById(userId)
    if (!userDetails) {
        throw AppError.validation('User details was not found in database')
    }
    return userDetails
}

const updateUserDetails = async userDetails => {
    const updatedUserDetails = await userRepository.updateDetailsById(userDetails)
    console.log(`User details updated for ${userDetails.name} : ${updatedUserDetails}`)
    return updatedUserDetails
}

const blockUser = async (userId) => {
    const isBlocked = await userRepository.blockUserById(userId)
    return isBlocked
}

const unblockUser = async (userId) => {
    const isBlocked = await userRepository.unblockUserById(userId)
    return isBlocked
}

module.exports = {
    getAllUsers, getEnrolledStudentsCount, updateUserDetails, updateUserDetails,
    handleSignIn, handleSignUp, blockUser, unblockUser, getUserDetails, getUserFromToken,
    isEnrolledForCourse, getAccessTokenByRefreshToken, checkTokenAndDelete, handleFirebaseSignIn
}


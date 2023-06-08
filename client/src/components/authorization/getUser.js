import { useSelector } from "react-redux";
import { getSignedInUserAPI } from "../../api/user";

function getUser() {
    const user = useSelector(state => state.user)
    if (user) return user
    return null;
}

const getLoggedInUserFromToken = async () => {
    return getSignedInUserAPI()
        .then(response => {
            if (response.data?.userData) {
                return response.data.userData
            }
            return null
        })
        .catch(err => {
            console.log('error getting logged in user', err)
        });
}

export {
    getLoggedInUserFromToken,
    getUser
}

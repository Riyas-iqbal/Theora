import { useSelector } from "react-redux";

export default function getUser() {
    const user = useSelector(state => state.user)
    console.log(user)
    if (user) return user
    return null;
}
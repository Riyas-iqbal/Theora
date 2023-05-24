import { useSelector } from "react-redux";

export default function getUser() {
    const user = useSelector(state => state.user)
    if (user) return user
    return null;
}
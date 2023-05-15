import { useSelector } from "react-redux";

export default function getuser() {
    const user = useSelector(state => state.user)
    if (user) return user
    return null;
}
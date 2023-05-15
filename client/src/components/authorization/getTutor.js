import { useSelector } from "react-redux";

export default function getTutor() {
    const tutor = useSelector(state => state.tutor)
    if (tutor) return tutor
    return null;
}
import axios from "axios";
export default axios.create({
    baseURL: "https://puzzled-bronze-wilderness.glitch.me",
    headers: {
        "Content-type": "application/json"
    }
});
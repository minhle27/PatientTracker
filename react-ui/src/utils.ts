import axios from "axios";
import { apiBaseUrl } from "./constants";

// To check if the server is up
export const pingBackend = () => {
    void axios.get<void>(`${apiBaseUrl}/ping`);
};
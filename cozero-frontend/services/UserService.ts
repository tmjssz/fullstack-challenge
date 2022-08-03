import { BACKEND_URL } from "../constants/backend.constants";
import { UserRegistrationDTO } from "../interfaces/user.dto";
import HTTPService from "./HTTPService";

class UserService {
    public async register(user: UserRegistrationDTO) {
        return HTTPService.post<UserRegistrationDTO>(`${BACKEND_URL}users/sign-up`, user);
    }
}

export default new UserService();
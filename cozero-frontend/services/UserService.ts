import { BACKEND_URL } from "../constants/backend.constants";
import { UserLoginDTO, UserRegistrationDTO } from "../interfaces/user.dto";
import HTTPService from "./HTTPService";
import LocalStorageService from "./LocalStorageService";

class UserService {
    public async register(user: UserRegistrationDTO) {
        return HTTPService.post<UserLoginDTO>('users/sign-up', user);
    }

    public async login(user: UserRegistrationDTO) {
        return  HTTPService.post<UserLoginDTO>('auth/login', user);
    }

}

export default new UserService();
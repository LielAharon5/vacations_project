import RoleModel from "./role-model";

class UserModel {
    
    public userId: number;
    public firstName: string;
    public lastName: string;
    public username: string;
    public password: string;
    public role: RoleModel;
}

export default UserModel
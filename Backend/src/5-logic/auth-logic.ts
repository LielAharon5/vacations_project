import { OkPacket } from "mysql"
import dal from "../2-utils/dal"
import { ResourceNotFoundErrorModel, UnauthorizedErrorModel, ValidationErrorModel } from "../4-models/error-model"
import UserModel from "../4-models/user-model";
import CredentialsModel from "../4-models/credentials-model";
import cyber from "../2-utils/cyber";
import RoleModel from "../4-models/role-model";


async function register(user:UserModel): Promise<string> {

    const errors = user.validate()
    if(errors) throw new ValidationErrorModel(errors)
    if (await isUsernameTaken(user.username)) throw new ValidationErrorModel(`Username ${user.username} already taken`);
    user.password = cyber.hash(user.password);

    // give user role 
    user.role = RoleModel.User

    const sql = `INSERT INTO users VALUES(DEFAULT, ?, ?, ?, ?, ?)`;
    const info:OkPacket = await dal.execute(sql, [user.firstName, user.lastName, user.username, user.password, user.role ])
    user.userId = info.insertId
    
    const token = cyber.getNewToken(user)
    return token
}


async function login(credentials:CredentialsModel): Promise<string> {
    
    const errors = credentials.validate()
    if(errors) throw new ValidationErrorModel(errors)

    credentials.password = cyber.hash(credentials.password);

    const sql = `SELECT * FROM users WHERE username = ? AND password = ?`;

    const users = await dal.execute(sql, [credentials.username, credentials.password]);

    // if user doesnt exist
    if (users.length === 0) throw new UnauthorizedErrorModel("Incorrect username or password");
    const user = users[0];
    const token = cyber.getNewToken(user);
    return token;
}

async function deleteUser(userId:number):Promise<void>{
    const sql = "DELETE FROM users WHERE userId = ?"
    const info: OkPacket = await dal.execute(sql, [userId])
    if(info.affectedRows === 0) throw new ResourceNotFoundErrorModel(userId)
    console.log("user Deleted")

}
// get all users - for checking only
async function getAllUsers(): Promise<UserModel[]>  {
    const sql = "SELECT * FROM users"
    const users = await dal.execute(sql)
    return users
}

async function isUsernameTaken(username: string): Promise<boolean> {
    const sql = "SELECT COUNT(*) FROM users WHERE username = ?";
    const count = await dal.execute(sql, [username]);
    const count2 = JSON.stringify(count[0])
    const counter = count2.slice(12,13)

    return Number(counter)>0
}

export default {
    register,
    login,
    deleteUser,
    getAllUsers,



}
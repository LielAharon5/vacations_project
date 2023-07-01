class AppConfig {

    public vacationsUrl = "http://localhost:3001/api/vacations/"
    public registerUrl = "http://localhost:3001/api/auth/register/";
    public loginUrl = "http://localhost:3001/api/auth/login/";
    public reportsUrl = "http://localhost:3001/api/vacations/reports/";
    public usersUrl = "http://localhost:3001/api/users/";
}

const appConfig = new AppConfig()
export default appConfig
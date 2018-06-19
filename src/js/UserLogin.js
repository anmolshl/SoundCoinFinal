import { GlobalHelpers } from "./GlobalHelpers";
var UserLogin = (function () {
    function UserLogin() {
        this.fs = require("fs");
        this.helpers = new GlobalHelpers();
        this.loadSoundAccess();
        this.credentialsCorrect = false;
    }
    UserLogin.prototype.login = function (userName, pass) {
        var that = this;
        return new Promise(function (fulfill, reject) {
            if (typeof that.userDatJs === "undefined") {
                reject({
                    code: 400,
                    body: {
                        error: "Could not load user database!"
                    }
                });
            }
            else {
                if (that.checkIfUserExistsGlobally(userName)) {
                    var passx = that.getUserPass(userName);
                    if (pass === passx) {
                        that.credentialsCorrect = true;
                        that.loggedIn = true;
                        that.loggedInUser = userName;
                        fulfill({
                            code: 204,
                            body: {
                                success: "Login was successful!"
                            }
                        });
                    }
                }
                else {
                    reject({
                        code: 400,
                        body: {
                            error: "User not found"
                        }
                    });
                }
            }
        });
    };
    UserLogin.prototype.checkIfUserExistsGlobally = function (userName) {
        return this.checkIfUserExistsInList(userName, this.userDatJs['streamers']) || this.checkIfUserExistsInList(userName, this.userDatJs['consumers']) || this.checkIfUserExistsInList(userName, this.userDatJs['adAgencies']);
    };
    UserLogin.prototype.checkIfUserExistsInList = function (userName, userArr) {
        var res = false;
        for (var _i = 0, userArr_1 = userArr; _i < userArr_1.length; _i++) {
            var userx = userArr_1[_i];
            if (userx['userName'] === userName) {
                res = true;
                break;
            }
        }
        return res;
    };
    UserLogin.prototype.getUserPass = function (userName) {
        var res = "";
        var artistArr = this.userDatJs['creators'];
        for (var _i = 0, artistArr_1 = artistArr; _i < artistArr_1.length; _i++) {
            var userx = artistArr_1[_i];
            if (userx['userName'] === userName) {
                res = userx["passWord"];
                break;
            }
        }
        artistArr = this.userDatJs['streamers'];
        if (res.length === 0) {
            for (var _a = 0, artistArr_2 = artistArr; _a < artistArr_2.length; _a++) {
                var userx = artistArr_2[_a];
                if (userx['userName'] === userName) {
                    res = userx["passWord"];
                    break;
                }
            }
        }
        artistArr = this.userDatJs['adAgencies'];
        if (res.length === 0) {
            for (var _b = 0, artistArr_3 = artistArr; _b < artistArr_3.length; _b++) {
                var userx = artistArr_3[_b];
                if (userx['userName'] === userName) {
                    res = userx["passWord"];
                    break;
                }
            }
        }
        return res;
    };
    UserLogin.prototype.loadSoundAccess = function () {
        if (this.fs.existsSync("./Dat/UserDatabase.json")) {
            this.userDatStr = this.fs.readFileSync("./Dat/UserDatabase.json", "utf8");
            this.userDatJs = JSON.parse(this.userDatStr);
        }
        if (this.fs.existsSync("./Dat/SongDatabase.json")) {
            this.songDatStr = this.fs.readFileSync("./Dat/SongDatabase.json", "utf8");
            this.songDatJs = JSON.parse(this.songDatStr);
        }
    };
    return UserLogin;
}());
export { UserLogin };
//# sourceMappingURL=UserLogin.js.map
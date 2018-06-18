var UserCl = (function () {
    function UserCl(userName, passWord, type, ethAddress) {
        this.userName = userName;
        this.passWord = passWord;
        this.type = type;
        this.ethAddress = ethAddress;
    }
    UserCl.prototype.getUsername = function () {
        return this.userName;
    };
    UserCl.prototype.getUserType = function () {
        return this.type;
    };
    UserCl.prototype.getethAddress = function () {
        return this.ethAddress;
    };
    UserCl.prototype.getethPass = function () {
        return this.passWord;
    };
    return UserCl;
}());
export { UserCl };
//# sourceMappingURL=UserCl.js.map
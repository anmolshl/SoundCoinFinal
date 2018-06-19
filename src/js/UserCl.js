var UserCl = (function () {
    function UserCl(userName, passWord, type, ethAddress, loyalty) {
        this.userName = userName;
        this.passWord = passWord;
        this.type = type;
        this.ethAddress = ethAddress;
        this.loyaltyPerStream = loyalty;
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
    UserCl.prototype.getUserLoyalty = function () {
        return this.loyaltyPerStream;
    };
    return UserCl;
}());
export { UserCl };
//# sourceMappingURL=UserCl.js.map
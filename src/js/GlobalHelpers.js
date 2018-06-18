var GlobalHelpers = (function () {
    function GlobalHelpers() {
    }
    GlobalHelpers.prototype.checkIfUserExists = function (listOfUsers, user) {
        var res = false;
        for (var _i = 0, listOfUsers_1 = listOfUsers; _i < listOfUsers_1.length; _i++) {
            var userx = listOfUsers_1[_i];
            if (user.getUsername() === userx['userName'] || user.getethAddress() === userx['ethAddress']) {
                res = true;
                break;
            }
        }
        return res;
    };
    return GlobalHelpers;
}());
export { GlobalHelpers };
//# sourceMappingURL=GlobalHelpers.js.map
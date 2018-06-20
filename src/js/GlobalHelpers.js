class GlobalHelpers {

    constructor() {
    }

    checkIfUserExists(listOfUsers, user) {
        var res = false;
        for (var _i = 0, listOfUsers_1 = listOfUsers; _i < listOfUsers_1.length; _i++) {
            var userx = listOfUsers_1[_i];
            if (user.getUsername() === userx['userName'] || user.getethAddress() === userx['ethAddress']) {
                res = true;
                break;
            }
        }
        return res;
    }
}


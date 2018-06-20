class UserCl {

    constructor(userName, passWord, type, ethAddress, loyalty) {
        this.userName = userName;
        this.passWord = passWord;
        this.type = type;
        this.ethAddress = ethAddress;
        this.loyaltyPerStream = loyalty;
    }

    getUsername () {
        return this.userName;
    }

    getUserType () {
        return this.type;
    }

    getethAddress() {
        return this.ethAddress;
    }

    getethPass() {
        return this.passWord;
    }

    getUserLoyalty() {
        return this.loyaltyPerStream;
    }
}

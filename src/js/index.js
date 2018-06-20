window.Web3 = Web3;

class applicationAPI {

    constructor(){
        this.contractAddress = "0x4a8d470f6a6fbaa472d2d63f126d3bb0623dff9c";
        this.SoundAccess = new SoundAccess();
        this.helpers = new GlobalHelpers();
        if(typeof this.web3 != 'undefined'){
            console.log("Using web3 detected from external source like Metamask")
            this.web3 = new Web3(web3.currentProvider);
        }else{
            this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
        }
        this.web3.eth.defaultAccount = this.web3.eth.accounts[0];
        const MyContract = this.web3.eth.contract([{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"fundsWallet","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"version","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"unitsOneEthCanBuy","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalEthInWei","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"},{"name":"_extraData","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}]);
        this.ContractInstance = MyContract.at(applicationAPI.contractAddress);
    }

    //Returns a Promise
    addUser(userName, passWord, type, ethAddress){
        if(type === "Creator") {
            return this.SoundAccess.addUser(userName, passWord, type, ethAddress, BigNumber(30000000000));
        }
        else{
            return this.SoundAccess.addUser(userName, passWord, type, ethAddress, BigNumber(0));
        }
    }

    //Returns a Promise
    removeUser(userName, passWord){
        return this.SoundAccess.removeUser(userName, passWord);
    }

    //Returns a Promise
    addSong(song, artistID, songID, passWord){
        return this.SoundAccess.addSong(song, artistID, songID, passWord);
    }

    //Returns a Promise
    removeSong(songID, pass, artistID){
        return this.SoundAccess.removeSong(songID, pass, artistID);
    }

    getListOfAllSongs(){
        return SoundAccess.getListOfSongs();
    }

    //Returns a Promise
    transferTokenWhenStreaming(userNameFrom, songID){
        let that = this;
        return new Promise(function (fulfill, reject) {
            var fromEthAddr = SoundAccess.getUserEthAddress(userNameFrom);
            that.ContractInstance.approve(fromEthAddr, BigNumber(300000000));
            that.ContractInstance.transferFrom(SoundAccess.getUserEthAddress(userNameFrom), SoundAccess.getArtistEthAddressFromSongID(songID), BigNumber(300000000), (err, res) => {
                if(typeof err === undefined){
                    fulfill({
                        code: 204,
                        body: {
                            success: "Transfer successful!"
                        }
                    })
                }
                else{
                    reject({
                        code: 404,
                        body: {
                            err: err
                        }
                    })
                }
            })
        })
    }

    //Returns a Promise
    getBalanceFromContract(userName){
        return new Promise(function (fulfill, reject) {
            that.ContractInstance.balanceOf(SoundAccess.getUserEthAddress(userName), (err, res) => {
                if(typeof err === undefined){
                    fulfill({
                        code: 204,
                        body: {
                            success: res
                        }
                    })
                }
                else{
                    reject({
                        code: 404,
                        body: {
                            err: err
                        }
                    })
                }
            })
        })
    }

    logInUser(userName, passWord) {
        this.loginData = new UserLogin();
        this.loginData.login(userName, passWord);
    }

    getLoggedInUser(){
        return this.loginData.getLoggedInUserName();
    }
}


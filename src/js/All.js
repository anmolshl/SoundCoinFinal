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

class SongData {

    constructor(name, songID, artist, assocEthAddr) {
        this.name = name;
        this.songID = songID;
        this.artist = artist;
        this.assocEthAddr = assocEthAddr;
    }
}

class SoundAccess {

    constructor() {
        this.helpers = new GlobalHelpers();
        //this.loadSoundAccess();
    }

    addUser(userName, pass, userType, ethAddress, loyalty) {
        var that = this;
        return new Promise(function (fulfill, reject) {
            if (typeof that.userDatJs === "undefined") {
                var user = new UserCl(userName, pass, userType, ethAddress, loyalty);
                if (typeof that.userDatJs === "undefined") {
                    var newDataset = new UserTypeArrs();
                    if (userType === "Streamer") {
                        newDataset.streamers.push(user);
                    }
                    else if (userType === "Creator") {
                        newDataset.creators.push(user);
                    }
                    else if (userType === "Ad Agency") {
                        newDataset.adAgencies.push(user);
                    }
                    else {
                        reject({
                            code: 400,
                            body: {
                                error: "Invalid user type!"
                            }
                        });
                    }
                    that.userDatStr = JSON.stringify(newDataset);
                    that.userDatJs = JSON.parse(that.userDatStr);
                    fulfill({
                        code: 204,
                        body: {
                            success: "Added user to database!"
                        }
                    });
                }
                else {
                    if (userType === "Streamer") {
                        var streamers = that.userDatJs["streamers"];
                        if (that.helpers.checkIfUserExists(streamers, user)) {
                            reject({
                                code: 404,
                                body: {
                                    error: "User already exists!"
                                }
                            });
                        }
                        else {
                            streamers.push(user);
                            that.userDatJs["streamers"] = streamers;
                            fulfill({
                                code: 204,
                                body: {
                                    success: "Added user to database!"
                                }
                            });
                        }
                    }
                    else if (userType === "Creator") {
                        var creators = that.userDatJs["creators"];
                        if (that.helpers.checkIfUserExists(creators, user)) {
                            reject({
                                code: 404,
                                body: {
                                    error: "User already exists!"
                                }
                            });
                        }
                        else {
                            creators.push(user);
                            that.userDatJs["creators"] = creators;
                            fulfill({
                                code: 204,
                                body: {
                                    success: "Added user to database!"
                                }
                            });
                        }
                    }
                    else if (userType === "Ad Agency") {
                        var adAgencies = that.userDatJs["adAgencies"];
                        if (that.helpers.checkIfUserExists(adAgencies, user)) {
                            reject({
                                code: 404,
                                body: {
                                    error: "User already exists!"
                                }
                            });
                        }
                        else {
                            adAgencies.push(user);
                            that.userDatJs["adAgencies"] = adAgencies;
                            fulfill({
                                code: 204,
                                body: {
                                    success: "Added user to database!"
                                }
                            });
                        }
                    }
                    else {
                        reject({
                            code: 400,
                            body: {
                                error: "Invalid user type!"
                            }
                        });
                    }
                }
            }
            else {
                var user = new UserCl(userName, pass, userType, ethAddress, loyalty);
                if (userType === "Streamer") {
                    var streamers = that.userDatJs["streamers"];
                    if (that.helpers.checkIfUserExists(streamers, user)) {
                        reject({
                            code: 404,
                            body: {
                                error: "User already exists!"
                            }
                        });
                    }
                    else {
                        streamers.push(user);
                        that.userDatJs["streamers"] = streamers;
                        fulfill({
                            code: 204,
                            body: {
                                success: "Added user to database!"
                            }
                        });
                    }
                }
                else if (userType === "Creator") {
                    var creators = that.userDatJs["creators"];
                    if (that.helpers.checkIfUserExists(creators, user)) {
                        reject({
                            code: 404,
                            body: {
                                error: "User already exists!"
                            }
                        });
                    }
                    else {
                        creators.push(user);
                        that.userDatJs["creators"] = creators;
                        fulfill({
                            code: 204,
                            body: {
                                success: "Added user to database!"
                            }
                        });
                    }
                }
                else if (userType === "Ad Agency") {
                    var adAgencies = that.userDatJs["adAgencies"];
                    if (that.helpers.checkIfUserExists(adAgencies, user)) {
                        reject({
                            code: 404,
                            body: {
                                error: "User already exists!"
                            }
                        });
                    }
                    else {
                        adAgencies.push(user);
                        that.userDatJs["adAgencies"] = adAgencies;
                        fulfill({
                            code: 204,
                            body: {
                                success: "Added user to database!"
                            }
                        });
                    }
                }
                else {
                    reject({
                        code: 400,
                        body: {
                            error: "Invalid user type!"
                        }
                    });
                }
            }
        });
    }

    removeUser(userName, pass) {
        var that = this;
        return new Promise(function (fulfill, reject) {
            if (typeof that.userDatJs === "undefined")) {
            reject({
                code: 404,
                body: {
                    error: "Database does not exist!"
                }
            });
        }
    else {
            var res = that.deleteUser(userName, pass);
            if (res) {
                fulfill({
                    code: 204,
                    body: {
                        success: "Deleted user from database!"
                    }
                });
            }
            else {
                reject({
                    code: 404,
                    body: {
                        error: "Could not find a matching user to delete!"
                    }
                });
            }
        }
    });
}

addSong(song, artistID, songID, pass) {
    var that = this;
    return new Promise(function (fulfill, reject) {
        if (typeof that.songDatJs === "undefined")) {
        var ethAddress = that.getArtistEthAddr(artistID);
        if (ethAddress.length === 0) {
            reject({
                code: 400,
                body: {
                    error: "No matching ETH address found!"
                }
            });
        }
        else {
            var newSong = new SongData(song, songID, artistID, ethAddress);
            var userPass = that.getArtistPass(artistID);
            if (userPass === pass) {
                var songArr = [];
                songArr.push(newSong);
                that.songDatStr = JSON.stringify(songArr);
                that.songDatJs = JSON.parse(that.songDatStr);
                fulfill({
                    code: 204,
                    body: {
                        success: "Added song to database!"
                    }
                });
            }
            else {
                reject({
                    code: 400,
                    body: {
                        error: "Password mismatch!"
                    }
                });
            }
        }
    }
else {
        if (that.doesSongExist(songID)) {
            reject({
                code: 400,
                body: {
                    error: "Song already exists in database!"
                }
            });
        }
        else {
            var ethAddress = that.getArtistEthAddr(artistID);
            if (ethAddress.length === 0) {
                reject({
                    code: 400,
                    body: {
                        error: "No matching ETH address found!"
                    }
                });
            }
            else {
                var newSong = new SongData(song, songID, artistID, ethAddress);
                var userPass = that.getArtistPass(artistID);
                if (userPass === pass) {
                    var newSongJSStr = JSON.stringify(newSong);
                    that.songDatJs.push(JSON.parse(newSongJSStr));
                    that.songDatStr = JSON.stringify(that.songDatJs);
                    fulfill({
                        code: 204,
                        body: {
                            success: "Added song to database!"
                        }
                    });
                }
            }
        }
    }
});
}

removeSong(songID, pass, artistID) {
    var that = this;
    return new Promise(function (fulfill, reject) {
        if (typeof that.userDatJs === "undefined") {
            reject({
                code: 404,
                body: {
                    error: "Database does not exist!"
                }
            });
        }
        else {
            if (that.doesSongExist(songID) && pass === that.getArtistPass(artistID)) {
                var res = that.deleteSong(songID);
                if (res) {
                    fulfill({
                        code: 204,
                        body: {
                            success: "Deleted song from database!"
                        }
                    });
                }
                else {
                    reject({
                        code: 404,
                        body: {
                            error: "Unknown error occurred!"
                        }
                    });
                }
            }
            else {
                reject({
                    code: 404,
                    body: {
                        error: "Password mismatch/Song does not exist!"
                    }
                });
            }
        }
    });
}

/*destroySoundAccess() {
    if (existsSync("./Dat/SongDatabase.json")) {
        this.fs.unlinkSync("./Dat/SongDatabase.json");
    }
    if (existsSync("./Dat/UserDatabase.json")) {
        this.fs.unlinkSync("./Dat/UserDatabase.json");
    }
}

commitSoundAccess() {
    if (existsSync("./Dat/SongDatabase.json")) {
        this.fs.writeFileSync("./Dat/SongDatabase.json", JSON.stringify(this.songDatJs));
    }
    if (existsSync("./Dat/UserDatabase.json")) {
        this.fs.writeFileSync("./Dat/UserDatabase.json", JSON.stringify(this.userDatJs));
    }
}

commitUserDat() {
    this.fs.writeFileSync("./Dat/UserDatabase.json", JSON.stringify(this.userDatJs));
}

commitSongDat() {
    this.fs.writeFileSync("./Dat/SongDatabase.json", JSON.stringify(this.songDatJs));
}

loadSoundAccess() {
    if (this.fs.existsSync("./Dat/UserDatabase.json")) {
        this.userDatStr = this.fs.readFileSync("./Dat/UserDatabase.json", "utf8");
        this.userDatJs = JSON.parse(this.userDatStr);
    }
    if (this.fs.existsSync("./Dat/SongDatabase.json")) {
        this.songDatStr = this.fs.readFileSync("./Dat/SongDatabase.json", "utf8");
        this.songDatJs = JSON.parse(this.songDatStr);
    }
}*/

deleteUser(userName, pass) {
    var popped = false;
    var streamers = this.userDatJs['streamers'];
    var creators = this.userDatJs['creators'];
    var adAgencies = this.userDatJs['adAgencies'];
    if (!popped) {
        for (var _i = 0, streamers_1 = streamers; _i < streamers_1.length; _i++) {
            var userx = streamers_1[_i];
            if (userx['userName'] === userName && userx['passWord'] === pass) {
                var index = streamers.indexOf(userx);
                streamers.splice(index, 1);
                popped = true;
            }
        }
    }
    if (!popped) {
        for (var _a = 0, creators_1 = creators; _a < creators_1.length; _a++) {
            var userx = creators_1[_a];
            if (userx['userName'] === userName && userx['passWord'] === pass) {
                var index = creators.indexOf(userx);
                creators.splice(index, 1);
                popped = true;
            }
        }
    }
    if (!popped) {
        for (var _b = 0, adAgencies_1 = adAgencies; _b < adAgencies_1.length; _b++) {
            var userx = adAgencies_1[_b];
            if (userx['userName'] === userName && userx['passWord'] === pass) {
                var index = adAgencies.indexOf(userx);
                adAgencies.splice(index, 1);
                popped = true;
            }
        }
    }
    return popped;
}

getArtistEthAddr(userName) {
    var res = "";
    var artistArr = this.userDatJs['creators'];
    for (var _i = 0, artistArr_1 = artistArr; _i < artistArr_1.length; _i++) {
        var userx = artistArr_1[_i];
        if (userx['userName'] === userName) {
            res = userx["ethAddress"];
            break;
        }
    }
    return res;
}

getArtistPass(userName) {
    var res = "";
    var artistArr = this.userDatJs['creators'];
    for (var _i = 0, artistArr_2 = artistArr; _i < artistArr_2.length; _i++) {
        var userx = artistArr_2[_i];
        if (userx['userName'] === userName) {
            res = userx["passWord"];
            break;
        }
    }
    return res;
}

doesSongExist(songID) {
    var res = false;
    for (var _i = 0, _a = this.songDatJs; _i < _a.length; _i++) {
        var songx = _a[_i];
        if (songx['songID'] === songID) {
            res = true;
            break;
        }
    }
    return res;
}

deleteSong(songID) {
    var res = false;
    var songDatJSx = this.songDatJs;
    for (var _i = 0, songDatJSx_1 = songDatJSx; _i < songDatJSx_1.length; _i++) {
        var songx = songDatJSx_1[_i];
        if (songx['songID'] === songID) {
            var index = songDatJSx.indexOf(songx);
            songDatJSx.splice(index, 1);
            var songDatStrx = JSON.stringify(songDatJSx);
            this.songDatStr = songDatStrx;
            this.songDatJs = JSON.parse(this.songDatStr);
            res = true;
            break;
        }
    }
    return res;
}

getUserEthAddress(userName) {
    var res = "";
    var artistArr = this.userDatJs['creators'];
    for (var _i = 0, artistArr_3 = artistArr; _i < artistArr_3.length; _i++) {
        var userx = artistArr_3[_i];
        if (userx['userName'] === userName) {
            res = userx["ethAddress"];
            break;
        }
    }
    artistArr = this.userDatJs['streamers'];
    if (res.length === 0) {
        for (var _a = 0, artistArr_4 = artistArr; _a < artistArr_4.length; _a++) {
            var userx = artistArr_4[_a];
            if (userx['userName'] === userName) {
                res = userx["passWord"];
                break;
            }
        }
    }
    artistArr = this.userDatJs['adAgencies'];
    if (res.length === 0) {
        for (var _b = 0, artistArr_5 = artistArr; _b < artistArr_5.length; _b++) {
            var userx = artistArr_5[_b];
            if (userx['userName'] === userName) {
                res = userx["passWord"];
                break;
            }
        }
    }
    return res;
}

getArtistEthAddressFromSongID(songID) {
    var res = "";
    var songArr = this.songDatJs;
    for (var _i = 0, songArr_1 = songArr; _i < songArr_1.length; _i++) {
        var songx = songArr_1[_i];
        if (songx['songID'] === songID) {
            res = songx['assocEthAddr'];
            break;
        }
    }
    return res;
}

getListOfSongs() {
    return this.songDatJs;
}
}

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

class UserTypeArrs {
    constructor() {
        this.streamers = [];
        this.creators = [];
        this.adAgencies = [];
    }
}

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


class UserLogin {

    constructor() {
        //this.fs = require("fs");
        this.helpers = new GlobalHelpers();
        //this.loadSoundAccess();
        this.credentialsCorrect = false;
        this.soundAccess = new SoundAccess();
    }

    login(userName, pass) {
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
    }

    checkIfUserExistsGlobally(userName) {
        return this.checkIfUserExistsInList(userName, this.userDatJs['streamers']) || this.checkIfUserExistsInList(userName, this.userDatJs['consumers']) || this.checkIfUserExistsInList(userName, this.userDatJs['adAgencies']);
    }

    checkIfUserExistsInList(userName, userArr) {
        var res = false;
        for (var _i = 0, userArr_1 = userArr; _i < userArr_1.length; _i++) {
            var userx = userArr_1[_i];
            if (userx['userName'] === userName) {
                res = true;
                break;
            }
        }
        return res;
    }

    getUserPass(userName) {
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
    }

    loadSoundAccess() {
        if (this.fs.existsSync("./Dat/UserDatabase.json")) {
            this.userDatStr = this.fs.readFileSync("./Dat/UserDatabase.json", "utf8");
            this.userDatJs = JSON.parse(this.userDatStr);
        }
        if (this.fs.existsSync("./Dat/SongDatabase.json")) {
            this.songDatStr = this.fs.readFileSync("./Dat/SongDatabase.json", "utf8");
            this.songDatJs = JSON.parse(this.songDatStr);
        }
    };

    getLoggedInUserName() {
        return this.loggedInUser;
    }
}


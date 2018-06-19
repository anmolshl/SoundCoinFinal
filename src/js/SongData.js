class SongData {

    private name;
    private songID;
    private artist;
    private assocEthAddr;

    constructor(name, songID, artist, assocEthAddr) {
        this.name = name;
        this.songID = songID;
        this.artist = artist;
        this.assocEthAddr = assocEthAddr;
    }
}
export {SongData};

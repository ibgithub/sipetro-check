export class Srf {
    public date: string;
    public serverName: string;
    public fileName: string;
    public fileSize: string;
    public lastModifiedDate: string;
    public lastModifiedTime: string;
    constructor(date: string, serverName: string, fileName: string, fileSize: string, lastModifiedDate: string, lastModifiedTime: string) {
        this.date = date;
        this.serverName = serverName;
        this.fileName = fileName;
        this.fileSize = fileSize;
        this.lastModifiedDate = lastModifiedDate;
        this.lastModifiedTime = lastModifiedTime;
    }
}
  
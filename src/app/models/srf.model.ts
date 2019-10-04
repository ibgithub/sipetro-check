export class Srf {
    public date: string;
    public serverName: string;
    public fileName: string;
    public fileSize: string;
    public lastModified: string;
    constructor(date: string, serverName: string, fileName: string, fileSize: string, lastModified: string) {
        this.date = date;
        this.serverName = serverName;
        this.fileName = fileName;
        this.fileSize = fileSize;
        this.lastModified = lastModified;
    }
}
  
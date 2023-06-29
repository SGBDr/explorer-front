export interface Directory{
    name: string;
    url: string;
    fileList: File[];
    directoryList: Directory[];
    id: number;
}
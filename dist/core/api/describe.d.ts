export interface ApiDescribe {
    (label: string, callback: () => void): void;
}
export declare let describe: ApiDescribe;

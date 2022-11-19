declare class Table {
    private readonly _name;
    private readonly _url;
    constructor(name: string, url: string);
    private fetchRoute;
    query<T extends object>(sql: string): Promise<T[]>;
    insert<T extends object>(items: object[], returning?: string | null): Promise<T>;
    update<T extends object>(item: object, where: string, returning?: string | null): Promise<T>;
    upsert<T extends object>(item: T, where: string, returning?: string | null): Promise<T>;
    delete(condition: string): Promise<any>;
}

declare class WinteraClient {
    private readonly _url;
    constructor(url: string);
    table(name: string): Table;
}
declare function winteraClient(url: string): WinteraClient;

export { WinteraClient, winteraClient };

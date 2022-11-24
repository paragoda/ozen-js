declare class Table$1 {
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
    table(name: string): Table$1;
}
declare function winteraClient(url: string): WinteraClient;

declare class TypeBuilder {
    protected _name: string;
    constructor(name: string);
    pk(): this;
    optional(): this;
    unique(): this;
    check(): void;
}
declare class NumBuilder extends TypeBuilder {
    unsigned(): void;
}
declare class IntBuilder extends NumBuilder {
    autoincrement(): void;
}

type NumberType = 'bit' | 'smallint' | 'int' | 'bigint' | 'float' | 'double' | 'decimal'
type NumberField = {
  type: NumberType
}

type DataTimeType = 'date' | 'time' | 'datetime' | 'timestamp'
type StringType = 'varchar' | 'text' | 'uuid'

type StringField = {
  type: StringType | DataTimeType
}

/*
  T = basic type of field on frontend
*/
type Field<T> =
  T extends string ? StringField :
  T extends object ? JsonField :
  T extends number ? NumberField :
  T extends boolean ? BoolField :
  never

type WinteraServerInit<T extends object> = {
  url: string
  token: string // admin token
  auth: boolean
  tables: {
    [key in keyof T]: Table<T[key]> // change to model
  }
}


// TODO: define
type Access = any

type AccessInit<T> = (fields: {
  [key in keyof T]: string // just contain name of field, need for comfortable rename and 'typesafe'
}) => Partial<{
  select: Access,
  insert: Access,
  update: Access,
  delete: Access
}>

type TableInit<T extends object> = {
  fields: {
    [key in keyof T]: Field<T[key]>
  }
  access?: AccessInit<T>
}

type Fields<T extends object> = {
  [key in keyof T]: Field
}


type Table<T extends object> = {
  fields: Fields<T>
  access?: AccessInit<T>
}

declare class WinteraServer<T extends object> {
    private _init;
    constructor(init: WinteraServerInit<T>);
    client(): void;
    route(name: string, sql: string): void;
}
declare const server: <T extends object>(init: WinteraServerInit<T>) => WinteraServer<T>;

declare function table<T extends object>(data: TableInit<T>): Table<T>;

declare class ColBuilder {
    bit: () => TypeBuilder;
    smallint: () => IntBuilder;
    int: () => IntBuilder;
    bigint: () => IntBuilder;
    float: () => NumBuilder;
    double: () => NumBuilder;
    decimal: () => NumBuilder;
    date: () => TypeBuilder;
    time: () => TypeBuilder;
    datetime: () => TypeBuilder;
    timestamp: () => TypeBuilder;
    bool: () => TypeBuilder;
    uuid: () => TypeBuilder;
    text: () => TypeBuilder;
    varchar(size: number): TypeBuilder;
    enum: (...options: string[]) => TypeBuilder;
    json: () => TypeBuilder;
    fk(key: TypeBuilder, independ?: boolean): TypeBuilder;
}
declare const cb: ColBuilder;

declare function anyone(): void;
declare function nobody(): void;
declare function authorized(): void;
declare function userId(field: any): void;

declare const access_anyone: typeof anyone;
declare const access_nobody: typeof nobody;
declare const access_authorized: typeof authorized;
declare const access_userId: typeof userId;
declare namespace access {
  export {
    access_anyone as anyone,
    access_nobody as nobody,
    access_authorized as authorized,
    access_userId as userId,
  };
}

declare const wql: any;

export { ColBuilder, WinteraClient, WinteraServer, access as ab, cb, server, table, winteraClient, wql };

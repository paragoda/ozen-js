"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  ColBuilder: () => ColBuilder,
  WinteraClient: () => WinteraClient,
  WinteraServer: () => WinteraServer,
  ab: () => access_exports,
  cb: () => cb,
  server: () => server,
  table: () => table,
  winteraClient: () => winteraClient,
  wql: () => wql
});
module.exports = __toCommonJS(src_exports);

// src/client/table.ts
var headers = {};
function json(data) {
  return JSON.stringify(data);
}
var Table = class {
  constructor(name, url) {
    this._name = name;
    this._url = url;
  }
  async fetchRoute(route, method, body) {
    const url = `${this._url}${encodeURIComponent(route)}`;
    const data = await fetch(url, { headers, method, body });
    return await data.json();
  }
  async query(sql) {
    return await this.fetchRoute(`/api/db/${sql}`, "GET");
  }
  async insert(items, returning = "*") {
    return await this.fetchRoute(
      `/api/db/${this._name}`,
      "POST",
      json({ values: items, returning })
    );
  }
  async update(item, where, returning = "*") {
    return await this.fetchRoute(
      `/api/db/${this._name}`,
      "PATCH",
      json({ values: item, where, returning })
    );
  }
  async upsert(item, where, returning = "*") {
    return await this.fetchRoute(
      `/api/db/${this._name}`,
      "PUT",
      json({ values: item, where, returning })
    );
  }
  async delete(condition) {
    return await this.fetchRoute(`/api/db//${this._name}?where=${condition}`, "DELETE");
  }
};
var table_default = Table;

// src/client/index.ts
var WinteraClient = class {
  constructor(url) {
    this._url = url;
  }
  table(name) {
    return new table_default(name, this._url);
  }
};
function winteraClient(url) {
  return new WinteraClient(url);
}

// src/server/server.ts
var WinteraServer = class {
  constructor(init) {
    this._init = init;
  }
  client() {
  }
  route(name, sql) {
  }
};
var server = (init) => new WinteraServer(init);

// src/server/table.ts
function table(data) {
  let fields = {};
  return {
    access: data.access,
    fields
  };
}

// src/server/builders/type.ts
var TypeBuilder = class {
  constructor(name) {
    this._name = name;
  }
  pk() {
    return this;
  }
  optional() {
    return this;
  }
  unique() {
    return this;
  }
  check() {
  }
};
var NumBuilder = class extends TypeBuilder {
  unsigned() {
  }
};
var IntBuilder = class extends NumBuilder {
  autoincrement() {
    this._name = this._name.replace("int", "autoincrement");
  }
};

// src/server/builders/col.ts
var tb = (name) => new TypeBuilder(name);
var nb = (name) => new NumBuilder(name);
var ib = (name) => new IntBuilder(name);
var ColBuilder = class {
  constructor() {
    this.bit = () => tb("bit");
    this.smallint = () => ib("smallint");
    this.int = () => ib("int");
    this.bigint = () => ib("bigint");
    this.float = () => nb("float");
    this.double = () => nb("double");
    this.decimal = () => nb("decimal");
    this.date = () => tb("date");
    this.time = () => tb("time");
    this.datetime = () => tb("datetime");
    this.timestamp = () => tb("timestamp");
    this.bool = () => tb("bool");
    this.uuid = () => tb("uuid");
    this.text = () => tb("text");
    this.enum = (...options) => tb("enum()");
    this.json = () => tb("json");
  }
  varchar(size) {
    if (size < 1)
      throw new Error();
    return tb(`varchar(${size})`);
  }
  fk(key, independ = false) {
    return tb("key");
  }
};
var cb = new ColBuilder();

// src/server/builders/access.ts
var access_exports = {};
__export(access_exports, {
  anyone: () => anyone,
  authorized: () => authorized,
  nobody: () => nobody,
  userId: () => userId
});
function anyone() {
}
function nobody() {
}
function authorized() {
}
function userId(field) {
}

// src/server/index.ts
var wql = {};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ColBuilder,
  WinteraClient,
  WinteraServer,
  ab,
  cb,
  server,
  table,
  winteraClient,
  wql
});

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
  WinteraClient: () => WinteraClient,
  winteraClient: () => winteraClient
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  WinteraClient,
  winteraClient
});

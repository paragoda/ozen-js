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
export {
  WinteraClient,
  winteraClient
};

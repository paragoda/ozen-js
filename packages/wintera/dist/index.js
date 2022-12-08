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
  Model: () => Model,
  WinteraClient: () => WinteraClient,
  WinteraServer: () => WinteraServer,
  ab: () => access_exports,
  cb: () => cb,
  model: () => model,
  server: () => server,
  table: () => table,
  w: () => w,
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

// src/client/model.ts
function json2(data) {
  return JSON.stringify(data);
}
var Where = class {
  constructor(condition, fields) {
    this.condition = condition;
    this.fields = fields;
  }
  async update(values) {
    try {
      const data = await fetch("/table", {
        method: "PATCH",
        body: JSON.stringify({
          where: this.condition,
          output: this.fields,
          values
        })
      });
      const json3 = await data.json();
      return [json3, true];
    } catch (error) {
      return [new Error("update failed"), false];
    }
  }
};
var Output = class {
  where(condition) {
    const cb2 = {};
    return new Where(condition(cb2), this.fields);
  }
  constructor(fields) {
    this.fields = fields;
  }
  async insert(values) {
    try {
      const data = await fetch("/table", {
        method: "POST",
        body: JSON.stringify({
          output: this.fields,
          values
        })
      });
      const json3 = await data.json();
      return [json3, true];
    } catch (error) {
      return [new Error("insert failed"), false];
    }
  }
};
var NoOutputWhere = class {
  constructor(condition) {
    this.condition = condition;
  }
  async update(values) {
    try {
      await fetch("/table", {
        method: "PATCH",
        body: JSON.stringify({
          where: this.condition,
          values
        })
      });
      return null;
    } catch (error) {
      return new Error("update without output failed");
    }
  }
};
var Model = class {
  constructor(schema) {
    this.schema = schema;
  }
  async insert(values) {
    try {
      await fetch("/table", {
        method: "POST",
        body: json2(values)
      });
      return null;
    } catch {
      return new Error("insert without output failed");
    }
  }
  async delete(condition) {
    try {
      const cb2 = {};
      const where = condition(cb2);
      await fetch(`/table?where=${where}`, { method: "DELETE" });
      return null;
    } catch (error) {
      return new Error("delete failed");
    }
  }
  where(condition) {
    const cb2 = {};
    return new NoOutputWhere(condition(cb2));
  }
  output(build) {
    const fieldNames = {};
    for (let key in Object.keys(this.schema)) {
      Object.defineProperty(fieldNames, key, key);
    }
    const fields = build(fieldNames);
    return new Output(Object.values(fields));
  }
  upsert() {
  }
};
function model(schema) {
  return new Model(schema);
}

// src/client/schema/flags.ts
var FlagField = class {
  constructor(type) {
    this.type = type;
  }
  build() {
    const build = this.type.build();
    const flag = this.flag();
    if (build.flags) {
      build.flags.push(flag);
    } else {
      build.flags = [flag];
    }
    return build;
  }
};
var Nullable = class extends FlagField {
  flag() {
    return "nullable";
  }
};
var Defaulted = class extends FlagField {
  flag() {
    return "defaulted";
  }
};

// src/client/schema/base.ts
var ClientFieid = class {
  build() {
    return { type: this.type() };
  }
  nullable() {
    return new Nullable(this);
  }
  defaulted() {
    return new Defaulted(this);
  }
};

// src/client/schema/fields.ts
var BoolField = class extends ClientFieid {
  type() {
    return "bool";
  }
};
var StringField = class extends ClientFieid {
};
var TextField = class extends StringField {
  type() {
    return "text";
  }
};
var VarcharField = class extends StringField {
  type() {
    return "varchar";
  }
};
var UuidField = class extends StringField {
  type() {
    return "uuid";
  }
};
var NumberField = class extends ClientFieid {
};
var SmallintField = class extends NumberField {
  type() {
    return "smallint";
  }
};
var IntField = class extends NumberField {
  type() {
    return "int";
  }
};
var BigintField = class extends NumberField {
  type() {
    return "bigint";
  }
};
var FloatField = class extends NumberField {
  type() {
    return "float";
  }
};
var DoubleField = class extends NumberField {
  type() {
    return "double";
  }
};
var DecimalField = class extends NumberField {
  type() {
    return "decimal";
  }
};

// src/client/schema/index.ts
var W = class {
  smallint() {
    return new SmallintField();
  }
  int() {
    return new IntField();
  }
  bigint() {
    return new BigintField();
  }
  float() {
    return new FloatField();
  }
  double() {
    return new DoubleField();
  }
  decimal() {
    return new DecimalField();
  }
  date() {
  }
  time() {
  }
  datetime() {
  }
  timestamp() {
  }
  bool() {
    return new BoolField();
  }
  text() {
    return new TextField();
  }
  varchar() {
    return new VarcharField();
  }
  uuid() {
    return new UuidField();
  }
  json() {
  }
  enum() {
  }
};
var w = new W();

// src/client/index.ts
var WinteraClient = class {
  constructor(url) {
    this._url = url;
  }
  table(name) {
    return new table_default(name.toString(), this._url);
  }
  query(sql) {
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
var Field = class {
  constructor() {
    this.isPk = false;
    this.isOptional = false;
    this.isUnique = false;
  }
  pk() {
    this.isPk = true;
    return this;
  }
  optional() {
    this.isOptional = true;
    return this;
  }
  unique() {
    this.isUnique = true;
    return this;
  }
  check(condition) {
    this.checkStr = condition;
    return this;
  }
};
var NumberField2 = class extends Field {
  constructor(type) {
    super();
    this.type = type;
  }
};
var IntField2 = class extends NumberField2 {
  constructor(type) {
    super(type);
    this.isAutoincrement = false;
  }
  autoincrement() {
    this.isAutoincrement = true;
    return this;
  }
};
var StringField2 = class extends Field {
  constructor(type) {
    super();
    this.type = type;
  }
};
var JsonField = class extends Field {
  constructor() {
    super(...arguments);
    this.type = "json";
  }
};

// src/server/builders/col.ts
var ColBuilder = class {
  constructor() {
    this.smallint = () => new IntField2("smallint");
    this.int = () => new IntField2("int");
    this.bigint = () => new IntField2("bigint");
    this.bit = () => new NumberField2("bit");
    this.float = () => new NumberField2("float");
    this.double = () => new NumberField2("double");
    this.decimal = () => new NumberField2("decimal");
    this.date = () => new StringField2("date");
    this.time = () => new StringField2("time");
    this.datetime = () => new StringField2("datetime");
    this.timestamp = () => new StringField2("timestamp");
    this.bool = () => ({
      type: "bool"
    });
    this.uuid = () => ({
      type: "uuid"
    });
    this.text = () => new StringField2("text");
    this.json = () => new JsonField();
  }
  varchar(size) {
    if (size < 1)
      throw new Error("Varchar size can't be less than 1");
    return new StringField2("varchar");
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
  Model,
  WinteraClient,
  WinteraServer,
  ab,
  cb,
  model,
  server,
  table,
  w,
  winteraClient,
  wql
});

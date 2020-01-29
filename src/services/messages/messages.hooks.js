const { authenticate } = require("@feathersjs/authentication").hooks;
const { setNow } = require("feathers-hooks-common");
const { setField } = require("feathers-authentication-hooks");

module.exports = {
  before: {
    all: [authenticate("jwt")],
    find: [],
    get: [],
    create: [
      setNow("createdAt"),
      setField({ from: "params.user._id", as: "data.userId" })
    ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};

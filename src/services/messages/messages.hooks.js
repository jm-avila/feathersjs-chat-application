const { authenticate } = require("@feathersjs/authentication").hooks;
const { setNow } = require("feathers-hooks-common");
const { setField } = require("feathers-authentication-hooks");
const tempHook = () => context => {
  const { params, data } = context;
  console.log({ from: params.user._id, as: data.userId });
  console.log("context", context);
  return context;
};
module.exports = {
  before: {
    all: [authenticate("jwt")],
    find: [],
    get: [],
    create: [
      setNow("createdAt"),
      setField({ from: "params.user._id", as: "data.userId" })
    ],
    update: [setField({ from: "params.user._id", as: "data.userId" })],
    patch: [setField({ from: "params.user._id", as: "data.userId" })],
    remove: [
      setField({ from: "params.user._id", as: "data.userId" }),
      tempHook()
    ]
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

// class Handler {
//   get(instance, method) {
//     return instance[method];
//   }
// }

export default class TestProxy {
  static wrap(instance) {
    return new Proxy(instance, { get: () => () => {} });
  }
}

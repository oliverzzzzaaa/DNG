class Sockethandler {
  handlerMap = new Map();

  static handle(payload) {
    const type = payload.type;
    const handler = this.handlerMap.get(type);
    if (handler) {
      handle(payload.data);
    }
  }
}


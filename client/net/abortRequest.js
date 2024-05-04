class AbortRequest {
  constructor() {
    this.list = new Map();
  }

  create(key, config) {
    const controller = new AbortController();
    config.signal = controller.signal;
    if (this.list.has(key)) {
      controller.abort();
    } else {
      this.list.set(key, controller);
    }
  }

  remove(key) {
    this.list.delete(key);
  }
}

export default AbortRequest;

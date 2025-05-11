export default class Resource<T> {
  protected resource: T;
  constructor(resource: T) {
    this.resource = resource;
  }

  toArray(): any {}

  static collection(resources: Array<any>): any[] {
    return resources.map((resource) => new this(resource).toArray());
  }

  static make(resource: any): any {
    return new this(resource).toArray();
  }
}

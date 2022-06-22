export class Box<K, V = any> extends Map<K, V> {
  public add<T extends V>(key: K, instance: T): void {
    if (!this.has(key)) {
      super.set(key, instance);
    }
  }

  public set<T extends V>(key: K, instance: T): this {
    super.set(key, instance);
    return this;
  }

  public get<T extends V>(key: K): T | undefined {
    return super.get(key) as T;
  }

  public delete<T extends V>(key: K): boolean {
    return super.delete(key);
  }
}

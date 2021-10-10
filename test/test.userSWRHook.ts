const useSWR: SWRHook = () => {
    throw new Error('not implmented')
}

const cond: () => boolean = () => {
  throw new Error('not implmented')
}

function useTest() {
  
  useSWR("/api/user", (url) => url);
  useSWR(cond() ? "/api/user" : null, (url) => url);

  useSWR({ a: "1", b: { c: "3" } }, (url) => url);
  useSWR(cond() ? { a: "1", b: { c: "3", d: 2,  }} : null, key => key);

  useSWR([{ a: "1", b: { c: "3" } }, [1231, '888'], { a: 123 }],  (...args) => [...args]);
  useSWR(cond() ? [{ a: "1", b: { c: "3" } }, [1231, '888'], { a: 123 }] : null,(...args) => [...args]);


  useSWR([{ a: "1", b: { c: "3" } }, [1231, '888'], { a: 123 }] as const, (...args) => [...args]);
  useSWR(cond() ? [{ a: "1", b: { c: "3" } }, [1231, '888'], { a: 123 }] as const :null, (...args) => [...args]);

  useSWR(() => "/api/user",(url) => url);
  useSWR(() => cond() ? "/api/user" : null,(url) => url);

  useSWR(() => ({ a: "1", b: { c: "3" } }),  key => key);
  useSWR(() => cond() ? ({ a: "1", b: { c: "3" } }) : null, key => key);

  useSWR(() => [{ a: "1", b: { c: "3" } }, [1231, '888'], { a: 123 }],key => key)
  useSWR(() => cond() ? [{ a: "1", b: { c: "3" } }, [1231, '888'], { a: 123 }] : null, key => key)

  useSWR(() => [{ a: "1", b: { c: "3" } }, [1231, '888'], { a: 123 }] as const,key => key)
  useSWR(() => cond() ? [{ a: "1", b: { c: "3" } }, [1231, '888'], { a: 123 }] as const : null, key => key)
}

export type Result<T = unknown> = T | Promise<T>
export type TupleKey = [any, ...unknown[]] | readonly [any, ...unknown[]]
export type ValueKey = string | null | TupleKey | Record<any, any>
export type Key = ValueKey | (() => ValueKey)

export type Fetcher<Data = unknown, Args extends Key = Key> =
  /**
   * () => [{ foo: string }, { bar: number }] | null
   *
   * () => ( [{ foo: string }, { bar: number } ] as const | null )
   */
  Args extends (() => readonly [...infer K] | null)
    ? ((...args: [...K]) => Result<Data>)
    : /**
     * [{ foo: string }, { bar: number } ] | null
     *
     * [{ foo: string }, { bar: number } ] as const | null
     */
    Args extends (readonly [...infer K])
    ? ((...args: [...K]) => Result<Data>)
    : /**
     * () => string | null
     * () => Record<any, any> | null
     */
    Args extends (() => infer T | null)
    ? (...args: [T]) => Result<Data>
    : /**
     *  string | null | Record<any,any>
     */
    Args extends null
    ? never
    : Args extends (infer T)
    ? (...args: [T]) => Result<Data>
    : never


export interface SWRHook {
  <Data = any, Args extends Key = Key>(args: Args): Data
  <Data = any, Args extends Key = Key>(
    args: Args,
    fn: Fetcher<Data, Args> | null
  ): Data
  <Data = any, Args extends Key = Key>(
    ...args: [Args] | [Args, Fetcher<Data, Args> | null]
  ): Data
}

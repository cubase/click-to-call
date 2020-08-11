export type ConcernSeparationHook<O extends {}, M extends {}, I> = (
  input: I
) => {
  operations: O
  models: M
}

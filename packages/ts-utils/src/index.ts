export const noop = (): void => {};

export { pipe } from "./pipe.js";
export { slugify } from "./slugify.js";
export { uuid } from "./uuid.js";
export { groupBy, groupByAdapter, multipleGroupBy, multipleGroupByAdapter } from "./group-by.js";
export type {
  GroupedData,
  MultipleGroupedData,
  GroupByAdapterItem,
  MultipleGroupByAdapterItem,
} from "./group-by.js";

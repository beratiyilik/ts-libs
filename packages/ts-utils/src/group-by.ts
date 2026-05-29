export type GroupedData<T> = Record<string, T[]>;

export type MultipleGroupedData<T> = T[] | { [key: string]: MultipleGroupedData<T> };

export type GroupByAdapterItem<T> = {
  key: string;
  count: number;
  data: T[];
};

export type MultipleGroupByAdapterItem<T> = {
  key: string;
  count: number;
  data: MultipleGroupByAdapterItem<T>[] | T[];
};

export const groupBy = <T>(data: T[], key: keyof T): GroupedData<T> =>
  data.reduce<GroupedData<T>>((acc, item) => {
    const keyValue = String(item[key]);
    if (!acc[keyValue]) acc[keyValue] = [];
    acc[keyValue]!.push(item);
    return acc;
  }, {});

export const groupByAdapter = <T>(groupedData: GroupedData<T>): GroupByAdapterItem<T>[] =>
  Object.keys(groupedData).map((key) => ({
    key,
    count: groupedData[key]!.length,
    data: groupedData[key]!,
  }));

export const multipleGroupBy = <T>(
  data: T[],
  keys: ReadonlyArray<keyof T>,
): MultipleGroupedData<T> => {
  if (keys.length === 0) return data;
  const [firstKey, ...remainingKeys] = keys;
  const grouped = groupBy(data, firstKey!) as Record<string, T[]>;
  if (remainingKeys.length === 0) return grouped;
  const result: Record<string, MultipleGroupedData<T>> = {};
  for (const k of Object.keys(grouped)) {
    result[k] = multipleGroupBy(grouped[k]!, remainingKeys);
  }
  return result;
};

export const multipleGroupByAdapter = <T>(
  groupedData: MultipleGroupedData<T>,
): MultipleGroupByAdapterItem<T>[] => {
  if (Array.isArray(groupedData)) return [];
  return Object.keys(groupedData).map((key) => {
    const value = (groupedData as Record<string, MultipleGroupedData<T>>)[key]!;
    return {
      key,
      count: Array.isArray(value) ? value.length : Object.keys(value).length,
      data: Array.isArray(value) ? value : multipleGroupByAdapter(value),
    };
  });
};

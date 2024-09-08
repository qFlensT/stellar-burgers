export type SliceState<DataFieldName extends string, DataFieldType> = {
  isLoading: boolean;
  isInitialized: boolean;
  error: unknown | null;
} & { [key in DataFieldName]: DataFieldType | null };

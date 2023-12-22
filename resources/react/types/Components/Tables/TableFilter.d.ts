import useTable from "@/hooks/useTable";

export type TableFilterProps = ReturnType<typeof useTable> & {
  searchPlaceholder?: string
};

import useTable from "@/hooks/useTable";

export type FilterProductsContainerProps = ReturnType<typeof useTable> & {
  children?: React.ReactNode,
  attributes?: React.HTMLAttributes<HTMLDivElement>,
  searchPlaceholder?: string
};

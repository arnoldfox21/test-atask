import { useGetUserList } from "@/services/users";
import { useMemo, useRef, useState } from "react";
import ListUser from "@/components/ListUser";
import Head from "next/head";

interface QueryParams {
  q: string;
  limit: number;
  per_page: number;
}

const defaultQuery = {
  q: "user",
  limit: 5,
  per_page: 5,
};

export default function Home() {
  const [query, setQuery] = useState<QueryParams>(defaultQuery);
  const refSearch = useRef<HTMLInputElement>(null);

  const { data, isLoading } = useGetUserList(query);

  const handleSearch = () => {
    const name = refSearch?.current?.value;
    setQuery((prev) => ({ ...prev, q: String(name) }));
  };

  const Loading = useMemo(() => {
    if (isLoading) {
      return (
        <div className="w-full gap-x-3 opacity-50 h-full absolute top-0 left-0 z-20 flex justify-center items-center">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] text-gray-700"
            role="status"
          ></div>
          <span className="text-gray-500">Loading...</span>
        </div>
      );
    }
  }, [isLoading]);

  return (
    <div className="justify-items-center py-4 w-full h-screen p-4">
      <Head>
        <title>ATASK</title>
      </Head>
      <main className="flex flex-col border border-gray-100 rounded-lg gap-y-2 p-2 min-h-[50vh] w-full sm:max-w-[60%] sm:items-start text-gray-600">
        <div className="flex flex-col w-full gap-y-2">
          <input
            ref={refSearch}
            onKeyDown={(event) => {
              if (event?.key === "Enter") {
                handleSearch();
              }
            }}
            placeholder="Enter Username"
            className="p-2 rounded-sm text-gray-500 bg-gray-100 border border-gray-200 w-full"
          />
          <button
            onClick={handleSearch}
            disabled={isLoading}
            className="bg-blue-400 hover:bg-blue-500 cursor-pointer disabled:opacity-60 p-2 text-white rounded-sm"
          >
            Search
          </button>
        </div>
        {query?.q !== defaultQuery?.q && (
          <div>Showing user for &quot;{query?.q}&quot;</div>
        )}
        {/* list */}

        <div className="w-full min-h-20 relative">
          {Loading}

          <ListUser data={data?.items} />
        </div>
      </main>
    </div>
  );
}

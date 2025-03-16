import { useGetRepos } from "@/services/users";
import React, { useMemo, useState } from "react";

interface ListUserProps {
  data: values[];
}

interface values {
  id: number;
  login: string;
  score: string;
}

interface repos {
  name: string;
  id: number;
  description: string;
  stargazers_count: string;
}

const ListUser: React.FC<ListUserProps> = ({ data }) => {
  const [selected, setSelected] = useState<values | null>(null);

  const { data: repos, isLoading } = useGetRepos(selected?.login);

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

  const handleOpen = (user: values) => {
    if (selected?.id === user?.id) {
      setSelected(null);
    } else {
      setSelected(user);
    }
  };

  return (
    <div className="w-full flex flex-col gap-y-3">
      {data?.map((value) => (
        <div className="flex flex-col z-10 w-full" key={value?.id}>
          <button
            type="button"
            onClick={() => handleOpen(value)}
            className="flex p-2 cursor-pointer hover:bg-gray-200 rounded-sm bg-gray-100 items-center justify-between w-full font-medium border border-gray-200 gap-3"
          >
            <span>{value?.login}</span>
            <svg
              className={`w-3 h-3 shrink-0 ${
                selected?.id === value?.id ? "" : "rotate-180"
              }`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5 5 1 1 5"
              />
            </svg>
          </button>

          <div
            className={
              selected?.id === value?.id
                ? "flex transition-all duration-300 ease-in-out w-full"
                : "hidden"
            }
          >
            <div className="p-5 border flex relative min-h-24 flex-col justify-between rounded-sm bg-gray-300 m-3 mr-0 border-gray-200 w-full">
              {Loading}
              {repos?.map((field: repos) => (
                <div className="w-full flex border-b border-dashed py-2 justify-between" key={field?.id}>
                  <div>
                    <span className="font-bold">{field?.name}</span>
                    <div>{field?.description}</div>
                  </div>
                  <div className="flexitems-start">
                    <div className="items-center gap-x-3 flex">
                      <span className="font-bold">{field?.stargazers_count}</span>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 100 100"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <polygon
                          points="50,5 61.25,35 95,35 68.75,55 79.5,85 50,65 20.5,85 31.25,55 5,35 38.75,35"
                          fill="black"
                          stroke="black"
                          stroke-width="2"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListUser;

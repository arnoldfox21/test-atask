import { useQuery } from "react-query";
import { request } from "utils/request"

interface QueryParams {
  q: string
}

const useGetUserList = (queryParam: QueryParams) => {
  return useQuery(["userList", queryParam], () =>
    request({
      url: "/search/users",
      method: "GET",
      params: queryParam,
    })
  );
};

const useGetRepos = (user: string | undefined) => {
  return useQuery(["repos", user], () =>
    request({
      url: `/users/${user}/repos`,
      method: "GET",
    }), {
      enabled: Boolean(user)
    }
  );
};

export { useGetUserList, useGetRepos }
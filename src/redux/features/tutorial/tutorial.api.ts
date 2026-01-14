import { baseApi } from "@/redux/baseApi";
import { IResponse } from "@/types/global";
import { ITutorial } from "@/types/tutorial";

const tutorialApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTutorials: build.query<IResponse<ITutorial[]>, undefined>({
      query: () => ({
        url: "/tutorials",
        method: "GET",
      }),
    }),
    addTutorial: build.mutation<
      IResponse<ITutorial>,
      Pick<ITutorial, "title" | "url">
    >({
      query: (payload) => ({
        url: `/tutorials`,
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useGetTutorialsQuery, useAddTutorialMutation } = tutorialApi;

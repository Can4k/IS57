import {createStore} from "vuex";
import axios from "axios";
import loaderModule from "@/store/modules/LoaderModule";

export default createStore({
    state: {
        API: "https://back.is57.ru",
        MAP: {
            GetStartDate: "/date",
            GetResults: "/results"
        },
        StartDate: null
    },
    getters: {},
    mutations: {
        UpdateStartDate(state, value) {
            state.StartDate = value;
        }
    },
    actions: {
        async GetStartDate(context) {
            const url = context.state.API + context.state.MAP.GetStartDate;
            const response = await axios.get(url);

            if (response.statusText !== "OK") {
                context.commit('UpdateStartDate', new Date(Number.MAX_SAFE_INTEGER));
                return
            }

            context.commit('UpdateStartDate', new Date(response.data));
        },

        async GetResults(context) {
            const url = context.state.API + context.state.MAP.GetResults;
            const response = await axios.get(url);

            if (response.statusText !== "OK") {
                return null
            }

            const data = response.data;

            const Result = {
                List: [],
                MaxResult: 0
            };

            for (const block_id in data) {
                Result.List.push(data[block_id]);
            }

            for (const block_id in data) {
                data[block_id].team.totalResult = 0;
                data[block_id].team.id = block_id;

                for (const task of data[block_id].results) {
                    data[block_id].team.totalResult += task.result;
                }
            }

            Result.MaxResult = Math.max(...Result.List.map(block => block.team.totalResult), 1);

            return Result
        }
    },
    modules: {
        LoaderModule: loaderModule
    },
})

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

            let TotalResultsArray = [];

            let FirstResultArray = [];
            let ThirdResultArray = [];

            for (const block_id in data) {
                data[block_id].team.totalResult = 0;
                data[block_id].team.id = block_id;

                for (const task of data[block_id].results) {
                    data[block_id].team.totalResult += task.result;
                }

                TotalResultsArray.push({
                    result: data[block_id].team.totalResult,
                    block_id
                });

                if (data[block_id].team.building === 1) {
                    FirstResultArray.push({
                        result: data[block_id].team.totalResult,
                        block_id
                    });
                } else {
                    ThirdResultArray.push({
                        result: data[block_id].team.totalResult,
                        block_id
                    });
                }
            }



            TotalResultsArray = TotalResultsArray.sort((a, b) => {
                return a.result === b.result ? 0 : (a.result < b.result ? -1 : 1);
            });

            FirstResultArray = FirstResultArray.sort((a, b) => {
                return a.result === b.result ? 0 : (a.result < b.result ? -1 : 1);
            });

            ThirdResultArray = ThirdResultArray.sort((a, b) => {
                return a.result === b.result ? 0 : (a.result < b.result ? -1 : 1);
            });

            for (let i = 0; i < TotalResultsArray.length; i++) {
                data[TotalResultsArray[i].block_id].team.all_place = TotalResultsArray.length - i;
            }

            for (let i = 0; i < ThirdResultArray.length; i++) {
                data[ThirdResultArray[i].block_id].team.local_place = ThirdResultArray.length - i;
            }

            for (let i = 0; i < FirstResultArray.length; i++) {
                data[FirstResultArray[i].block_id].team.local_place = FirstResultArray.length - i;
            }

            Result.MaxResult = Math.max(...Result.List.map(block => block.team.totalResult), 1);

            return Result
        }
    },
    modules: {
        LoaderModule: loaderModule
    },
})

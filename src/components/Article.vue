<template>
    <v-row>
        <v-col cols="8" sm="7" md="10" lg="10" v-for="article in articleThisPage" :key="i"
            class="mx-lg-0 mx-md-0 mx-sm-auto mx-auto">
            <v-card :title="article.title" :subtitle="article.displayLink" :text="article.snippet"
                :href="article.link"></v-card>
        </v-col>
    </v-row>
</template>

<script>
import {GOOGLEAPI_KEY, CUSTOMERSEARCH_CX} from '../common/constants';

export default {
    props: ['pageIndex'],
    data: () => ({
        searchResults: [],
    }),
    methods: {
        getSearchResults: async function () {
            let queries = ['band maid インタビュー', 'band maid interview']
            let titles = []
            for (let q of queries) {
                let startIndex = 1
                while (true) {
                    const japRes = await fetch(`https://www.googleapis.com/customsearch/v1?key=${GOOGLEAPI_KEY}&cx=${CUSTOMERSEARCH_CX}&q=${q}&start=${startIndex}`)
                    const japData = await japRes.json()
                    for (let item of japData.items) {
                        if(!titles.includes(item.title)){
                            this.searchResults.push(item)
                            titles.push(item.title)
                        }
                    }
                    if (!japData.queries.nextPage) {
                        break
                    } else {
                        startIndex = japData.queries.nextPage[0].startIndex
                    }
                }
            }
            console.log(this.searchResults)
        },
    },
    mounted() {
        this.getSearchResults()
    },
    computed: {
        articleThisPage() {
            return this.searchResults.slice(10 * this.pageIndex - 10, 10 * this.pageIndex)
        }
    }
}
</script>

<style></style>
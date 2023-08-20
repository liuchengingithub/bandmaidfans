<template>
    <v-row>
        <v-col cols="12" sm="12" md="6" lg="4" v-for="video in loading ? 8 : videoInfosThisPage" :key="video.items[0].id"
            class="mx-xs-auto">
            <v-skeleton-loader type="card-avatar" :loading="loading">
                <v-card class="content-bg card mx-auto" :max-width="card.maxWidth" flat tile router
                    :href="setUrl(video.items[0].id)">
                    <v-img :src="setImgSrc(video)" height="200px"></v-img>
                    <v-row no-gutters>
                        <v-col>
                            <v-card-title class="pl-2 pt-1">
                                {{ video.items[0].snippet.title }}
                            </v-card-title>
                            <v-card-subtitle class="pl-2 pb-0">
                                {{ video.items[0].snippet.channelTitle }}
                            </v-card-subtitle>
                            <v-card-subtitle class="pl-2 pt-0">
                                {{ this.$utils.viewsFomatter(video.items[0].statistics.viewCount) }} views
                                <v-icon>mdi-circle-small</v-icon>
                                {{ this.$utils.dateFormatter(video.items[0].snippet.publishedAt) }}
                            </v-card-subtitle>
                        </v-col>
                    </v-row>
                </v-card>
            </v-skeleton-loader>
        </v-col>
    </v-row>
</template>
  
<script>
import {GOOGLEAPI_KEY} from '../common/constants';
export default {
    props: {
        card: Object,
        pageIndex: Number,
        videoTab: String
    },
    data() {
        return {
            videoInfos: [],
            allVideoInfos: [],
            newVideoInfos: [],
            mvVideoInfos: [],
            reactionVideoInfos: [],
            liveVideoInfos: [],
            error: '',
        }
    },
    methods: {
        getVideoId: async function (category, pageToken, videoIdList) {
            let url
            switch (category) {
                case 'new':
                    url = `https://www.googleapis.com/youtube/v3/search?q=band maid&key=${GOOGLEAPI_KEY}&part=id&type=video&maxResults=45&pageToken=${pageToken}&order=date`
                    break;
                case 'MV':
                    url = `https://www.googleapis.com/youtube/v3/search?channelId=UCJToUvYrmkmTCR-bluEaQfA&key=${GOOGLEAPI_KEY}&part=id&type=video&maxResults=45&pageToken=${pageToken}`
                    break;
                case 'reaction':
                    url = `https://www.googleapis.com/youtube/v3/search?q=band maid react&key=${GOOGLEAPI_KEY}8&part=id&type=video&maxResults=45&pageToken=${pageToken}`
                    break;
                case 'live':
                    url = `https://www.googleapis.com/youtube/v3/search?q=band maid live&key=${GOOGLEAPI_KEY}&part=id&type=video&maxResults=45&pageToken=${pageToken}`
                    break;
                default:
                    url = `https://www.googleapis.com/youtube/v3/search?q=band maid&key=${GOOGLEAPI_KEY}&part=id&type=video&maxResults=45&pageToken=${pageToken}`
                    break;
            }
            let res = await fetch(url)
            if (res.status === 200) {
                let data = await res.json()
                for (let item of data.items) {
                    videoIdList.push(item.id.videoId)
                }
                return [data.nextPageToken, videoIdList]
            } else {
            }
        },
        getVideoInfo: async function (category) {
            let list
            switch (category) {
                case 'new':
                    list = this.newVideoInfos
                    break;
                case 'MV':
                    list = this.mvVideoInfos
                    break;
                case 'reaction':
                    list = this.reactionVideoInfos
                    break;
                case 'live':
                    list = this.liveVideoInfos
                    break;
                default:
                    list = this.allVideoInfos
                    break;
            }
            let [pageToken, videoIdList] = await this.getVideoId(category, '', [])
            let [, videoIdFinalList] = await this.getVideoId(category, pageToken, videoIdList)
            for (let id of videoIdFinalList) {
                let res = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${id}&key=${GOOGLEAPI_KEY}`)
                if (res.status === 200) {
                    let data = await res.json()
                    list.push(data)
                } else {
                }
            }
        },
        setUrl(videoId) {
            return "https://www.youtube.com/watch?v=" + videoId
        },
        setImgSrc(video) {
            let thumbnails = video.items[0].snippet.thumbnails
            let src
            if (thumbnails.standard) {
                src = thumbnails.standard.url
            } else if (thumbnails.maxres) {
                src = thumbnails.maxres.url
            } else if (thumbnails.high) {
                src = thumbnails.high.url
            } else if (thumbnails.medium) {
                src = thumbnails.medium.url
            } else {
                src = thumbnails.default.url
            }
            return src
        }
    },
    mounted() {
        this.videoInfos = this.allVideoInfos
        this.getVideoInfo('all')
    },
    computed: {
        videoInfosThisPage() {
            return this.videoInfos.slice(9 * this.pageIndex - 9, 9 * this.pageIndex)
        }
    },
    watch: {
        videoTab: async function (newTab) {
            switch (newTab) {
                case 'new':
                    this.videoInfos = this.newVideoInfos
                    break;
                case 'MV':
                    this.videoInfos = this.mvVideoInfos
                    break;
                case 'reaction':
                    this.videoInfos = this.reactionVideoInfos
                    break;
                case 'live':
                    this.videoInfos = this.liveVideoInfos
                    break;
                default:
                    this.videoInfos = this.allVideoInfos
                    break;
            }
            if (this.videoInfos.length === 0) {
                await this.getVideoInfo(newTab)
            }
        }
    }
}
</script>
  
<style></style>
  
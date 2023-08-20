<template>
    <div class="container">
        <div v-if="error" class="d-flex justify-center">
            <h1 class="noInfoMsg">
                エラーが発生しました
            </h1>
        </div>
        <div v-else-if="!error && !media">
            <div class="noInfoMsg">
                投稿はまだありません
            </div>
        </div>
        <v-list v-else>
            <v-list-item v-for="(item, i) in media" :key="i" :value="item" color="primary" rounded="shaped" @click="window.open(item.permalink, _blank)">
                <v-card>
                    <v-row>
                        <v-col class="media">
                            <video v-if="item.media_type === 'VIDEO'" controls width="495">
                                <source :src="item.media_url" type="video/mp4" />
                            </video>
                            <v-img v-else-if="item.media_type === 'IMAGE'" :src="item.media_url"></v-img>
                            <v-carousel v-else hide-delimiter-background show-arrows="hover">
                                <v-carousel-item v-for="child in item.children.data" :key="child.id" :value="child.id"
                                    :src="child.media_url"></v-carousel-item>
                            </v-carousel>
                        </v-col>
                        <v-col cols="6" class="d-flex align-end flex-column text">
                            <v-divider></v-divider>
                            <div class="d-flex justify-start mt-2 overflow-y top">
                                <div>
                                    <v-avatar size="40">
                                        <v-img :src="imgs[memberId - 1]" />
                                    </v-avatar>
                                </div>
                                <div class="ml-2 mr-2">
                                    <p class="d-inline username">{{ item.username }}</p>
                                    <v-icon icon="mdi-check-decagram" size="x-small" color="info"
                                        class="d-inline mx-2"></v-icon>
                                    <p class="d-inline caption">{{ item.caption }}</p>
                                    <div class="mt-2 timestamp">{{ this.$utils.dateFormatter(item.timestamp) }}</div>
                                    <!-- <div>
                                        {{ item.comments[0] }}
                                    </div> -->
                                </div>
                            </div>
                            <div class="mt-auto bottom" style="width: 100%;">
                                <v-divider></v-divider>
                                <v-row class="mt-2 ">
                                    <!-- <v-col>
                                        <v-icon icon="mdi-heart-outline" size="large" class="mx-2"></v-icon>
                                        <v-icon icon="mdi-comment-outline" size="large" class="mx-2"></v-icon>
                                        <v-icon icon="mdi-send-outline" size="large" class="mx-2"></v-icon>
                                    </v-col>
                                    <v-col cols="2">
                                        <v-icon icon="mdi-bookmark-outline" size="large" class="mx-2 justify-end"></v-icon>
                                    </v-col> -->
                                    <v-col>
                                        <v-icon icon="mdi-heart-outline" size="large" class="mx-2"></v-icon>
                                        いいね！{{ item.like_count }}件
                                    </v-col>
                                </v-row>
                            </div>


                        </v-col>
                    </v-row>

                </v-card>

            </v-list-item>
        </v-list>
    </div>
</template>

<script>
import {INSTAGRAM_BUSINESS_ACCOUNT, INSTAGRAM_ACCESS_TOKEN} from '../common/constants'

export default {
    props: ['memberId'],
    data() {
        return {
            media: [],
            mediaId: [],
            member: ['bandmaid.jp', 'kobatomiku', 'saiki_bandmaid', 'kanami_bandmaid', 'akane_bandmaid', 'misa_bandmaid'],
            imgs: ['/bandmaidfans/bandmaid.png', '/bandmaidfans/kobato.jpg', '/bandmaidfans/saiki.jpg', '/bandmaidfans/kanami.jpg', '/bandmaidfans/akane.jpg', '/bandmaidfans/misa.jpg'],
            error: '',
            comments: []
        }
    },
    methods: {
        getMedia: async function () {
            const response = await fetch(`https://graph.facebook.com/v17.0/17841458597605590?fields=business_discovery.username(${this.member[this.memberId - 1]}){followers_count,media_count,media.limit(30){caption,media_url,permalink,timestamp,username,media_type,like_count,children{media_url}}}&access_token=EAAzv9LenhZCkBOysdhxGWzNpeqXrnnUJbB6EvZCj9JyIgeuZAGMzRhOBFYg1jTreWEm5hXRy1J7i7L3RHpPndkCh7ZB4nYHutx1HSbrCGL6gYCp4mZAgZCLf97mZAHVGmUwZC0W1UzOghQ8sn4q6padC434kMwS57B0B4vq7ScGFaZBt0UVsYa5uu9Yshu5Luo64MOBck2A4OzSNpnBZCZA3JQpVjQUNwZDZD`)
            const data = await response.json()
            return data
        },
        // getComments: async function (mediaId) {
        //     const response = await fetch(`https://graph.facebook.com/v17.0/${mediaId})/comments`)
        //     const data = await response.json()
        //     return data
        // },
        // getInsInfo: async function () {
        //     const mediaRes = await fetch(`https://graph.facebook.com/v17.0/17841458597605590?fields=business_discovery.username(${this.member[this.memberId - 1]}){followers_count,media_count,media.limit(30){caption,media_url,permalink,timestamp,username,media_type,like_count,children{media_url}}}&access_token=EAAzv9LenhZCkBAMzYAomm1LQL4qqZBlg0NjdazSL366ytdgFo07s6ZCRBovROo5QOZBdmJNP7xuYQyHGZAbyAE7Ru0WZCvdAxyi3Fubuuyet6XhkDp4x3eP3sCFnSQimjyUMlhPOSs2Rlovlw7YWXvCoIDtlnWxddcdUIMbapRgreAGgGBhvIM`)
        //     const mediaJSON = await mediaRes.json()
        //     this.media = mediaJSON.business_discovery.media.data
        //     for(let item of this.media){
        //         console.log(item)
        //         const commentsRes = await fetch(`https://graph.facebook.com/v17.0/${item.id}/comments&access_token=EAAzv9LenhZCkBAMzYAomm1LQL4qqZBlg0NjdazSL366ytdgFo07s6ZCRBovROo5QOZBdmJNP7xuYQyHGZAbyAE7Ru0WZCvdAxyi3Fubuuyet6XhkDp4x3eP3sCFnSQimjyUMlhPOSs2Rlovlw7YWXvCoIDtlnWxddcdUIMbapRgreAGgGBhvIM`)
        //         const commentsJSON = await commentsRes.json()
        //         item.comments = commentsJSON
        //     }
        // }
        
    },
    mounted() {
        this.getMedia().then(res => this.media = res.business_discovery.media.data).catch(
        error => this.error = error)
        // this.getInsInfo()
    }
}
</script>

<style>
.text {
    background-color: white;
    color: black;
}

.username {
    font-weight: bold;
}

.caption {
    font-size: medium;
    white-space: pre-line;
}

.timestamp {
    color: darkgrey;
}

.top {
    width: 100%;
}

.bottom {
    height: 60px;
    width: 100%;
}

.media {
    padding-left: 0;
    padding-right: 0;
    border-right: solid 1px whitesmoke;
}

</style>
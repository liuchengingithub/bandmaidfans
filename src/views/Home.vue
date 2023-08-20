<template>
  <div>
    <div class="SNS">
      <v-card theme="dark" flat rounded="0">
        <v-card-actions class="justify-center">
          <v-item-group v-model="onboarding" class="text-center" mandatory>
            <v-item v-for="n in length" :key="`btn-${n}`" v-slot="{ isSelected, toggle }" :value="n">
              <v-avatar :variant="isSelected ? 'outlined' : 'text'" @click="toggle(); getIndex(n)" class="me-6" size="60">
                <v-img :src="imgs[n - 1]"></v-img>
              </v-avatar>
            </v-item>
          </v-item-group>
        </v-card-actions>
        <v-window v-model="onboarding" show-arrows>
          <v-window-item v-for="n in length" :key="`card-${n}`" :value="n" class="pb-4">
            <div class="d-flex flex-row justify-center" style="margin-left: -90px;">
              <v-tabs v-model="SNSTab" direction="vertical" color="primary">
                <v-tab value="TwitterTab">
                  <v-icon size="x-large">
                    mdi-twitter
                  </v-icon>
                </v-tab>
                <v-tab value="InsTab">
                  <v-icon size="x-large">
                    mdi-instagram
                  </v-icon>
                </v-tab>
              </v-tabs>
              <v-window v-model="SNSTab">
                <v-window-item value="TwitterTab">
                  <v-card class="d-flex justify-center align-center content">
                    <Tweet :memberId="n" />
                  </v-card>
                </v-window-item>
                <v-window-item value="InsTab">
                  <v-card class="overflow-auto content">
                    <Instagram :memberId="n"></Instagram>
                  </v-card>
                </v-window-item>
              </v-window>
            </div>
          </v-window-item>
        </v-window>
      </v-card>
    </div>
    <div class="justify-center d-flex">
      <v-card class="video content">
        <v-toolbar color="primary">
          <v-toolbar-title>VIDEOS</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <div class="d-flex flex-row">
          <v-tabs v-model="videoTab" direction="vertical" color="primary">
            <v-tab v-for="tab in videoTabList" :key="tab" :value="tab">
              {{ tab }}
            </v-tab>
          </v-tabs>
          <v-window v-model="videoTab">
            <video-card :card="{ maxWidth: 300 }" :pageIndex="pageIndex" :videoTab="videoTab"></video-card>
            <v-pagination v-model="pageIndex" :length="10"></v-pagination>
          </v-window>
        </div>
      </v-card>
    </div>
    <div class="justify-center d-flex">
      <v-card class="article content">
        <v-toolbar color="primary">
          <v-toolbar-title>INTERVIEW ARTICLES</v-toolbar-title>
        </v-toolbar>
        <v-window class="overflow-y-auto">
          <!-- <v-window-item> -->
            <Article class="content" :pageIndex="articlePageIndex"></Article>
          <!-- </v-window-item> -->
        </v-window>
        <v-pagination v-model="articlePageIndex" :length="10"></v-pagination>


      </v-card>
    </div>
  </div>
</template>

<script>
import Tweet from '../components/Tweet.vue';
import Instagram from '../components/Instagram.vue';
import VideoCard from '../components/VideoCard.vue';
import Article from '../components/Article.vue';
export default {
  data: () => ({
    length: 6,
    onboarding: 0,
    imgs: ['/bandmaidfans/bandmaid.png', '/bandmaidfans/kobato.jpg', '/bandmaidfans/saiki.jpg', '/bandmaidfans/kanami.jpg', '/bandmaidfans/akane.jpg', '/bandmaidfans/misa.jpg'],
    index: 0,
    SNSTab: 'TwitterTab',
    videoTab: 'all',
    videoTabList: ['all', 'new', 'MV', 'reaction', 'live', 'bangumi', 'KOL'],
    pageIndex: 1,
    articlePageIndex: 1
  }),
  components: {
    Tweet,
    Instagram,
    VideoCard,
    Article
  },
  methods: {
    next() {
      this.onboarding = this.onboarding + 1 > this.length
        ? 1
        : this.onboarding + 1
    },
    prev() {
      this.onboarding = this.onboarding - 1 <= 0
        ? this.length
        : this.onboarding - 1
    },
    getIndex(n) {
      this.index = n - 1
    }
  }
}
</script>

<style>
.content {
  width: 900px;
  height: 500px;
}

.video {
  height: 1020px;
}

.article {
  height: 600px;
}
</style>
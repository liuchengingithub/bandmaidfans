<template>
  <div class="justify-center auto">
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
          <v-card height="400" class="d-flex justify-center align-center">
            <Tweet :memberId="n" />
          </v-card>
        </v-window-item>
      </v-window>
    </v-card>
    <Instagram></Instagram>
  
</div></template>

<script>
import Tweet from '../components/Tweet.vue';
import Instagram from '../components/Instagram.vue'
export default {
  data: () => ({
    length: 6,
    onboarding: 0,
    imgs: ['./src/assets/bandmaid.png', './src/assets/kobato.jpg', '../assets/saiki.jpg', '../assets/kanami.jpg', '../assets/akane.jpg', '../assets/misa.jpg'],
    index: 0
  }),
  components: {
    Tweet,
    Instagram
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
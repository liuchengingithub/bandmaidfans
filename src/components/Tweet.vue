<template>
    <div class="twitter-timeline twitter-timeline-rendered"
        style="display: flex; margin-top: 0px; margin-bottom: 0px;"><iframe
            v-if="this.memberId" id="twitter-widget-1" scrolling="yes" frameborder="0" allowtransparency="true"
            allowfullscreen="true" class=""
            style="position: static; visibility: visible; width: 900px; height: 500px; display: block; flex-grow: 1;"
            chrome="noheader" title="Twitter Timeline" :src="src"></iframe>
    </div>
</template>

<script>
export default {
    props: ['memberId'],
    data() {
        return {
            member: ['bandmaid', 'miku_bandmaid', 'saiki_bandmaid', 'kanami_bandmaid', 'achi_bandmaid', 'misa_bandmaid'],
            sessionId: ['8ae85490368e1e9b718c33796631865cc9cde0d0', 'c019690164f73e11e738822e1850ea312d04d68b', '60823f2fc1bacd076a58038d3fcc643e9f98a751', 'f586e9863e2f3458dc36027ae1610087c5862266', 'c2f4c9c0c67e8a85dee255700ef5a678a314fd77', 'c2f4c9c0c67e8a85dee255700ef5a678a314fd77'],
        }
    },
    computed: {
        src() {
            return `https://syndication.twitter.com/srv/timeline-profile/screen-name/${this.member[this.memberId - 1]}?dnt=false&amp;embedId=twitter-widget-1&amp;features=eyJ0ZndfdGltZWxpbmVfbGlzdCI6eyJidWNrZXQiOltdLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X2ZvbGxvd2VyX2NvdW50X3N1bnNldCI6eyJidWNrZXQiOnRydWUsInZlcnNpb24iOm51bGx9LCJ0ZndfdHdlZXRfZWRpdF9iYWNrZW5kIjp7ImJ1Y2tldCI6Im9uIiwidmVyc2lvbiI6bnVsbH0sInRmd19yZWZzcmNfc2Vzc2lvbiI6eyJidWNrZXQiOiJvbiIsInZlcnNpb24iOm51bGx9LCJ0ZndfZm9zbnJfc29mdF9pbnRlcnZlbnRpb25zX2VuYWJsZWQiOnsiYnVja2V0Ijoib24iLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X21peGVkX21lZGlhXzE1ODk3Ijp7ImJ1Y2tldCI6InRyZWF0bWVudCIsInZlcnNpb24iOm51bGx9LCJ0ZndfZXhwZXJpbWVudHNfY29va2llX2V4cGlyYXRpb24iOnsiYnVja2V0IjoxMjA5NjAwLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X3Nob3dfYmlyZHdhdGNoX3Bpdm90c19lbmFibGVkIjp7ImJ1Y2tldCI6Im9uIiwidmVyc2lvbiI6bnVsbH0sInRmd19kdXBsaWNhdGVfc2NyaWJlc190b19zZXR0aW5ncyI6eyJidWNrZXQiOiJvbiIsInZlcnNpb24iOm51bGx9LCJ0ZndfdXNlX3Byb2ZpbGVfaW1hZ2Vfc2hhcGVfZW5hYmxlZCI6eyJidWNrZXQiOiJvbiIsInZlcnNpb24iOm51bGx9LCJ0ZndfdmlkZW9faGxzX2R5bmFtaWNfbWFuaWZlc3RzXzE1MDgyIjp7ImJ1Y2tldCI6InRydWVfYml0cmF0ZSIsInZlcnNpb24iOm51bGx9LCJ0ZndfbGVnYWN5X3RpbWVsaW5lX3N1bnNldCI6eyJidWNrZXQiOnRydWUsInZlcnNpb24iOm51bGx9LCJ0ZndfdHdlZXRfZWRpdF9mcm9udGVuZCI6eyJidWNrZXQiOiJvbiIsInZlcnNpb24iOm51bGx9fQ%3D%3D&amp;frame=false&amp;hideBorder=false&amp;hideFooter=false&amp;hideHeader=true&amp;hideScrollBar=false&amp;lang=en&amp;maxHeight=300px&amp;origin=http%3A%2F%2F127.0.0.1%3A3000%2F&amp;sessionId=${this.sessionId[this.memberId - 1]}&amp;showHeader=false&amp;showReplies=false&amp;transparent=false&amp;widgetsVersion=aaf4084522e3a%3A1674595607486`
        }
    }
}

</script>
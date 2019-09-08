<template lang="pug">
  .q-px-xl
    q-table.q-mt-xl(
      :columns="filmColumns"
      row-key="id"
      :data="arrFilm"
      :visible-columns="visibleColumns"
    )
      template(#body="props")
        q-tr
          q-td(style=" cursor: pointer;")
            q-img(:src="imgBaseURL + imgSize200 + props.row.poster_path" @click="showImgBig({ posterPath: props.row.poster_path,  id: props.row.id})")
              q-dialog(v-model="cardFilm")
                q-card
                    q-img.q-mt-xl.q-mx-xl(:src="bigPoster" style="width: 350px;")
                    div.q-ma-xl(style="width: 370px;") {{ descr.overview }}
          q-td {{ props.row.popularity }}
          q-td {{ props.row.original_language }}
          q-td {{ props.row.original_title }}
</template>

<script>
export default {
  name: 'pageTable',
  data () {
    return {
      cardFilm: false,
      imgBaseURL: 'https://image.tmdb.org/t/p',
      imgSize200: '/w200',
      imgSize500: '/w400',
      bigPoster: '',
      descr: '',
      fullURL: '?',
      arrFilm: [],
      filmColumns: [
        { name: 'id', label: 'ID', field: 'id', align: 'left' },
        { name: 'poster_path', label: 'Poster', field: 'poster_path', align: 'left' },
        { name: 'popularity', label: 'Popularity', field: 'popularity', align: 'left' },
        { name: 'original_language', label: 'Language', field: 'original_language', align: 'left' },
        { name: 'original_title', label: 'Title', field: 'original_title', align: 'left' }
      ],
      visibleColumns: [
        'poster_path',
        'popularity',
        'original_language',
        'original_title'
      ]
    }
  },
  async created () {
    this.arrFilm = await this.$http.films.get().then(response => response.data.results)
  },
  methods: {
    showImgBig (val) {
      this.cardFilm = true
      this.bigPoster = this.imgBaseURL + this.imgSize500 + val.posterPath
      this.descr = this.arrFilm.filter(item =>item.id == val.id).pop()
    }
  }
}
</script>

<style>
</style>

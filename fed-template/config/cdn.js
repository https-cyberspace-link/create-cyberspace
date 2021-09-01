module.exports = {
  externals: {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    vuex: 'Vuex',
    CjUi: 'CjUi'
  },
  build: {
    css: [
      'https://prod-cross-ui.bj.bcebos.com/CjUi.css?authorization=bce-auth-v1/ae7e1c08e6634c349b77f60f41fe0989/2021-07-26T15%3A27%3A49Z/-1/host/03bd6cfc61de3a305df2075f5f971a42c3c59e7fa7b3f6dbc510c2935e6cb715'
    ],
    js: [
      'https://prod-cross-ui.bj.bcebos.com/vue.min.js?authorization=bce-auth-v1/ae7e1c08e6634c349b77f60f41fe0989/2021-07-26T15%3A28%3A45Z/-1/host/17a2b6d9bc7c3aef8655a99f441b0cc7b3b78ed5c612572fa5eb319336a62d75',
      'https://prod-cross-ui.bj.bcebos.com/vuex.min.js?authorization=bce-auth-v1/ae7e1c08e6634c349b77f60f41fe0989/2021-07-26T15%3A28%3A58Z/-1/host/8c71fa04c9ac4fafa6af92508784528ff665038c7b75a6e895760f1c445acd3b',
      'https://prod-cross-ui.bj.bcebos.com/vue-router.min.js?authorization=bce-auth-v1/ae7e1c08e6634c349b77f60f41fe0989/2021-07-26T15%3A28%3A28Z/-1/host/8f43cc534279f56271c3ed8f253a28ce48a77126e87f2c60473b2346050d04d4',
      'https://prod-cross-ui.bj.bcebos.com/CjUi.umd.min.js?authorization=bce-auth-v1/ae7e1c08e6634c349b77f60f41fe0989/2021-07-26T15%3A28%3A12Z/-1/host/b7afe7030147ce2ff49108936f3fc1aa795fec230c30d5ae3882e47324238b6c'
    ]
  }
}

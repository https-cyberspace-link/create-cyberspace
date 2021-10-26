module.exports = {
  externals: {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    vuex: 'Vuex',
    CjUi: 'CjUi'
  },
  build: {
    css: [
      'https://prod-cross-ui.bj.bcebos.com/CjUi.css?authorization=bce-auth-v1/ae7e1c08e6634c349b77f60f41fe0989/2021-08-09T08%3A05%3A19Z/-1/host/83b21f1cd530031eed340e5488a7793592166f10fdd38d7ffb2bd074ff7ce9cc'
    ],
    js: [
      'https://prod-cross-ui.bj.bcebos.com/vue.min.js?authorization=bce-auth-v1/ae7e1c08e6634c349b77f60f41fe0989/2021-07-26T15%3A28%3A45Z/-1/host/17a2b6d9bc7c3aef8655a99f441b0cc7b3b78ed5c612572fa5eb319336a62d75',
      'https://prod-cross-ui.bj.bcebos.com/vuex.min.js?authorization=bce-auth-v1/ae7e1c08e6634c349b77f60f41fe0989/2021-07-26T15%3A28%3A58Z/-1/host/8c71fa04c9ac4fafa6af92508784528ff665038c7b75a6e895760f1c445acd3b',
      'https://prod-cross-ui.bj.bcebos.com/vue-router.min.js?authorization=bce-auth-v1/ae7e1c08e6634c349b77f60f41fe0989/2021-07-26T15%3A28%3A28Z/-1/host/8f43cc534279f56271c3ed8f253a28ce48a77126e87f2c60473b2346050d04d4',
      'https://prod-cross-ui.bj.bcebos.com/CjUi.umd.min.js?authorization=bce-auth-v1/ae7e1c08e6634c349b77f60f41fe0989/2021-08-09T08%3A05%3A09Z/-1/host/36e87d788f17bc078cf2527ea51ba5eaac8b0421d58e2f846af1230205f486c8'
    ]
  }
}

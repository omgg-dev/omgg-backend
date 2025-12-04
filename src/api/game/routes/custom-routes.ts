
export default {
  routes: [
    {
      method: 'GET',
      path: '/games/:slug',
      handler: 'game.findFirst',
      config: { auth: false },
    },
  ],
};

export default {
  routes: [
    {
      method: 'GET',
      path: '/games/:slug',
      handler: 'game.findOneBySlug',
      config: { auth: false },
    },
  ],
};
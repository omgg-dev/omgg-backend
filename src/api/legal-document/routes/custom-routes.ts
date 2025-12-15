
export default {
  routes: [
    {
      method: 'GET',
      path: '/legal-documents/:slug',
      handler: 'legal-document.findFirst',
      config: { auth: false }
    },
  ],
};

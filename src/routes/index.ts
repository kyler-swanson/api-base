export const attachPublicRoutes = (router: any): void => {

  router.get('/', (_req, res) => {
    res.json({
      "message": "Welcome!"
    });
  });

}
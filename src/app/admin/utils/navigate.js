// utils/navigate.js
let navigateTo;

export const setNavigator = (router) => {
  navigateTo = router.push.bind(router);
};

export const navigate = (path) => {
  if (navigateTo) {
    navigateTo(path);
  } else {
    console.error("Navigator is not initialized!");
  }
};

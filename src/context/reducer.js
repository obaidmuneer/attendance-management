export const reducer = (state, action) => {
  switch (action.type) {
    case "theme":
      return { ...state, theme: action.payload };
    default:
      return state;
  }
};

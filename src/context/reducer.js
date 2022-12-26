export const reducer = (state, action) => {
  switch (action.type) {
    case "theme":
      return { ...state, theme: action.payload };
    case "student":
      return { ...state, student: action.payload }
    default:
      return state;
  }
};

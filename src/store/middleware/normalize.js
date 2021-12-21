import { NORMALIZE_USER, saveUser } from "../actions/auth";

export const normalizeUser =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    if (action.type === NORMALIZE_USER) {
      const user = action.payload.user;
      const type = action.payload.type;

      const newUser = {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        userType: type,
      };

      dispatch(saveUser(newUser));
    }
  };

export const normalizeMdl = [normalizeUser];

export default function clientMiddleware(client) {
    return ({ dispatch, getState }) =>
        next => action => {
            if (typeof action === 'function') {
                return action(dispatch, getState);
            }

            const { promise, types, ...rest } = action;
            if (!promise) {
                return next(action);
            }

            const {REQUEST, SUCCESS, FAILURE} = types;
            next({ ...rest, type: REQUEST });

            return promise(client)
                .then(
                    result => next({ ...rest, result, type: SUCCESS }),
                    async (error) => {
                        dispatch({ isError: true, error });

                        return next({ ...rest, error, type: FAILURE });
                    },
                )
                .catch((error) => {
                    dispatch({ isError: true, error });
                    return next({ ...rest, error, type: FAILURE });
                });
        };
}

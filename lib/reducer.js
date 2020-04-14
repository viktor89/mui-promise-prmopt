export default ((state, {
  type,
  payload
}) => {
  switch (type) {
    case 'RESOLVE_QUEUE_ITEM':
      return [...state.slice(1)];

    case 'ADD_TO_QUEUE':
      return payload.priority === 'high' ? [payload, ...state] : [...state, payload];

    default:
      return state;
  }
});
const uuidv4 = require('uuid/v4');

function generateUrl(id) {
  const uuid = uuidv4().substr(0, 8);
  return `/${id}-${uuid}`;
}

export {
  // eslint-disable-next-line import/prefer-default-export
  generateUrl,
};

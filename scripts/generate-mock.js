const fs = require('fs')
const axios = require('axios')

function generateFile(name, json) {
  fs.writeFile(
    `./src/__mock__/${name}.json`,
    JSON.stringify(json, null, 2),
    'utf8',
    () => null,
  )
}

function fetchApi(document, name) {
  axios
    .get(`https://api.figma.com/v1/files/${document}`, {
      headers: { 'x-figma-token': process.env.FIGMA_TOKEN },
    })
    .then(json => generateFile(name, json.data))
}

fetchApi('lHntZSdoZ15PxKFMWiVV7p', 'material/material')
fetchApi('PodXJDGjtBAdWiWtbrNtIP', 'default/default')

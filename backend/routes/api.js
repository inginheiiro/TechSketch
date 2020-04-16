const q = require('../db/queries/q')

module.exports = ({ apiRouter }) => {

  //
  // Call correspondent view in the Database
  //
  async function executeTopZones(view) {
    if (view.trim().toLowerCase() !== 'dropoffs' && view.trim().toLowerCase() !== 'pickups') {
      throw new Error('Invalid view name' +
          ' ... whe only allow  dropoffs || pickups')
    }

    return q.topZones(`top5${view.trim().toLowerCase()}`)
  }

  apiRouter.get('/top-zones/:order', async (ctx) => {

    // GET method for getting drops and picks
    // if order is omitted than order=dropoffs
    // returns pretty json
    const view = ctx.params.order || 'dropoffs'
    try {
      const dt = await executeTopZones(view)
      ctx.body = (JSON.stringify({
        top_zones: dt
      }, null, '  '))
    } catch (err) {
      console.log(err)
    }
  }).post('/top-zones/', async (ctx) => {

    // POST method for getting drops and picks
    // if view is omitted than view=top5drops
    // returns pretty json

    ctx.body = ctx.request.body.view
    const view = ctx.params.order || 'dropoffs'
    try {
      const dt = await executeTopZones(view)
      ctx.body = (JSON.stringify({
        top_zones: dt
      }, null, '  '))
    } catch (err) {
      console.log(err)
    }

  })
}

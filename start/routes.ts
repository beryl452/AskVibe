/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const StoreEventController = () => import('#events/controllers/store_event_controller')
const AuthController = () => import('#auth/controllers/auth_controller')

router.on('/').renderInertia('home', { version: 6 })

/*
 * Auth Social
 */
router
  .get('/oauth/:provider/redirect', [AuthController, 'redirect'])
  .where('provider', /github/)
  .as('oauth.redirect')
router
  .get('/oauth/:provider/callback', [AuthController, 'callback'])
  .where('provider', /github/)
  .as('oauth.callback')

/*
 * Events
 */
router.post('/events', [StoreEventController, 'execute']).as('events.store')
router.get('/events/create', [StoreEventController, 'render']).as('events.create')

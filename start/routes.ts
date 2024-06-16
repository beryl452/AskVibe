/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const UsersController = () => import('#controllers/users_controller')

router.on('/').renderInertia('home', { version: 6 })
router.get('/oauth/:provider/redirect', [UsersController, 'redirect']).where('provider', /github/)
router.get('/oauth/:provider/callback', [UsersController, 'callback']).where('provider', /github/)

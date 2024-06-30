/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const AuthController = () => import('#auth/controllers/auth_controller')

router.on('/').renderInertia('home', { version: 6 })
router.get('/oauth/:provider/redirect', [AuthController, 'redirect']).where('provider', /github/)
router.get('/oauth/:provider/callback', [AuthController, 'callback']).where('provider', /github/)

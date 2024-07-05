/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
const StoreVoteController = () => import('../app/vote/controllers/store_vote_controller.js')
const StoreQuestionController = () => import('#posts/controllers/store_question_controller')
const AuthController = () => import('#auth/controllers/auth_controller')
const StoreEventController = () => import('#events/controllers/store_event_controller')
const StoreTalkController = () => import('#talks/controllers/store_talk_controller')

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
router
  .group(() => {
    router.post('/events', [StoreEventController, 'execute']).as('events.store')
    router.get('/events/create', [StoreEventController, 'render']).as('events.create')
  })
  .middleware(middleware.auth())

/*
 * Talks
 */
router
  .group(() => {
    router.get('/talks/create', [StoreTalkController, 'render']).as('talks.create')
    router.post('/talks', [StoreTalkController, 'execute']).as('talks.store')
  })
  .middleware(middleware.auth())

/*
 * Posts
 */
router
  .group(() => {
    router.get('/questions/create', [StoreQuestionController, 'render']).as('questions.create')
    router.post('/questions', [StoreQuestionController, 'execute']).as('questions.store')
  })
  .middleware(middleware.auth())

/*
 * Votes
 */
router
  .group(() => {
    router.get('/vote/:postableId/:voteType', [StoreVoteController, 'execute']).as('vote.store')
  })
  .middleware(middleware.auth())

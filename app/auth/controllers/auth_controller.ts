import type { HttpContext } from '@adonisjs/core/http'
import SocialAuth from '#auth/services/social_auth_service'
import User from '#auth/models/user'

export default class AuthController {
  async redirect({ ally, params }: HttpContext) {
    await ally.use(params.provider).redirect()
  }

  async callback({ ally, auth, params, response }: HttpContext) {
    const gh = await ally.use(params.provider)
    /**
     * User has denied access by canceling
     * the login flow
     */
    if (gh.accessDenied()) {
      return 'You have cancelled the login process'
    }

    /**
     * OAuth state verification failed. This happens when the
     * CSRF cookie gets expired.
     */
    if (gh.stateMisMatch()) {
      return 'We are unable to verify the request. Please try again'
    }

    /**
     * GitHub responded with some error
     */
    if (gh.hasError()) {
      return gh.getError()
    }

    /**
     * Access user info
     */
    const socialUserInfo = await gh.user()

    console.log(socialUserInfo)
    await new SocialAuth(socialUserInfo, params.provider)
      .onFindOrCreate(async (user: User) => {
        await user.save()
        await auth.use('web').login(user)
        response.redirect('/')
      })
      .exec()
  }
}

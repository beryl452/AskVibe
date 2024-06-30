import type { HttpContext } from '@adonisjs/core/http'
import SocialAuth from '#auth/services/social_auth_service'
import User from '#auth/models/user'

export default class AuthController {
  async redirect({ ally, params }: HttpContext) {
    await ally.use(params.provider).redirect()
  }

  async callback({ ally, auth, params, response }: HttpContext) {
    const socialUser = await ally.use(params.provider).user()

    await new SocialAuth(socialUser, params.provider)
      .onFindOrCreate(async (user: User) => {
        await user.save()
        await auth.use('web').login(user)
        response.redirect('/')
      })
      .exec()
  }
}

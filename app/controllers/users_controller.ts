import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class UsersController {
  async redirect({ ally, params }: HttpContext) {
    await ally.use(params.provider).redirect()
  }

  async callback({ ally, auth, params, response }: HttpContext) {
    const provider = params.provider
    const githubDriver = ally.use(provider)
    const githubUser = await githubDriver.user()
    const user = await User.firstOrNew({
      oauthProviderId: githubUser.id,
      oauthProviderName: provider,
    })

    if (user.$isPersisted) {
      user.merge({
        fullName: githubUser.name,
        email: githubUser.email,
        avatarUrl: githubUser.avatarUrl,
        githubUsername: githubUser.original.login,
      })
    }

    await user.save()
    await auth.use('web').login(user)
    response.redirect('/')
  }
}

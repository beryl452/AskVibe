import { AllyUserContract, GithubToken, SocialProviders } from '@adonisjs/ally/types'
import User from '#auth/models/user'

export default class SocialAuth implements Promise<void> {
  private findOrCreateHandler: any

  constructor(
    private socialUser: AllyUserContract<GithubToken>,
    private provider: keyof SocialProviders
  ) {}

  /**
   * The `onFindOrCreate` method is used to set a callback function that will be called after a user is found or created.
   *
   * @param {Function} handler - The callback function to be called after a user is found or created. This function should take one argument, which is the user that was found or created.
   *
   * @returns {SocialAuth} The `SocialAuth` instance, allowing for method chaining.
   *
   * This method is typically used in conjunction with the `exec` method. The `exec` method will call the `updateOrCreate` method to find or create a user, and then it will call the `findOrCreateHandler` with the user that was found or created.
   */
  onFindOrCreate(handler: any): SocialAuth {
    this.findOrCreateHandler = handler
    return this
  }

  /**
   * The `updateOrCreate` method is responsible for updating an existing user or creating a new one.
   * It uses the `updateOrCreate` method from the `User` model, which is a convenient method provided by AdonisJS.
   *
   * @returns {Promise<User>} A promise that resolves to the updated or created user.
   *
   * The method takes two arguments:
   * 1. The first argument is an object that defines the search criteria. In this case, it's looking for a user with a matching `oauthProviderId` and `oauthProviderName`.
   *    - `oauthProviderId`: The ID of the user as provided by the OAuth provider (in this case, GitHub).
   *    - `oauthProviderName`: The name of the OAuth provider (in this case, it's the provider key passed to the `SocialAuth` constructor).
   *
   * 2. The second argument is an object that defines the data to be updated or used to create a new user if one doesn't exist.
   *    - `fullName`: The full name of the user as provided by the OAuth provider.
   *    - `email`: The email of the user as provided by the OAuth provider.
   *    - `avatarUrl`: The URL of the user's avatar as provided by the OAuth provider.
   *    - `githubUsername`: The GitHub username of the user, which is extracted from the `original` property of the `socialUser` object.
   */
  updateOrCreate(): Promise<User> {
    return User.updateOrCreate(
      {
        oauthProviderId: this.socialUser.id,
        oauthProviderName: this.provider,
      },
      {
        fullName: this.socialUser.name,
        email: this.socialUser.email!,
        avatarUrl: this.socialUser.avatarUrl!,
        githubUsername: this.socialUser.original.login,
      }
    )
  }

  /**
   * The `exec` method is responsible for executing the `updateOrCreate` method and the `findOrCreateHandler` callback.
   *
   * @returns {Promise<void>} A promise that resolves when the `updateOrCreate` method and the `findOrCreateHandler` callback have both completed.
   *
   * This method first calls the `updateOrCreate` method, which either updates an existing user or creates a new one based on the `oauthProviderId` and `oauthProviderName`. The `updateOrCreate` method returns a promise that resolves to the updated or created user.
   *
   * After the `updateOrCreate` method completes, the `findOrCreateHandler` callback is called with the user that was found or created. The `findOrCreateHandler` callback is set by calling the `onFindOrCreate` method.
   */
  async exec(): Promise<void> {
    const user = await this.updateOrCreate()
    await this.findOrCreateHandler(user)
  }

  then(resolve: any, reject: any): any {
    return this.exec().then(resolve, reject)
  }

  catch(reject: any): any {
    return this.exec().catch(reject)
  }

  finally(handler: any): any {
    return this.exec().finally(handler)
  }

  get [Symbol.toStringTag]() {
    return this.constructor.name
  }
}

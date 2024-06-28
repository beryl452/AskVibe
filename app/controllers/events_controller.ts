import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { EventsPresenter } from '#presenters/events_presenter'
import Event from '#models/event'

@inject()
export default class EventsController {
  constructor(private presenter: EventsPresenter) {}
  /**
   * Display a list of resource
   */
  async index({ inertia, request }: HttpContext) {
    const page = request.input('page', 1)
    const events = await Event.query().paginate(page, 30)

    return inertia.render('events/index', {
      events: this.presenter.toJson(events),
    })
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  // async store({ request }: HttpContext) {}

  /**
   * Show individual record
   */
  // async show({ params }: HttpContext) {}

  /**
   * Edit individual record
   */
  // async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  // async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  // async destroy({ params }: HttpContext) {}
}

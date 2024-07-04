import Participe from '#events/models/participe'

export default class RegisterUserOnEventService {
  async handle(eventData: any) {
    return await Participe.create({
      eventId: eventData.event_id,
      userId: eventData.user_id,
      responsabilityId: eventData.responsability_id,
    })
  }
}

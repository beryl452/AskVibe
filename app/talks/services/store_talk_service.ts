import Talk from '#talks/models/talk'

export default class StoreEventService {
  async handle(eventData: any) {
    const talk = await Talk.create({
      title: eventData.title,
      description: eventData.description,
      talkStatus: eventData.talk_status,
      duration: eventData.duration,
      startDateTime: eventData.start_date_time,
      endDateTime: eventData.end_date_time,
      location: eventData.location,
      eventId: eventData.event_id,
    })

    await talk.related('users').attach(eventData.collaborator_ids)

    return talk
  }
}

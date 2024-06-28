import factory from '@adonisjs/lucid/factories'
import Event from '#models/event'

export const EventFactory = factory
  .define(Event, async ({ faker }) => {
    return {
      title: faker.lorem.sentence(),
      description: faker.lorem.paragraph(),
      startDate: faker.date.recent(),
      endDate: faker.date.future(),
      location: faker.address.streetAddress(),
      cover: faker.image.imageUrl(),
    }
  })
  .relation()
  .build()

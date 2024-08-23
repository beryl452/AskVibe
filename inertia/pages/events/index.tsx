import { Head } from '@inertiajs/react'
import { InferPageProps } from '@adonisjs/inertia/types'
import ListEventController from '#events/controllers/list_event_controller'

export default function Index(props: InferPageProps<ListEventController, 'render'>) {
  const { events } = props
  return (
    <>
      exit
      <Head title="Events" />
      <div className="container">
        <h1 className="text-2xl font-semibold">Events</h1>
        <div className="mt-4">
          <table className="w-full">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Location</th>
                <th>Cover</th>
                <th>Created At</th>
                <th>Updated At</th>
              </tr>
            </thead>
            <tbody>
              {events.data.map((event) => (
                <tr key={event.id}>
                  <td>{event.title}</td>
                  <td>{event.description}</td>
                  <td>{event.startDate}</td>
                  <td>{event.endDate}</td>
                  <td>{event.location}</td>
                  <td>
                    <img width={35} height={35} src={event.cover} alt={event.title} />
                  </td>
                  <td>{event.createdAt}</td>
                  <td>{event.updatedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

import vine from '@vinejs/vine'
import { PostableStatus } from '#posts/enums/postable_status'
import { PostableType } from '#posts/enums/postable_type'

export default class BaseStorePostRequest {
  baseValidator = vine.object({
    content: vine.string().trim().minLength(1).maxLength(1000),
    status: vine.enum(PostableStatus).optional(),
    postableType: vine.enum(PostableType),
    createdBy: vine.string().uuid().isExists({ table: 'participes', column: 'id' }),
  })
}

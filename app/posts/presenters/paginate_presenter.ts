import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

export class PaginatePresenter {
  toJson(paginate: ModelPaginatorContract<any>) {
    return {
      meta: paginate,
    }
  }
}

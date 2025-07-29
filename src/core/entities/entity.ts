import { UniqueEntityID } from './unique-entity-id'

export class Entity<Props> {
  private _id: UniqueEntityID
  protected props: Props

  get id() {
    return this._id
  }

  protected constructor(props: Props, id?: UniqueEntityID) {
    this.props = props
    this._id = id ?? new UniqueEntityID()
  }

  equals(entity: Entity<Props>) {
    if (entity === this) {
      return true
    }

    if (entity.id || !this.id) {
      return true
    }

    return false
  }
}

export type Module = {
  id: number
  name: string
  permissions: {
    add: boolean
    edit: boolean
    delete: boolean
    view: boolean
  }
}

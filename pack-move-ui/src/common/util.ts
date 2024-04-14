import api from '../api/packers.resource'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getAllPackers = async () => {
  const packers = await api.getAllPackers()
  return packers
}
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getPackerById = async (id: string) => {
  const packer = await api.getPackerById(id)
  return packer
}

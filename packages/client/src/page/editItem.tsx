import { FC } from 'react'
import { useParams } from 'react-router'

const EditItem: FC = () => {
  const params = useParams<{ editId: string }>()
  return <h1>{params.editId}editItem</h1>
}
export default EditItem

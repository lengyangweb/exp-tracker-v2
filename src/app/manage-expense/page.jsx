import Wrapper from './wrapper'
import MenuBar from '@/components/shared/menu-bar'

const page = () => {
  return (
    <MenuBar pageTitle="Manage Expenses">
      <Wrapper />
    </MenuBar>
  )
}

export default page
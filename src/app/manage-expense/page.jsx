import Wrapper from './wrapper'
import MenuBar from '@/components/shared/menu-bar'

const page = () => {
  return (
    <MenuBar pageTitle="Manage Expenses">
      <div className="p-4">
        <Wrapper />
      </div>
    </MenuBar>
  )
}

export default page
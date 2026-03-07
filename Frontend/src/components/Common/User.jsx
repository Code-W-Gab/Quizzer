import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import profile from '../../assets/profile.jpg';
import { LogOut } from "lucide-react";

export default function User({logout, userName}) {

  return (
    <Menu>
      <MenuButton>
        <div className='hover:bg-gray-200 dark:hover:bg-gray-500 p-1 rounded-md'>
          <img src={profile} className='size-10 rounded-sm'/>
        </div>
      </MenuButton>

      <MenuItems
        transition
        anchor="bottom end"
        className="w-52 bg-gray-700 dark:bg-white rounded-md shadow-lg p-2 [--anchor-gap:4px]"
      >
        <MenuItem>
          <div className="px-1 py-2 border-b border-gray-400 mb-1">
            <h1 className="font-semibold break-all text-center text-white dark:text-black">{userName}</h1>
          </div>
        </MenuItem>
        <MenuItem>
          <button
            onClick={logout}
            className="group flex w-full items-center gap-2 px-3 py-1.5 rounded bg-red-500 text-white hover:bg-red-600"
          >
            <LogOut className="size-4"/>
            Logout
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  )
}
import { Ellipsis, Pencil, Trash, Share2 } from "lucide-react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

export default function MobileEllipsisNavbar({ onDelete, onEdit, onShare }) {
  return (
    <Menu>
      <MenuButton>
        <Ellipsis/>
      </MenuButton>

      <MenuItems
        transition
        anchor="bottom end"
        className="w-30 bg-gray-300 rounded-md"
      > 
        <MenuItem>
          <button
            onClick={onShare}
            className="group flex w-full items-center gap-2 px-3 py-1.5 hover:bg-gray-500 hover:text-white"
          >
            <Share2 className="size-4"/>
            Share
          </button>
        </MenuItem>
        <MenuItem>
          <button 
            onClick={onEdit}
            className="group flex w-full items-center gap-2 px-3 py-1.5 hover:bg-gray-500 hover:text-white"
          >
            <Pencil className="size-4"/>
            Edit
          </button>
        </MenuItem>
        <MenuItem>
          <button 
            onClick={onDelete}
            className="group flex w-full items-center gap-2 px-3 py-1.5 hover:bg-gray-500 hover:text-white"
          >
            <Trash className="size-4"/>
            Delete
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  )
}
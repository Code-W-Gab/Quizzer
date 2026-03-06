import { EllipsisVertical, Moon, Download, Sun, LogOut } from "lucide-react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

export default function MobileEllipsisHeader({onImport, onToggle, onLogout, isDarkMode}) {
  return (
    <div className="absolute top-2 right-2">
      <Menu>
        <MenuButton>
          <EllipsisVertical className="text-white"/>
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="w-30 bg-gray-300 rounded-md"
        >
          <MenuItem>
            <button
              onClick={onImport}
              className="group flex w-full items-center gap-2 px-3 py-1 hover:bg-gray-500 hover:text-white"
            >
              <Download className="size-4"/>
              Download
            </button>
          </MenuItem>
          <MenuItem>
            <button
              onClick={onToggle}
              className="group flex w-full items-center gap-2 px-3 py-1 hover:bg-gray-500 hover:text-white"
            >
              {isDarkMode ? (
                <>
                  <Sun className="size-4"/>
                  <span>LightMode</span>
                </>
              ) : (
                <>
                  <Moon className="size-4"/>
                  <span>DarkMode</span>
                </>
              )}
            </button>
          </MenuItem>
          <MenuItem>
            <button
              onClick={onLogout}
              className="group flex w-full items-center gap-2 px-3 py-1 hover:bg-gray-500 hover:text-white"
            >
              <LogOut className="size-4"/>
              Logout
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  )
}
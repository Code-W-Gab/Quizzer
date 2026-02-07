import SideBar from "./SideBar";
import Header from "./Header";

export default function Navigation({ children }) {
  return (
    <div className="flex h-screen">
      <SideBar/>
      <div className="flex-1 flex flex-col">
        <Header/>
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
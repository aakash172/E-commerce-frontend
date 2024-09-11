import Logo from './Logo'
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
function Header() {
    return (
        <header className='h-16 shadow-md'>
            <div className="h-full container mx-auto flex items-center px-4 justify-between">
                <div className="">
                    <Logo w={90} h={50} />
                </div>

                <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow-md pl-2'>
                    <input type='text' placeholder='search items here' className='w-full  outline-none'></input>
                    <div className='text-lg min-w-[50px] h-8 bg-red-600 text-white flex items-center justify-center rounded-r-full'>
                        <GrSearch />
                    </div>
                </div>

                <div>
                    <div>
                        <FaRegCircleUser />
                    </div>
                </div>
            </div>

        </header >
    )
}
export default Header;
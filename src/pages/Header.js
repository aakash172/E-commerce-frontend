import Logo from './Logo'
function Header() {
    return (
        <header className='h-16 shadow-md'>
            <div className="h-full container mx-auto flex items-center px-4 justify-between">
                <div className="">
                    <Logo w={100} h={50} />
                </div>

                <div>
                    <input type='text' placeholder='search items here'></input>
                </div>

                <div>
                    profile
                </div>
            </div>

        </header >
    )
}
export default Header;
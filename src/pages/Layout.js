import "../assets/styles/layout.css";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Layout = ({ children }) => {
    return (
        <>
            <header className="flex justify-between px-4 py-6 bg-white items-center">
                <input
                    type="text"
                    className=" h-8 w-full p-1.5 rounded bg-[#F5F5F5] text-[#1A2840] placeholder-[#1A2840]"
                    placeholder="Search city ... "
                />
                <FontAwesomeIcon className='text-[#FDAA67] text-xl absolute right-14' icon={faMagnifyingGlass} />
            </header>
            <main>{children}</main>
        </>
    )
};

export default Layout;
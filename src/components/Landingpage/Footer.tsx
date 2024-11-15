import { FaFacebook, FaGoogle } from "react-icons/fa";

const Footer = () => {
  return (
 <footer className="bg-[#3367bb] p-5 px-8 sm:flex justify-between items-center">
    <p className="text-white text-sm my-5 sm:m-0"> &copy; COPY ALL RIGHT RESERVED BY XYZ PLATFORM</p>
    <div className="icons flex gap-3">
    <FaGoogle color="white"  size={20} />
    <FaFacebook color="white"  size={20}/>
    </div>
 </footer>
  )
}

export default Footer
import { assets } from "../../assets/assets"

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6">
      
    <div className="container mx-auto flex flex-col md:flex-row justify-between items-start">
      {/* Company Section */}
      <div className="mb-4 md:mb-0  ml-6">
        <h5 className="text-lg font-bold">Company</h5>
        <ul className="text-sm">
          <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
          <li><a href="#" className="text-gray-400 hover:text-white">Blogs</a></li>
          <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
          <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>   
        </ul>
      </div>


      {/* Products Section */}
      <div className="mb-4 md:mb-0  ml-6">
        <h5 className="text-lg font-bold">Products</h5>
        <ul className="text-sm">
          <li><a href="#" className="text-gray-400 hover:text-white">Ride</a></li>
          <li><a href="#" className="text-gray-400 hover:text-white">Drive</a></li>
          <li><a href="#" className="text-gray-400 hover:text-white">Deliver</a></li>
          <li><a href="#" className="text-gray-400 hover:text-white">Eat</a></li>
          <li><a href="#" className="text-gray-400 hover:text-white">Gift cards</a></li>
        
        </ul>
      </div>

      {/* Global Citizenship Section */}
      <div className="mb-4 md:mb-0  ml-6">
        <h5 className="text-lg font-bold">Global Citizenship</h5>
        <ul className="text-sm">
          <li><a href="#" className="text-gray-400 hover:text-white">Safety</a></li>
          <li><a href="#" className="text-gray-400 hover:text-white">Diversity and inclusion</a></li>
          <li><a href="#" className="text-gray-400 hover:text-white">Sustainability</a></li>
        </ul>
      </div>

      {/* Travel Section */}
      <div className="mb-4 md:mb-0 ml-6">
        <h5 className="text-lg font-bold">Travel</h5>
        <ul className="text-sm">
          <li><a href="#" className="text-gray-400 hover:text-white">Reserve</a></li>
          <li><a href="#" className="text-gray-400 hover:text-white">Cities</a></li>
        </ul>
      </div>
    </div>

    {/* Social Media Links */}
    <div className="flex justify-center space-x-4 mt-6">
      <a href="https://facebook.com" aria-label="Facebook" className="text-gray-400 hover:text-white">
        <img src={assets.facebook_icon} alt="" />
      </a>
      <a href="https://twitter.com" aria-label="Twitter" className="text-gray-400 hover:text-white">
        <img src={assets.twitter_icon} alt=""/>
      </a>
      <a href="https://linkedin.com" aria-label="LinkedIn" className="text-gray-400 hover:text-white">
         <img src={assets.linkedin_icon} />
      </a>
      <a href="https://instagram.com" aria-label="Instagram" className="text-gray-400 hover:text-white">
        {/* <FaInstagram /> */}IG
      </a>
    </div>

    {/* Copyright Section */}
    <div className="text-center mt-4">
      <p className="text-sm">&copy; {new Date().getFullYear()} Company FoodHub. All rights reserved.</p>
    </div>
  </footer>
  )
}

export default Footer

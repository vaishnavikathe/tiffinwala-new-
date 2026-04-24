const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
      <div className="container-custom py-6 text-center space-y-2">
        
        <p className="text-sm">
          © {new Date().getFullYear()} TiffinWala. All rights reserved.
        </p>

        <p className="text-xs text-gray-400">
          Smart subscription-based meal platform
        </p>

      </div>
    </footer>
  );
};

export default Footer;
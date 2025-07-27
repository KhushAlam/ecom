import { useEffect } from 'react';

export default function Navbar() {
  useEffect(() => {
    const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

    function mobileNavToogle() {
      document.body.classList.toggle('mobile-nav-active');
      mobileNavToggleBtn.classList.toggle('bi-list');
      mobileNavToggleBtn.classList.toggle('bi-x');
    }

    if (mobileNavToggleBtn) {
      mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
    }

    // Optional: close menu when nav item clicked
    document.querySelectorAll('#navmenu a').forEach(navmenu => {
      navmenu.addEventListener('click', () => {
        if (document.querySelector('.mobile-nav-active')) {
          mobileNavToogle();
        }
      });
    });

    // Clean up event listener
    return () => {
      if (mobileNavToggleBtn) {
        mobileNavToggleBtn.removeEventListener('click', mobileNavToogle);
      }
    };
  }, []); // <-- empty dependency ensures it runs once after render

}

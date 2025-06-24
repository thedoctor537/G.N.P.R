document.addEventListener("DOMContentLoaded", () => {
  fetch("/user-status")
    .then(res => res.json())
    .then(data => {
      const isLoggedIn = data.loggedIn;

      const navbarList = document.querySelector(".inxNavbar ul");
      const footerList = document.querySelector(".footerNavbar ul");

      const hasLogoutNav = !!document.querySelector('.inxNavbar a[href="/logout"]');
      const hasLogoutFooter = !!document.querySelector('.footerNavbar a[href="/logout"]');

      const loginSelector = 'a[href="logIn"], a[href="signup"], a[href="/login"], a[href="/signup"]';

      if (isLoggedIn) {
        document.querySelectorAll(loginSelector).forEach(a => {
          a.parentElement.style.display = "none";
        });

        if (navbarList && !hasLogoutNav) {
          const logoutItem = document.createElement("li");
          const logoutLink = document.createElement("a");
          logoutLink.href = "/logout";
          logoutLink.textContent = "התנתק";
          logoutItem.appendChild(logoutLink);
          navbarList.appendChild(logoutItem);
        }

        if (footerList && !hasLogoutFooter) {
          const logoutItemFooter = document.createElement("li");
          const logoutLinkFooter = document.createElement("a");
          logoutLinkFooter.href = "/logout";
          logoutLinkFooter.textContent = "התנתק";
          logoutItemFooter.appendChild(logoutLinkFooter);
          footerList.appendChild(logoutItemFooter);
        }
      } else {
        const logoutNav = document.querySelector('.inxNavbar a[href="/logout"]');
        if (logoutNav) logoutNav.parentElement.remove();

        const logoutFooter = document.querySelector('.footerNavbar a[href="/logout"]');
        if (logoutFooter) logoutFooter.parentElement.remove();

        document.querySelectorAll(loginSelector).forEach(a => {
          a.parentElement.style.display = "list-item";
        });
      }
    })
    .catch(err => {
      console.error("שגיאה בבדיקת סטטוס התחברות:", err);
    });
});

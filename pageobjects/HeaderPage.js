export class HeaderPage {
  constructor(page) {
    this.page = page;
    this.menuSelectors = [
      { selector: 'li.nav-item:nth-child(1) .nav-link', megaMenu: '.megaMenu' }, // Services
      { selector: 'li.nav-item:nth-child(2) .nav-link', megaMenu: '.megaMenu' }, // Industries
      { selector: 'li.nav-item:nth-child(3) .nav-link', megaMenu: '.megaMenu' }, // Solutions
      { selector: 'li.nav-item:nth-child(4) .nav-link', megaMenu: '.megaMenu' }, // About Us
      { selector: 'li.nav-item:nth-child(5) .nav-link', megaMenu: '.megaMenu' }, // Careers
      { selector: 'li.nav-item:nth-child(6) .nav-link', megaMenu: '.megaMenu' }, // Contact Us
      { selector: 'li.nav-item:nth-child(7) .nav-link', megaMenu: '.megaMenu' }, // Playbook Button
    ];
  }

  // Function to hover over a menu item and check if its mega menu is visible
  async hoverAndCheckMegaMenu(menu) {
    await this.page.hover(menu.selector);
    const isVisible = await this.isMegaMenuVisible(menu.megaMenu);
    if (isVisible) {
      console.log(`Mega menu is visible for ${menu.selector}`);
    } else {
      console.error(`Mega menu did not appear for ${menu.selector}`);
    }
    await this.page.waitForTimeout(1000);
  }

  // Function to check if the mega menu is visible
  async isMegaMenuVisible(menuSelector) {
    const isVisible = await this.page.isVisible(menuSelector);
    return isVisible;
  }

  // Function to loop over the menu items and check if their mega menus appear
  async checkAllMegaMenus() {
    for (const menu of this.menuSelectors) {
      await this.hoverAndCheckMegaMenu(menu);
    }
  }
}
module.exports = HeaderPage;
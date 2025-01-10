class HeaderPage {
  constructor(page) {
    this.page = page;
    this.menuSelector = 'ul.navbar-nav li.nav-item';
    this.megaMenuSelector = '.megaMenu';
  }

  // Function to hover over a menu item and check if its mega menu is visible
  async hoverAndCheckMegaMenu(index) {
    const menuItem = this.page.locator(`${this.menuSelector}:nth-child(${index}) .nav-link`);
    await menuItem.hover();

    await this.page.waitForTimeout(500);
    const megaMenu = this.page.locator(`${this.menuSelector}:nth-child(${index}) .megaMenu`);
    const isVisible = await megaMenu.isVisible();

    if (isVisible) {
      console.log(`Mega menu is visible for menu item ${index}`);
    } else {
      console.error(`Mega menu did not appear for menu item ${index}`);
    }
  }

  // Function to check if the mega menu is visible
  async isMegaMenuVisible(menuSelector) {
    const isVisible = await this.page.isVisible(menuSelector);
    return isVisible;
  }

  // Function to loop over the menu items and check if their mega menus
  async checkAllMegaMenus() {
    const menuItemsCount = await this.page.locator(this.menuSelector).count();
    for (let i = 1; i <= menuItemsCount; i++) {
      const actualText = await this.getMenuItemText(i);
      await this.hoverAndCheckMegaMenu(i);
    }
  }

  async getMenuItemText(index) {
    const menuItem = this.page.locator(`${this.menuSelector}:nth-child(${index}) .nav-link`);
    return await menuItem.textContent();
  }
}
module.exports = HeaderPage;
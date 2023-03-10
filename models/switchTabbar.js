class SwitchTabbarModel {
    switchTabbar(selectId) {
        if (typeof this.getTabBar === 'function' &&
            this.getTabBar()) {
            this.getTabBar().setData({
                selected: selectId
            })
        }
    }
}

export { SwitchTabbarModel}
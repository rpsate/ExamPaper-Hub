Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#0f80dd",
    list: [
        {
            pagePath: "/pages/index/index",
            text: "ExamPapers",
            iconPath: "/images/tab_home.png",
            selectedIconPath: "/images/tab_home_active.png"
        },
        {
            pagePath: "",
            text: "Assistant",
            iconPath: "/images/tab_contact.png",
            selectedIconPath: "/images/tab_contact_active.png"
        },
        {
            pagePath: "/pages/personal/personal",
            text: "Personal",
            iconPath: "/images/tab_me.png",
            selectedIconPath: "/images/tab_me_active.png"
        }
    ]
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      const selectId = data.index;
      if(selectId != 1) {
          wx.switchTab({ url })
          this.setData({
              selected: selectId
          });
      }
    }
  }
})
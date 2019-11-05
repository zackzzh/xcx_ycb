export default {
  data: {
    keyword: '',
    position: 'right',
    show: false,
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    bannerList: [],
    popdata: {},
    custStatus: 'D',
    navs: [{
        name: "待分配",
        number: null,
        image: "/static/images/customers/cn1.png",
        custStatus: 'D'
      },
      {
        name: "待跟进",
        number: null,
        image: "/static/images/customers/cn7.png",
        custStatus: 'N'
      },
      {
        name: "跟进中",
        number: null,
        image: "/static/images/customers/cn2.png",
        custStatus: 'HABC'
      },
      {
        name: "到店",
        number: null,
        image: "/static/images/customers/cn3.png",
        custStatus: 'Q'
      },
      {
        name: "成交",
        number: null,
        image: "/static/images/customers/cn4.png",
        custStatus: 'O'
      },
      {
        name: "战败",
        number: null,
        image: "/static/images/customers/cn5.png",
        custStatus: 'L'
      },
      {
        name: "无效",
        number: null,
        image: "/static/images/customers/cn6.png",
        custStatus: 'F'
      }
    ],
    
    custList: [],
  }
}

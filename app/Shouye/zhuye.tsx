'use client';
import React, { useState } from 'react';
import AuthPage from "../Dashboard/components/json/page"; // 导入认证页面组件

function App() {
  // 商品分类数据
  const [categories] = useState([
    { id: 1, name: '首页' },
    { id: 2, name: '女装' },
    { id: 3, name: '男装' },
    { id: 4, name: '鞋靴' },
    { id: 5, name: '配饰' },
    { id: 6, name: '童装' },
  ]);

  // 轮播图数据
  const [banners] = useState([
    { id: 1,
     image: 'https://p3-sign.douyinpic.com/tos-cn-i-p14lwwcsbr/89f0f1d12d1e435cb9bb967d077ae952~tplv-p14lwwcsbr-7.image?lk3s=7b078dd2&x-expires=1749646800&x-signature=sETN1SQv4sfTopPSiM10jZV6eVY%3D&from=2064092626&se=false&sc=image&biz_tag=aweme_comment&l=202506111503020E783B0153B2350841DD', 
     link: '#' },
    { id: 2,
     image: 'https://p26-sign.douyinpic.com/tos-cn-i-p14lwwcsbr/45efeb5a78d74a1692ec771c825f3313~tplv-p14lwwcsbr-7.image?lk3s=7b078dd2&x-expires=1749711600&x-signature=ozgx7w5FRDZCkiWoTKDxlTKKy7E%3D&from=2064092626&se=false&sc=image&biz_tag=aweme_comment&l=202506111454208A2D4D1BFA6FAEC26252', 
     link: '#' },
    { id: 3, 
     image: 'https://p3-sign.douyinpic.com/tos-cn-i-p14lwwcsbr/8c35c8a486ca400197a4e6b07b7c08e5~tplv-p14lwwcsbr-7.image?lk3s=7b078dd2&x-expires=1749715200&x-signature=g7rMy3O6J1WJuatrhP%2BgPCtv1Ng%3D&from=2064092626&se=false&sc=image&biz_tag=aweme_comment&l=20250611151956C91E1786348D66886B6F',
     link: '#' },
  ]);

  // 当前轮播图索引
  const [currentBanner, setCurrentBanner] = useState(0);

  // 新品数据
  const [newArrivals] = useState([
    { id: 1, name: '甜系lolita', price: 299, image: 'https://sns-webpic-qc.xhscdn.com/202506111630/d461cd065d7b9030a09f54a19cc199a9/1040g2sg31fsvosmd02705p3dldjn5cgonrnulq8!nc_n_webp_mw_1' },
    { id: 2, name: '校园水手服', price: 199, image: 'https://sns-webpic-qc.xhscdn.com/202506111635/8cfca51075845fc2b0599048acac11b7/notes_pre_post/1040g3k031gf45bbm3i6g4a2s7nlrjq02d5eam7g!nc_n_webp_mw_1' },
    { id: 3, name: '三丽鸥玩偶', price: 99, image: 'https://sns-webpic-qc.xhscdn.com/202506111637/0c4036f5936567db9bf807942c11921a/1040g00831ba09m4lne0048nltcss9kodt0jfhmo!nc_n_webp_mw_1' },
    { id: 4, name: '可爱高跟鞋', price: 399, image: 'https://sns-webpic-qc.xhscdn.com/202506111640/6d825e887e3d17c1f443e7c5452eaf28/spectrum/1040g34o31ergfsm8m00g5ovgqcjl1r84ts1rnpo!nc_n_webp_mw_1' },
  ]);

  // 热门穿搭数据
  const [hotOutfits] = useState([
    { id: 1, title: '甜美少女风', image: 'https://sns-webpic-qc.xhscdn.com/202506111625/c456f69edbf19cf15591ac57f31112ac/1040g2sg31ifcos5egee05o3nqd208al1h0rf8v8!nc_n_webp_mw_1' },
    { id: 2, title: '美式学院风', image: 'https://sns-webpic-qc.xhscdn.com/202506111625/d3325c0b87e663bfe235ddccfb5f9247/1040g00830q8c83g9ng005o3nqd208al1qjpnga8!nc_n_webp_mw_1' },
    { id: 3, title: '夏日休闲风', image: 'https://sns-webpic-qc.xhscdn.com/202506111935/2b12b262a9ea7333f5f2788f695f1d84/notes_pre_post/1040g3k831fergfgb6o705o3nqd208al1imj9cto!nc_n_webp_mw_1' },
    { id: 3, title: '辣妹摇滚风', image: 'https://sns-webpic-qc.xhscdn.com/202506111647/3143c6a6737ba1ce691fddf8516dfe59/notes_pre_post/1040g3k831fevpg34me105o3nqd208al18btstr8!nc_n_webp_mw_1' },
    { id: 3, title: '冬日甜妹风', image: 'https://sns-webpic-qc.xhscdn.com/202506111647/031641404ce5c2cac609272907945165/1040g00831ciarf5egu505o3nqd208al198h853g!nc_n_webp_mw_1' },
  ]);

  // 搜索关键词
  const [searchKeyword, setSearchKeyword] = useState('');
  
  // 控制认证页面显示的状态
  const [showAuthPage, setShowAuthPage] = useState(false);

  // 轮播图自动切换
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [banners.length]);

  // 切换到上一张图片
  const goToPrev = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
  };

  // 切换到下一张图片
  const goToNext = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  };

  // 定义显示/隐藏的类名
  const getSlideClass = (index) => {
    return `banner-slide ${index === currentBanner ? 'active' : 'hidden'}`;
  };

  // 定义指示器类名
  const getIndicatorClass = (index) => {
    return `indicator ${index === currentBanner ? 'active' : ''}`;
  };

  // 处理搜索
  const handleSearch = (e) => {
    e.preventDefault();
    alert(`搜索关键词: ${searchKeyword}`);
    // 这里可以添加实际的搜索逻辑
  };

  // 登录注册跳转处理函数
  const handleAuthNavigate = () => {
    setShowAuthPage(true);
  };

  return (
    <div className="app">
      {/* 顶部导航 */}
      <header className="header">
        <div className="bg-blue-100 p-4">
          <div className="container mx-auto">
            <div className="flex items-center justify-between"> 
              {/* 左侧：logo和分类导航 */}
              <div className="flex items-center space-x-8">
                <div className="logo text-xl font-bold relative pb-1">
                  <span className="relative z-10">时尚商城</span>
                  <div className="absolute bottom-0 left-0 w-full h-2 bg-pink-200 -mb-1"></div>
                </div>
                <nav className="category-nav hidden md:flex">
                  <ul className="flex space-x-6">
                    {categories.map((category) => (
                      <li key={category.id}>
                        <a href={`#${category.id}`} className="hover:text-blue-400">{category.name}</a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
              
              {/* 右侧：搜索框和用户操作 */}
              <div className="flex items-center space-x-4">
                <div className="search-box flex-grow max-w-xs md:max-w-md">
                  <form onSubmit={handleSearch} className="flex">
                    <input
                      type="text"
                      placeholder="搜索商品..."
                      value={searchKeyword}
                      onChange={(e) => setSearchKeyword(e.target.value)}
                      className="px-4 py-2 rounded-l-lg border focus:outline-none  w-full"
                    />
                    <button type="submit" className="px-4 py-2 bg-blue-300 text-white rounded-r-lg hover:bg-blue-400
                     focus:outline-none  focus:ring-blue-400">
                      🔍︎
                    </button>
                  </form>
                </div>
                
                <div className="user-actions flex items-center space-x-4">
                  <button 
                    onClick={handleAuthNavigate} 
                    className="hover:text-blue-700 cursor-pointer"
                  >
                    登录
                  </button>
                  <span>|</span>
                  <button 
                    onClick={handleAuthNavigate} 
                    className="hover:text-blue-700 cursor-pointer"
                  >
                    注册
                  </button>
                  <a href="/cart" className="cart-icon hover:text-blue-700">
                    🛒
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 轮播图 */}
      <div 
        className="banner-container"
        style={{
          position: 'relative',
          width: '100%',
          height: '600px',
          overflow: 'hidden'
        }}
      >
        {/* 前进按钮 */}
        <button 
          onClick={goToPrev}
          style={{
            position: 'absolute',
            top: '50%',
            left: '10px',
            transform: 'translateY(-50%)',
            background: 'rgba(0, 0, 0, 0.1)',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            cursor: 'pointer',
            zIndex: '10',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px'
          }}
        >
          &lt;
        </button>
        
        {/* 后退按钮 */}
        <button 
          onClick={goToNext}
          style={{
            position: 'absolute',
            top: '50%',
            right: '10px',
            transform: 'translateY(-50%)',
            background: 'rgba(0, 0, 0, 0.1)',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            cursor: 'pointer',
            zIndex: '10',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px'
          }}
        >
          &gt;
        </button>
  
        <div 
          className="banner-slider"
          style={{
            position: 'relative',
            width: '100%',
            height: '100%'
          }}
        >
          {banners.map((banner, index) => (
            <div
              key={banner.id}
              className={getSlideClass(index)}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                opacity: index === currentBanner ? 1 : 0,
                transition: 'opacity 0.5s ease',
                display: index === currentBanner ? 'block' : 'none'
              }}
            >
              <a href={banner.link}>
                <img 
                  src={banner.image} 
                  alt={`Banner ${banner.id}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </a>
            </div>
          ))}
        </div>
        <div 
          className="banner-indicators"
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '8px'
          }}
        >
          {banners.map((_, index) => (
            <div
              key={index}
              className={getIndicatorClass(index)}
              onClick={() => setCurrentBanner(index)}
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: index === currentBanner ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.5)',
                cursor: 'pointer',
                transition: 'background-color 0.3s'
              }}
            />
          ))}
        </div>
      </div>

      {/* 主要内容区域 */}
      <main className="main-content">
          {/* 热门穿搭 */}
          <section className="section hot-outfits">
            <div className="logo text-xl font-bold relative pb-1 flex flex-col items-center m-4">
              <h1 className="section-title relative text-2xl text-pink-200">热门穿搭</h1>
              <h2 className="section-title relative text-xl text-pink-200">Popular Outfits</h2>
            </div>
            <div className="outfit-grid">
              <div className="flex justify-center items-center flex-wrap gap-4">
                {hotOutfits.map((outfit) => (
                  <div key={outfit.id} className="outfit-card flex flex-col items-center">
                    <img 
                      className='h-80 w-auto flex items-center justify-center' 
                      src={outfit.image} 
                      alt={outfit.title} 
                    />
                    <h3>{outfit.title}</h3>
                    <button className="view-more hover:text-blue-400">查看详情</button>
                  </div>
                ))}
              </div>
            </div>
          </section>
          {/* 新品上市 */}
          <section className="section new-arrivals">
            <div className="logo text-xl font-bold relative pb-1 flex flex-col items-center m-4">
              <h1 className="section-title relative text-2xl text-pink-200">新品上市</h1>
              <h2 className="section-title relative text-xl text-pink-200">New Products Launched</h2>
            </div>
            <div className="product-grid">
              <div className="flex justify-center items-center flex-wrap gap-4">
                {newArrivals.map((product) => (
                  <div key={product.id} className="product-card flex flex-col items-center">
                    <img 
                      className='h-80 w-auto flex items-center justify-center' 
                      src={product.image} 
                      alt={product.name} 
                    />
               <div className="flex justify-between items-center h-12 m-2">
                        <div>
                          <h3>{product.name}</h3>
                          <p className="price">¥{product.price}</p>
                        </div>
                        <button className="add-to-cart text-white bg-orange-400 w-8 h-9 text-2xl ml-36 hover:bg-orange-500
                     focus:outline-none focus:ring-orange-500">＋</button>
                      </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
      </main>

      {/* 底部标签 */}
      <footer className="footer bg-blue-100 py-2">
        <div className="footer-content max-w-6xl mx-auto px-4">
          <div className="flex justify-between flex-wrap gap-80">
            <div className="footer-section">
              <h3 className="font-bold mb-2">客户服务</h3>
              <ul className="space-y-1">
                <li><a href="#" className="hover:text-blue-400">帮助中心</a></li>
                <li><a href="#" className="hover:text-blue-400">售后服务</a></li>
                <li><a href="#" className="hover:text-blue-400">配送方式</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h3 className="font-bold mb-2">关于我们</h3>
              <ul className="space-y-1">
                <li><a href="#" className="hover:text-blue-400">公司简介</a></li>
                <li><a href="#" className="hover:text-blue-400">加入我们</a></li>
                <li><a href="#" className="hover:text-blue-400">联系我们</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h3 className="font-bold mb-2">关注我们</h3>
              <div className="social-media flex justify-center gap-4">
                <ul className="space-y-1">
                  <li><a href="#" className="hover:text-blue-400">微信</a></li>
                  <li><a href="#" className="hover:text-blue-400">微博</a></li>
                  <li><a href="#" className="hover:text-blue-400">抖音</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="footer-bottom-container">
        <div className="footer-bottom text-center bg-pink-200">
          <p className="text-white">© 2025 时尚商城 版权所有</p>
        </div>
      </div>
    </div>
  );
}

export default App;
# Fort Lee ↔ Columbia 拼车微信小程序 — 开发规格

## 项目概述

为哥伦比亚大学住在 Fort Lee, NJ 的研究生群体开发一款**微信小程序**，解决每日通勤拼车需求。核心场景：Fort Lee 与哥大之间需经过 George Washington Bridge（GWB），过桥费 $23.30，通过拼车每位乘客固定支付 $8。

### 两种拼车模式
1. **顺风车** — 有车的车主发起行程，带乘客一起走，乘客每人 $8
2. **Uber 拼单** — 无合适车主时，乘客自发组队叫 Uber，AA 分摊车费

### Figma 设计稿
https://www.figma.com/design/NHrWvqG4BzihpYZu9Y0Ugg/拼车-UI

---

## 设计系统 (Design Tokens)

### 色彩
```
主色 (Columbia Navy Blue):  #1D4F91  rgb(29, 79, 145)
主色浅底:                   #E1ECF7  rgb(225, 236, 247)
成功/绿色:                  #33B338  rgb(51, 179, 56)
警告/琥珀 (GWB过桥费):      #F59E0B  rgb(245, 158, 11)
Uber 标签色:                #D98005  rgb(217, 128, 5)
Uber 标签底:                #FFF2E6  rgb(255, 242, 230)
顺风车标签色:               #21A61B  rgb(33, 166, 27)
顺风车标签底:               #EDFAED  rgb(237, 250, 237)

文字/主:                    #1A1A2E  rgb(26, 26, 46)
文字/副:                    #6B7280  rgb(107, 114, 128)
文字/弱:                    #B8BCC2  rgb(184, 188, 194)

背景/页面:                  #F5F7FA  rgb(245, 247, 250)
背景/卡片:                  #FFFFFF
背景/输入框:                #F5F7FA
分割线:                     #ECEDF0  rgb(236, 237, 240)
```

### 字体
- 中文: 系统默认 (微信小程序自动使用设备字体)
- 英文/数字: 系统默认
- 字重映射: Bold=700, Semi Bold=600, Medium=500, Regular=400

### 字号层级
```
页面标题:    20px  Bold
区块标题:    16-17px  Bold
卡片主文:    15-16px  Bold/SemiBold
正文:        13-14px  Regular/Medium
辅助文字:    11-12px  Regular
大数字(价格): 20-22px  Bold
超大数字(ETA): 36-48px  Bold
```

### 圆角
```
卡片:        16px
按钮:        12-16px
标签/徽章:    4-8px
输入框:      12px
Bottom Sheet: 24px (顶部)
头像:        50% (圆形)
FAB:         50% (圆形)
```

### 间距
```
页面水平边距:  20px
卡片内边距:    16px
区块间距:      8px (分隔条)
卡片间距:      12px
元素间距:      4-8px
```

---

## 页面结构 (5个页面)

### Page 1: 首页 — 拼车广场
**路径**: `/pages/index/index`
**Tab Bar页**: 是 (首页)

#### 布局结构 (从上到下)
1. **地图区域** (占上半屏约 50%)
   - 使用微信小程序内置地图组件 `<map>`
   - 中心点: Fort Lee 与 Columbia 中间 (约 40.830, -73.965)
   - 缩放级别: 13
   - 标记点 (markers):
     - Fort Lee 出发点: 绿色标记 (40.852, -73.972)
     - GWB 过桥费标记: 琥珀色标记 "GWB $23.30" (40.851, -73.953)
     - Columbia 目的地: 蓝色标记 (40.808, -73.963)
   - 路线绘制: 使用 polyline 画 Fort Lee → GWB → Columbia 驾车路线
   - 车主实时位置: 蓝色圆点标记在线车主 (有行程时)
   - 顶部悬浮横幅: "今天已有 X 人出行" (白色半透明背景, 圆角 20px)

2. **底部弹窗 (Bottom Sheet)** (圆角 24px, 白色, 上方投影)
   - 拖拽手柄: 居中, 40×4px, 圆角
   - **标签栏**: 
     - "🚗 顺风车" (选中态: Bold 16px 蓝色 + 蓝色下划线)
     - "🚕 Uber拼单" (未选中: Regular 15px 灰色)
   - **行程卡片列表** (可滚动):
     每张卡片包含:
     - 车主头像 (40px 圆形) + 姓名 (Bold 15px) + 🎓CU 认证徽章 + ⭐评分 + 次数
     - 出发时间 (Bold 22px) + AM/PM + 路线 "Fort Lee → Columbia"
     - 座位指示 (4个小圆点: 蓝色=已占, 灰色=空位)
     - 价格 (Bold 20px 蓝色 "$8 /人") + "加入拼车" 按钮
     - 顺风车卡: 绿底绿字 "顺风车" 标签
     - Uber卡: 橙底橙字 "Uber" 标签, 价格 "预估 $13/人 (4人拼)"

3. **悬浮 FAB 按钮** (固定右下角)
   - 56×56px 圆形, Columbia Blue 背景, 白色 "+" 
   - 双层投影, 下方小字 "发起"
   - 点击 → 弹出发起拼车 Bottom Sheet

4. **底部导航栏** (TabBar)
   - 首页 (选中) | 我的行程 | 我的

---

### Page 2: 行程详情
**路径**: `/pages/trip-detail/trip-detail`
**入口**: 点击首页卡片

#### 布局结构
1. **导航栏**: ← 返回 | "行程详情" | ••• 分享
2. **车主信息卡**: 头像 + 姓名 + 🎓哥大认证 + ⭐4.9 + 86次出行 + 车牌号 NJ•ABC 1234
3. **行程路线 (三段时间轴)**:
   - 🟢 **出发** 8:30 AM — Fort Lee, NJ · [具体上车点]
   - 🟠 **GWB** — George Washington Bridge
     - 琥珀色信息卡: "过桥费 (Peak Hour) $23.30 → 每位乘客 $8"
   - 🔵 **到达** ~9:10 AM — Columbia University · [具体下车点]
4. **费用明细**:
   - 过桥费 (GWB Toll) · 每人固定 → $8.00
   - 含油费+过桥分摊+补贴 → "已含 · 不另收费" (绿色)
   - 合计 → $8.00/人 (蓝色大字)
5. **乘客**: "2/4 座位已填" + 头像列表 + 空座位虚线圆
6. **底部 CTA**: "加入拼车 · $8/人" (蓝色大按钮, 圆角 16px)

---

### Page 3: 发起拼车 (Bottom Sheet 弹窗)
**路径**: 首页 FAB 触发, 不跳页, Bottom Sheet 覆盖
**背景**: 地图半透明遮罩 (黑色 30% 透明度)

#### 表单字段 (从上到下)
1. **模式选择**: 两张卡片横排
   - "顺风车 · 带人出行" (选中: 蓝色边框 + 浅蓝底)
   - "拼 Uber · 打车AA" (未选中: 灰色底)

2. **出发地** (下拉选择器)
   - 标签: 🟢 出发地
   - 下拉框: 显示 [图标] 地点名 / 所属区域 / ▼
   - **Fort Lee 地区选项**: 100 Modern, 800 Modern, Fiat House, 2050, Hudson Light, FL市区
   - **哥大选项**: 主校区, 医学院, 商学院, TC, SIPA

3. **↕ 换向按钮** (居中, 圆角胶囊)

4. **目的地** (下拉选择器, 结构同出发地)

5. **出发时间**: 🕐 今天 8:30 AM ▼ (调用微信时间选择器)

6. **可带人数**: 1 / 2 / 3 / 4 (四个方形按钮横排, 选中态蓝色)

7. **费用预览**: ✅ "过桥费: 每位乘客固定 $8/人" (绿色)

8. **提交按钮**: "发起拼车" (蓝色大按钮, 投影)

---

### Page 4: 我的行程
**路径**: `/pages/my-trips/my-trips`
**Tab Bar页**: 是 (我的行程)

#### 布局结构
1. **页面标题**: "我的行程" (Bold 20px)
2. **标签切换**: "进行中" (选中+下划线) | "历史"
3. **累计节省 Banner** (蓝色渐变 #1D4F91 → #366DB3)
   - 左: "累计节省" (60%透明白) + "$286" (Bold 36px 白色)
   - 右: "32 次拼车" (白色) + "平均每次省 $8.9" (60%透明白)
4. **待出发行程** (蓝色渐变卡片, 16px 圆角, 蓝色投影)
   - "• 待出发" 标签 + "今天"
   - 时间 + 路线 + 车主名 + 座位 + 费用
5. **近期行程列表**:
   每条: 时间 + 标签(顺风车/Uber) + 路线日期 + 费用 + 节省金额(绿色)

---

### Page 5: 加入确认
**路径**: `/pages/join-confirm/join-confirm`
**入口**: 点击行程详情 CTA 或首页卡片 "加入拼车"

#### 布局结构
1. **导航栏**: ← | "确认加入"
2. **车主信息**: 头像 + 姓名 + 🎓哥大认证 + 评分 + 车型
3. **行程概要**: 时间 | 路线 | 日期 (灰色背景条)
4. **谁在这辆车里**:
   - 已上车乘客: 头像 + 姓名 + 院系 + 🎓CU 徽章
   - 空座位: 虚线圆 + "空座位 · 等待加入" (4座车显示对应数量空位)
5. **费用说明** (琥珀色边框卡片):
   - 🌉 GWB过桥费 → "每人固定 $8.00" (琥珀色)
   - 🔥 油费+补贴 → "已含"
   - 合计 → $8.00 (蓝色大字)
6. **支付方式**:
   - Zelle (选中: 蓝色边框) — "上车后转账给车主"
   - Venmo (未选中: 灰色底)
7. **底部 CTA**: "确认加入 · 支付 $8.00" (蓝色大按钮)

---

## 地点配置 (硬编码常量)

```javascript
const LOCATIONS = {
  fortLee: {
    label: 'Fort Lee 地区',
    icon: '🏠',
    places: [
      { id: 'fl_100modern', name: '100 Modern', lat: 40.8512, lng: -73.9710 },
      { id: 'fl_800modern', name: '800 Modern', lat: 40.8495, lng: -73.9705 },
      { id: 'fl_fiathouse', name: 'Fiat House', lat: 40.8520, lng: -73.9695 },
      { id: 'fl_2050',      name: '2050',        lat: 40.8530, lng: -73.9720 },
      { id: 'fl_hudsonlight',name: 'Hudson Light',lat: 40.8485, lng: -73.9715 },
      { id: 'fl_downtown',   name: 'FL市区',      lat: 40.8509, lng: -73.9723 },
    ]
  },
  columbia: {
    label: '哥大',
    icon: '🎓',
    places: [
      { id: 'cu_main',     name: '主校区',   lat: 40.8075, lng: -73.9626 },
      { id: 'cu_medical',  name: '医学院',   lat: 40.8405, lng: -73.9422 },
      { id: 'cu_business', name: '商学院',   lat: 40.8185, lng: -73.9600 },
      { id: 'cu_tc',       name: 'TC',       lat: 40.8078, lng: -73.9588 },
      { id: 'cu_sipa',     name: 'SIPA',     lat: 40.8070, lng: -73.9598 },
    ]
  }
};

const GWB_TOLL = 23.30;
const PASSENGER_FEE = 8;
```

---

## 数据模型

### User (用户)
```
{
  openId:          string     // 微信 openId
  nickName:        string     // 微信昵称
  avatarUrl:       string     // 头像
  phone:           string     // 手机号 (可选)
  cuVerified:      boolean    // 哥大认证
  cuEmail:         string     // @columbia.edu 邮箱 (验证用)
  rating:          number     // 评分 (1-5)
  totalTrips:      number     // 总行程数
  totalSaved:      number     // 累计节省金额
  paymentMethods:  string[]   // ['zelle', 'venmo']
  zelleAccount:    string     // Zelle 账号
  venmoAccount:    string     // Venmo 账号
  createdAt:       timestamp
}
```

### Trip (行程)
```
{
  tripId:          string
  type:            'ride' | 'uber'    // 顺风车 or Uber拼单
  status:          'open' | 'full' | 'departed' | 'completed' | 'cancelled'
  
  driverId:        string             // 车主 userId (顺风车) / 发起人 (Uber)
  
  fromPlace:       string             // 出发地点 ID
  fromGroup:       'fortLee' | 'columbia'
  toPlace:         string             // 目的地点 ID
  toGroup:         'fortLee' | 'columbia'
  
  departureTime:   timestamp          // 出发时间
  estimatedArrival:timestamp          // 预计到达
  
  totalSeats:      number             // 总座位 (1-4)
  passengers:      PassengerInfo[]    // 已加入乘客
  
  pricePerPerson:  number             // 每人费用 ($8 顺风车, 预估值 Uber)
  
  carModel:        string             // 车型 (顺风车)
  licensePlate:    string             // 车牌 (顺风车)
  
  createdAt:       timestamp
  updatedAt:       timestamp
}
```

### PassengerInfo
```
{
  userId:          string
  status:          'pending' | 'confirmed' | 'cancelled'
  joinedAt:        timestamp
  paymentMethod:   'zelle' | 'venmo'
}
```

---

## 云开发配置 (微信云开发)

### 推荐技术栈
- **前端**: 微信小程序原生框架 (WXML + WXSS + JS)
- **后端**: 微信云开发 (云函数 + 云数据库 + 云存储)
- **数据库**: 云数据库 (MongoDB-like)
- **消息推送**: 订阅消息 (行程状态变更通知)

### 云函数列表
```
createTrip       — 创建行程
joinTrip         — 加入行程
cancelTrip       — 取消行程
leaveTrip        — 退出行程
getTrips         — 获取行程列表 (首页, 支持筛选)
getTripDetail    — 获取行程详情
getMyTrips       — 获取我的行程
getUserProfile   — 获取/更新用户信息
verifyCU         — 哥大邮箱验证
```

### 订阅消息模板
- 有人加入你的行程
- 行程已满员
- 行程被取消
- 行程即将出发 (出发前30分钟)

---

## 交互规范

### 首页
- 下拉刷新: 刷新行程列表
- 标签切换: 顺风车 ↔ Uber拼单, 筛选对应类型
- 点击卡片 → 行程详情页
- 点击 FAB → 弹出发起拼车 Bottom Sheet

### 发起拼车
- 模式切换: 顺风车 ↔ 拼Uber, 切换表单字段
- 出发地/目的地: 下拉选择, 分 "Fort Lee 地区" 和 "哥大" 两组
- ↕ 按钮: 交换出发地和目的地
- 时间选择: 调用微信 picker, 日期+时间
- 提交后: 关闭 Bottom Sheet, 新行程出现在列表顶部

### 加入行程
- 点击 "加入拼车" → 加入确认页
- 选择支付方式 → 确认加入
- 加入后: 行程卡片座位状态更新, 满员自动标记

### 取消规则
- 出发前 2 小时可免费取消
- 2 小时内取消计入违约记录
- 取消后通知其他乘客

---

## 注意事项

1. **地图组件**: 使用微信小程序 `<map>` 组件, 腾讯地图 SDK, 需要在小程序后台配置 key
2. **颜色一致性**: 所有蓝色统一使用 #1D4F91 (Columbia Navy Blue), 不要用默认的 #1677FF
3. **字体**: 不需要引入外部字体, 微信小程序默认字体即可
4. **底部安全区**: iPhone X 系列需要适配底部安全区 (padding-bottom: env(safe-area-inset-bottom))
5. **哥大认证**: MVP 阶段可以用邀请码制度, 后期接入 @columbia.edu 邮箱验证
6. **支付**: 不走微信支付, 只展示 Zelle/Venmo 账号信息, 线下转账
7. **免责**: 首次使用弹出免责声明 (成本分摊, 非营运)

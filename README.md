# 🚗 Columbia Carpool Miniapp

<div align="center">

[![Stars](https://img.shields.io/github/stars/KaichenCurry/columbia-carpool-miniapp?style=flat-square)](https://github.com/KaichenCurry/columbia-carpool-miniapp/stargazers)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![Platform](https://img.shields.io/badge/WeChat%20Mini%20Program-07C160?style=flat-square)](https://developers.weixin.qq.com/miniprogram/dev/index.html)
[![WeChat](https://img.shields.io/badge/WeChat-07C160?style=flat-square&logo=wechat&logoColor=white)](https://weixin.qq.com/)

**面向哥大留学生的拼车小程序 — Fort Lee ↔ Columbia University**

[English](./README_en.md) · [产品需求文档](./docs/PRD.md) · [设计稿](./docs_FIGMA.md)

</div>

---

## 📋 目录

- [项目介绍](#项目介绍)
- [问题与解决方案](#问题与解决方案)
- [功能预览](#功能预览)
- [核心功能](#核心功能)
- [技术架构](#技术架构)
- [AI 智能推荐](#ai-智能推荐)
- [快速开始](#快速开始)
- [项目结构](#项目结构)
- [未来路线图](#未来路线图)
- [相关文档](#相关文档)

---

## 项目介绍

### 是什么

面向 **哥伦比亚大学留学生** 的微信拼车小程序，解决 **Fort Lee, NJ ↔ Columbia University** 日常通勤需求。

### 核心场景

> 哥大学生住在 Fort Lee，每日通勤经过 **乔治·华盛顿大桥（GWB）**，单程过桥费 **$23.30**。通过拼车，每位乘客仅需支付 **$8**，车主覆盖成本，乘客省钱。

### 两种拼车模式

| 模式 | 说明 | 费用 |
|------|------|------|
| 🚗 顺风车 | 车主发布行程，乘客加入 | $8/人 |
| 🚕 Uber 拼单 | 乘客组队叫 Uber，AA 分摊 | 实时计价 |

---

## 问题与解决方案

```
┌────────────────────────────────────────────────────────────────────────┐
│                         通勤拼车三大痛点                                  │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│   💰 费用高                      📱 协调效率低               🔒 信任难建立   │
│   GWB 单程 $23.30             微信群刷屏找拼车            第一次拼车谁都不信谁   │
│   独自承担太贵                   信息散乱难追踪               无法核实对方身份       │
│        │                              │                           │        │
│        ▼                              ▼                           ▼        │
│   💵 多人分摊                  📋 标准化流程              ✅ 哥大认证体系      │
│   每人仅需 $8                   一键发布/加入              身份核实有保障        │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 功能预览

### 用户操作流程

![功能预览](./docs/screenshots/merged-flow.png)

**Step 1：首页 — 拼车广场**
浏览可用行程，查看地图和今日拼车人数。

**Step 2：行程详情**
查看车主信息、路线时间轴、费用明细，确认后加入。

**Step 3：发起拼车**
填写行程信息，设置时间、人数，发布自己的拼车。

**Step 4：我的行程**
管理已加入的行程，查看进行中/历史的订单。

**Step 5：确认加入**
选择支付方式（Zelle/Venmo），完成拼车加入。

---

## 核心功能

### 🛡️ 信任体系

| 功能 | 说明 | 状态 |
|------|------|------|
| 哥大认证 | 绑定 Columbia 邮箱或学生 ID | ✅ 已实现 |
| 车主评分 | 5 星评分系统 | ✅ 已实现 |
| 实名车辆 | 车牌号、车型信息 | ✅ 已实现 |
| 历史行程 | 显示车主接单次数 | ✅ 已实现 |

### 💰 费用透明

| 项目 | 金额 | 说明 |
|------|------|------|
| GWB 过桥费 | **$8/人** | 固定价格 |
| 油费补贴 | 已包含 | 不额外收费 |
| 隐藏费用 | 无 | 明确标注 |

---

## 技术架构

```
┌─────────────────────────────────────────────────────────────────────────┐
│                            微信小程序前端                                │
│   pages/index   pages/trip-detail   pages/create-trip   pages/my-trips   │
│                          components/*   services/*                       │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                          微信云开发云函数                               │
│                                                                          │
│   createTrip   joinTrip   leaveTrip   cancelTrip                        │
│   getTrips    getTripDetail   getMyTrips   getUserProfile              │
│   verifyCU    getCreateTripHint                                            │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                          微信云开发数据库                               │
│                    users        trips        passengers                   │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## AI 智能推荐

### 智能出发时间建议

根据历史出行数据，AI 推荐最佳出发时间，帮助用户避开 GWB 早高峰。

```json
{
  "departureTime": "8:30 AM",
  "confidence": "高",
  "reason": "根据历史数据分析，8:30 AM 出发可避开 GWB 早高峰",
  "strategy": "heuristic_v1"
}
```

> ⚠️ 当前为启发式算法（heuristic），未来计划升级为机器学习模型。

---

## 快速开始

### 环境要求

| 环境 | 版本要求 |
|------|---------|
| 微信开发者工具 | 最新版本 |
| 微信 | 8.0+ |

### 部署步骤

```bash
# 1. 克隆项目
git clone https://github.com/KaichenCurry/columbia-carpool-miniapp.git
cd columbia-carpool-miniapp

# 2. 导入项目
# 打开微信开发者工具，选择「导入项目」

# 3. 配置云环境
# 在 miniprogram/app.js 中修改云环境 ID

# 4. 创建云数据库集合
# users, trips, passengers
```

---

## 项目结构

```
columbia-carpool-miniapp/
├── miniprogram/                    # 小程序前端
│   ├── pages/
│   │   ├── index/               # 首页（拼车广场）
│   │   ├── trip-detail/          # 行程详情
│   │   ├── create-trip/          # 发起拼车
│   │   ├── my-trips/             # 我的行程
│   │   └── join-confirm/         # 确认加入
│   ├── components/                # 复用组件
│   ├── services/                  # API 服务层
│   └── app.js                    # 应用入口
│
├── cloudfunctions/                # 云函数
│   ├── createTrip/              # 创建行程
│   ├── joinTrip/               # 加入行程
│   ├── leaveTrip/              # 退出行程
│   ├── cancelTrip/             # 取消行程
│   ├── getTrips/               # 获取行程列表
│   ├── getTripDetail/           # 获取行程详情
│   ├── getMyTrips/             # 获取我的行程
│   ├── getUserProfile/         # 获取用户信息
│   ├── verifyCU/               # 哥大认证
│   ├── getCreateTripHint/       # AI 出发时间建议
│   └── common/                  # 公共模块
│
└── docs/
    ├── screenshots/             # 功能截图
    ├── PRD.md                   # 产品需求文档
    └── docs_FIGMA.md           # 设计稿说明
```

---

## 项目状态

### ✅ 已实现

| 功能 | 状态 |
|------|------|
| 5 页小程序界面 | ✅ |
| 拼车创建和加入流程 | ✅ |
| 哥大认证体系 | ✅ |
| AI 出发时间建议 | ✅ |
| Mock 数据调试 | ✅ |

### ⚠️ 规划中

| 功能 | 状态 |
|------|------|
| 完整支付集成 | ⚠️ 规划中 |
| 实时位置追踪 | ⚠️ 规划中 |
| 机器学习推荐 | ⚠️ 规划中 |

---

## 未来路线图

```
v1.0 (当前) ──────────────────────────────────────────────────────────────
    ✅ 基础拼车流程
    ✅ 哥大认证
    ✅ AI 启发式建议

        ▼
v1.1 ─────────────────────────────────────────────────────────────────────
    📝 自然语言创建行程
    🔍 智能搜索和筛选

        ▼
v1.2 ─────────────────────────────────────────────────────────────────────
    📊 历史数据分析
    🚗 常用路线收藏

        ▼
v2.0 ─────────────────────────────────────────────────────────────────────
    🤖 机器学习推荐模型
    🚨 GWB 实时路况
    ⚠️ 异常检测和预警
```

---

## 相关文档

| 文档 | 说明 |
|------|------|
| [PRD.md](./docs/PRD.md) | 产品需求文档 |
| [docs_FIGMA.md](./docs_FIGMA.md) | 设计稿说明 |
| [UI_COMPONENTS.md](./UI_COMPONENTS.md) | UI 组件规范 |

---

## 参与贡献

欢迎提交 Issue 和 Pull Request！

---

## License

[MIT License](./LICENSE)

---

<div align="center">

**如果这个项目对你有帮助，请给它一个 ⭐！**

**Star this project if you find it helpful!**

---

*Made by [Curry Chen](https://github.com/KaichenCurry)*

</div>

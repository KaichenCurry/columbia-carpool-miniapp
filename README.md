# 🚗 Columbia Carpool Miniapp

<div align="center">

[![Stars](https://img.shields.io/github/stars/KaichenCurry/columbia-carpool-miniapp?style=flat-square)](https://github.com/KaichenCurry/columbia-carpool-miniapp/stargazers)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![Platform](https://img.shields.io/badge/Platform-WeChat%20Mini%20Program-07C160?style=flat-square)](https://developers.weixin.qq.com/miniprogram/dev/index.html)
[![Status](https://img.shields.io/badge/Status-MVP-orange?style=flat-square)](#current-status)

**面向哥大留学生的拼车小程序 — Fort Lee ↔ Columbia University**

[English](./README_en.md) · [产品文档](./docs) · [设计稿](./docs_FIGMA.md)

</div>

---

## 🎯 是什么

面向 **哥伦比亚大学留学生** 的微信拼车小程序，解决 **Fort Lee ↔ Columbia** 通勤痛点。

| 痛点 | 解决方案 |
|------|---------|
| 过乔治华盛顿大桥费用高 | 多人分摊 GWB 过桥费 |
| 微信群协调效率低 | 标准化拼车流程 |
| 第一次拼车信任难建立 | 哥大认证体系 |

**两种拼车模式**：
- 🚗 **顺风车**：车主发布行程，乘客加入
- 🚕 **Uber 拼单**：乘客拼单打车，分摊车费

---

## 📱 功能预览

### 1. 首页 - 拼车广场

![首页](./docs/screenshots/Screenshot%202026-04-17%20at%2012.37.57%20AM.png)

浏览可用行程，点击右侧 **+** 发起自己的拼车

---

### 2. 行程详情

![行程详情](./docs/screenshots/Screenshot%202026-04-17%20at%2012.38.03%20AM.png)

查看车主信息、路线、费用，点击底部按钮 **加入拼车**

---

### 3. 发起拼车

![发起拼车](./docs/screenshots/Screenshot%202026-04-17%20at%2012.38.09%20AM.png)

填写行程信息，点击 **发起拼车** 发布行程

---

### 4. 我的行程

![我的行程](./docs/screenshots/Screenshot%202026-04-17%20at%2012.38.13%20AM.png)

切换「进行中」/「历史」查看不同状态的行程

---

### 5. 确认加入

![确认加入](./docs/screenshots/Screenshot%202026-04-17%20at%2012.38.18%20AM.png)

确认行程和费用，点击 **确认支付**

---

## ✨ 核心功能

### 信任体系

| 功能 | 说明 |
|------|------|
| 哥大认证 | 车主必须通过哥伦比亚大学身份认证 |
| 评分系统 | 5 星评分 + 行程次数展示 |
| 实名信息 | 乘客可查看车主真实姓名和车辆信息 |

### 费用透明

| 项目 | 说明 |
|------|------|
| GWB 过桥费 | 固定 $8/人 |
| 油费补贴 | 已包含在固定费用中 |
| 无隐藏费用 | 明确标注"不再额外收费" |

---

## 🛠️ 技术架构

```
微信小程序前端
    └─ miniprogram/pages/*    components/*    services/*
            │
            ▼
    微信云开发云函数
    ├─ createTrip        创建行程
    ├─ joinTrip          加入行程
    ├─ getTrips          获取行程列表
    ├─ getTripDetail     行程详情
    ├─ getMyTrips        我的行程
    ├─ verifyCU          哥大认证
    └─ getCreateTripHint AI 出发时间建议
            │
            ▼
    微信云开发数据库
    users  trips  passengers
```

---

## 🤖 AI 功能（已上线）

智能出发时间建议 — 根据历史数据推荐最佳出发时间

```json
{
  "departureTime": "8:30 AM",
  "confidence": "高",
  "reason": "避开早高峰，准时到达",
  "strategy": "heuristic_v1"
}
```

---

## 📊 当前状态

| 已实现 | 局限性 |
|--------|--------|
| ✅ 5 页完整界面 | ⚠️ 部分交互占位 |
| ✅ 拼车流程 | ⚠️ 支付未集成 |
| ✅ 云函数骨架 | ⚠️ 实时追踪未实现 |
| ✅ Mock 数据调试 | ⚠️ AI 为启发式 |

---

## 🚀 快速开始

```bash
# 1. 克隆项目
git clone https://github.com/KaichenCurry/columbia-carpool-miniapp.git

# 2. 用微信开发者工具打开
# 导入 project.config.json

# 3. 配置云环境 ID
# 在 miniprogram/app.js 中设置

# 4. 导入种子数据
cloudfunctions/seeds/
```

---

## 🗺️ 路线图

| 版本 | 功能 |
|------|------|
| v1.1 | 自然语言创建行程 |
| v1.2 | 智能路线推荐 |
| v1.3 | 高峰期需求预测 |
| v2.0 | GWB 实时路况、异常检测 |

---

## 🔗 链接

- GitHub: https://github.com/KaichenCurry/columbia-carpool-miniapp
- Figma: [首页](https://www.figma.com/design/NHrWvqG4BzihpYZu9Y0Ugg/拼车-UI?node-id=6-2)

---

<div align="center">

**给个 ⭐ 支持一下！**

*Made by [Curry Chen](https://github.com/KaichenCurry)*

</div>

---
title: 作っているツールとその関係
description: 公開・非公開あわせて、いま作っているツールの一覧と、それぞれのつながり
date: 2026-10-24T11:41:32+09:00
tags: [開発]
draft: true
---

いま作っているツールを、公開しているものと非公開のものをあわせて整理しておきます。名前の多くはギリシャ・ローマ神話から取っています。

（TODO：非公開のツールの名前や役割を、どこまで公開してよいか）

## 全体像

![ツールの関係図](./map.svg "図1　ツールの関係。矢印は呼び出しやデータの流れ")

中心は qrxarts という Python のライブラリです。日本株のリサーチ、データの取り込み、バックテスト、レポート作成をまとめています。

## qrxarts のサービス

| 名前 | 役割 | 技術 |
| --- | --- | --- |
| Atlas | Web の画面 | Next.js |
| Athena | Atlas や Jupyter から呼ぶ API | FastAPI |
| Helios | 株価のスナップショットを取って保存する | Python |
| Titan | 市場をリアルタイムで監視する | Python |
| PostgreSQL | 共通のデータベース | PostgreSQL |

Atlas は Athena の API を呼んで画面を作ります。Titan は Helios から株価を受け取り、その内容は Atlas の画面からも見られます。Athena と Helios は同じ PostgreSQL を使っています。

## qrxarts の中のライブラリ

- **Metis**：バリュエーション用の Excel ワークブックを作ります
- **Clio**：分析内容のアーカイブです
- **Fama**：ニュースを要約します

## LLM まわり

ニュースの要約、レポートの作成、埋め込みは、手元の GPU で動かしているローカル LLM を使っています。推論エンジンは Strata、vLLM、Ollama のどれかで、起動と停止は Ares で管理しています。

どのエンジンも OpenAI 互換の API で呼べるので、qrxarts 側のコードはエンジンが変わっても同じです。

## レポートの置き場所

レポートは LaTeX と PDF で、qrxreports という別のリポジトリに置いています。qrxarts が書き出したレポートを、Athena が画面に出します。

## デスクトップアプリ

- **Theia**：Excel のバリュエーションモデルを、Excel を開かずにすばやく見るためのビューアです。PySide6 で作っています。Metis が作ったワークブックを開きます。
- **[Lethe](https://github.com/Hitoshi-Nakanishi/lethe-app)**（公開）：会議や通話を Whisper で文字起こしして、議事録にするアプリです。LLM は Ollama を直接使っていて、qrxarts とはつながっていません。

## 公開しているもの

公開しているのは、このブログと Lethe です。それ以外は今のところ非公開です。

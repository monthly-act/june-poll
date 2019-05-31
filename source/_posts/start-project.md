---
title: Design Inception
date: 2019-05-31 15:29:10
tags: 
---

# june-poll
2019년 6월 월간 김기훈 프로젝트

서비스명 : 휴우봇? 피봇? 

서비스설명 : 실시간 피드백

첫번째 사용자 검증 : 6월 CLD(6/28)에서 사용하는 것을 목표로 개발

주요기능(MVP/happy path) :
긍정적 피드백과 부정적 피드백을 직관적으로 알 수 있는 색상 표시
(예시 good - green / bad - red)
긍정/부정 게이지 상단 표시(%로)
게이지 선택에 따른 피드백 필터 & 디스플레이
어드민/유저 구분
종료 시 기존 화면에 최종 리포트 추가/ 피드백 추가 입력 불가

타겟 : 모바일 향

Tech Stack
vue
firebase 서비스 사용

Benefit
: 제주도 한달 살기 또는 발리 우붓 또는 세미냑

MVP
user story workshop
tech stack.
vue
?
?

기능을 대충 뽑고, 바로 개발?
목요일 9시? 점심?
happy path (persona -> user journey map) / << >> / feature list / feature 우선순위

## feature list
### main 화면 기능
1. positive/negative/question 의 상태로 의견 등록
2. 실시간 의견 비율 노출
3. 의견에 동의 기능 (더블탭)
4. 의견별 list view
5. ranking view
6. filter(positive/negative/question)

### home
1. 방이름을 입력하는 input field/button

### landing screen(일반 user)
1. 닉네임으로 join option 기능(디폴트가 자동생성 - 동물이름 등)

### landing screen(admin)
1. 어드민 로그인 기능
2. 어드민 방? 생성
3. 생성된 방 보여주기
- 방url 생성 및 복사 기능
- 종료 기능

### report
1. 방 종료 후 전체 통계 보여주기


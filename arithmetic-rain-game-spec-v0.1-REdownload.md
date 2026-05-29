# 초등 자연수 연산 산성비 게임 개발 명세서 v0.1

## 1. 프로젝트 개요

본 프로젝트는 초등학생을 대상으로 한 **자연수 사칙연산 학습용 산성비 게임 PWA**이다.

사용자는 가로 화면에서 왼쪽 게임 영역에 떨어지는 연산 문제를 보고, 오른쪽 숫자 키패드로 정답을 입력한다. 문제가 바닥에 닿기 전에 정답을 입력하면 문제가 제거되고 점수를 얻는다.

게임은 학원 수업 및 반복 훈련 상황에서 사용하는 것을 전제로 하며, 스테이지 해금형이 아니라 **자유 선택형 학습 모드**로 설계한다.

PDF의 초등수학 영역별 계통도 기준으로, 1학년 자연수 덧셈·뺄셈, 2학년 곱셈구구, 3~4학년 자연수 곱셈·나눗셈, 자연수 혼합계산 흐름을 반영한다. 분수·소수 연산은 본 게임 범위에서 제외한다.

---

## 2. 개발 환경

| 항목 | 내용 |
|---|---|
| 플랫폼 | PWA |
| 대상 기기 | 모바일 가로, 태블릿 가로 |
| 세로 화면 | 지원하지 않음 |
| 배포 | Vercel |
| 실행 방식 | Chrome 접속 후 홈 화면에 추가 |
| 프론트엔드 | React |
| 언어 | TypeScript |
| 스타일 | Tailwind CSS 추천 |
| 상태 관리 | React state 또는 Zustand |
| 저장소 | localStorage |
| 애니메이션 | requestAnimationFrame 기반 |
| 사운드 | 있음 |
| 폰트 | 여기어때잘난체 기준, 라이선스 확인 필요 |

---

## 3. 화면 방향 및 반응형 정책

### 기본 정책

- 게임은 **가로 모드 전용**이다.
- 세로 화면은 지원하지 않는다.
- 세로 화면 접속 시 게임 화면 대신 안내 화면을 표시한다.

예시 문구:

> 화면을 가로로 돌려주세요.

### 기준 레이아웃

| 영역 | 역할 |
|---|---|
| 왼쪽 영역 | 게임 화면, 문제 낙하, 하트, 점수 표시 |
| 오른쪽 영역 | 현재 입력값, 숫자 키패드, 입력 버튼, 삭제 버튼 |
| 전체 화면 | 모바일/태블릿 가로 기준 full screen UI |

### 권장 비율

| 기기 | 게임 영역 | 입력 영역 |
|---|---:|---:|
| 태블릿 가로 | 52~58% | 42~48% |
| 모바일 가로 | 58~65% | 35~42% |

모바일은 세로 높이가 낮기 때문에 태블릿보다 게임 영역을 조금 더 넓게 잡는다.

---

## 4. 주요 화면

### 4.1 시작 화면

필요 요소:

- 게임 제목
- 모드 선택 버튼
- 난이도 선택 진입
- 설정 버튼
- 성적표 버튼

성적표 기능은 다른 앱의 기능을 가져올 예정이므로, 이번 명세에서는 상세 구현을 제외한다.

### 4.2 모드 선택 화면

게임은 자유 선택형이다.

| 모드 | 설명 |
|---|---|
| 덧셈·뺄셈 | 자연수 덧셈과 뺄셈 중심 |
| 곱셈·나눗셈 | 자연수 곱셈과 나머지 없는 나눗셈 중심 |
| 구구단 | 2~9단 단별 또는 랜덤 연습 |
| 섞어서 | 선택한 범위 내에서 사칙연산 혼합 |
| 혼합계산 | 자연수 사칙연산 혼합계산 |

별도의 “도전 모드”는 만들지 않는다. 혼합계산은 일반 모드 중 하나로 포함한다.

### 4.3 게임 화면

화면은 좌우 2분할 구조이다.

#### 왼쪽 게임 영역

포함 요소:

- 배경 이미지
- 낙하하는 문제 카드
- 하트 UI
- 점수 UI
- 콤보 표시
- 문제 도달선 또는 바닥 영역

#### 오른쪽 입력 영역

포함 요소:

- 현재 입력값 표시
- 숫자 키패드
- 지우기 버튼
- 입력/확인 버튼
- 일시정지 버튼

키패드는 다음 구조를 기준으로 한다.

| 7 | 8 | 9 |
|---|---|---|
| 4 | 5 | 6 |
| 1 | 2 | 3 |
| 지우기 | 0 | 입력 |

버튼 문구는 최종 디자인에서 `입력`, `확인`, `OK` 중 선택 가능하다. 기능상 차이는 없다.

### 4.4 결과 화면

결과 화면에는 다음 정보를 표시한다.

| 항목 | 설명 |
|---|---|
| 최종 점수 | 게임 종료 시 점수 |
| 정답 수 | 맞힌 문제 개수 |
| 오답 수 | 틀린 입력 횟수 |
| 놓친 문제 수 | 바닥에 닿은 문제 수 |
| 오답률 | 전체 시도 대비 오답 비율 |
| 취약 문제 | 자주 틀린 유형 |
| 문제 분석 | 연산 유형별 정답률 |
| 최고 콤보 | 최대 연속 정답 수 |

성적표 기능은 다른 앱 기능을 가져올 예정이므로 이번 구현 범위에서는 상세 제외한다.

---

## 5. 게임 규칙

### 5.1 기본 규칙

| 항목 | 규칙 |
|---|---|
| 제한 시간 | 없음 |
| 생명 | 하트제 |
| 오답 입력 | 생명 감소 없음 |
| 문제 바닥 도달 | 하트 -1 |
| 하트 0개 | 게임 종료 |
| 정답 입력 | 문제 제거, 점수 획득 |
| 같은 답 문제 | 전부 제거 |
| 나머지 있는 나눗셈 | 제외 |
| 혼합계산 | 포함 |
| 사운드 | 있음 |

여기서 “생명 감소 없음”은 **오답 입력 시 생명 감소 없음**을 의미한다. 문제가 바닥에 닿으면 하트는 감소한다.

---

## 6. 점수 규칙

| 행동 | 점수 |
|---|---:|
| 정답 문제 1개 제거 | +10 |
| 연속 정답 5개마다 | +20 |
| 오답 입력 | 0 |
| 문제 놓침 | 0 |

### 같은 답 전부 제거 규칙

입력값과 정답이 같은 문제가 화면에 여러 개 있을 경우, 해당 문제를 모두 제거한다.

예:

| 화면 문제 | 정답 |
|---|---:|
| `4 × 9 =` | 36 |
| `40 - 4 =` | 36 |
| `6 × 6 =` | 36 |

사용자가 `36`을 입력하면 세 문제가 모두 제거된다.

처리 규칙:

- 제거된 문제 수만큼 점수 부여
- 제거된 문제 수만큼 정답 수 증가
- 제거된 문제 수만큼 콤보 증가
- 사운드와 이펙트는 여러 문제 제거에 맞춰 강화 가능

---

## 7. 입력 규칙

### 7.1 입력 방식

사용자는 오른쪽 숫자 키패드로 답을 입력한다.

흐름:

1. 숫자 버튼을 누른다.
2. 현재 입력값 영역에 숫자가 표시된다.
3. `입력` 버튼을 누른다.
4. 현재 입력값과 active problem의 answer를 비교한다.
5. 일치하는 문제가 있으면 제거한다.
6. 일치하는 문제가 없으면 오답으로 기록한다.
7. 입력 후 currentInput은 초기화된다.

### 7.2 지우기 버튼

- `지우기` 버튼은 마지막 숫자 1개를 삭제한다.
- 길게 누르기 또는 별도 구현으로 전체 삭제 기능을 추가할 수 있다.
- MVP에서는 단일 삭제만 구현해도 된다.

### 7.3 입력 제한

- 자연수 답만 입력한다.
- 음수 입력은 없다.
- 소수점 입력은 없다.
- 분수 입력은 없다.
- 나머지 있는 나눗셈은 제외하므로 나머지 표기 입력은 필요 없다.

---

## 8. 게임 루프

### 8.1 상태

| 상태 | 설명 |
|---|---|
| ready | 게임 시작 전 |
| playing | 게임 진행 중 |
| paused | 일시정지 |
| gameOver | 게임 종료 |
| result | 결과 화면 |

### 8.2 기본 루프

1. 게임 시작
2. 선택한 모드와 레벨에 따라 문제 생성
3. 문제 카드가 위에서 아래로 이동
4. 사용자가 답 입력
5. 정답이면 문제 제거
6. 오답이면 오답 기록
7. 문제 카드가 바닥에 닿으면 하트 -1
8. 하트가 0이면 게임 종료
9. 결과 화면 표시

---

## 9. 문제 객체 구조

```ts
type Operator = "+" | "-" | "×" | "÷";

type ProblemTag =
  | "addition"
  | "subtraction"
  | "multiplication"
  | "division"
  | "mixed"
  | "one_digit"
  | "two_digit"
  | "three_digit"
  | "carry"
  | "borrow"
  | "no_remainder"
  | "multiplication_table"
  | "large_number"
  | "order_of_operations";

interface Problem {
  id: string;
  expression: string;
  answer: number;
  operator: Operator;
  x: number;
  y: number;
  fallSpeed: number;
  tags: ProblemTag[];
  levelId: string;
  createdAt: number;
}
```

예시:

```ts
{
  id: "problem_001",
  expression: "4 × 9 =",
  answer: 36,
  operator: "×",
  x: 240,
  y: 0,
  fallSpeed: 42,
  tags: ["multiplication", "multiplication_table"],
  levelId: "MUL_TABLE_ALL",
  createdAt: 123456789
}
```

---

## 10. 게임 상태 구조

```ts
interface GameState {
  status: "ready" | "playing" | "paused" | "gameOver" | "result";
  modeId: string;
  levelId: string;
  score: number;
  lives: number;
  combo: number;
  maxCombo: number;
  currentInput: string;
  activeProblems: Problem[];
  correctCount: number;
  wrongCount: number;
  missedCount: number;
  answeredProblems: ProblemResult[];
  missedProblems: Problem[];
}
```

---

## 11. 문제 결과 기록 구조

```ts
interface ProblemResult {
  problemId: string;
  expression: string;
  correctAnswer: number;
  userAnswer: number | null;
  result: "correct" | "wrong" | "missed";
  tags: ProblemTag[];
  responseTimeMs?: number;
}
```

| 상황 | result |
|---|---|
| 정답 입력 | `correct` |
| 오답 입력 | `wrong` |
| 바닥 도달 | `missed` |

---

## 12. 연산 범위

본 게임은 자연수 연산 흐름을 기준으로 하되, 분수·소수는 제외한다.

### 포함 범위

| 영역 | 포함 여부 | 설명 |
|---|---|---|
| 9까지 수 덧셈·뺄셈 | 포함 | 한 자리 연산 |
| 50까지 수 | 포함 | 10~50 범위 |
| 100까지 수 | 포함 | 두 자리 기초 |
| 두 자리 수 덧셈·뺄셈 | 포함 | 받아올림/받아내림 포함 |
| 곱셈구구 | 포함 | 별도 모드 |
| 자연수 곱셈 | 포함 | 한 자리×한 자리부터 두 자리×두 자리까지 |
| 자연수 나눗셈 | 포함 | 나머지 없는 나눗셈만 |
| 큰 수 | 부분 포함 | 큰 수 읽기보다 연산 문제 중심 |
| 자연수 혼합계산 | 포함 | 일반 혼합계산 모드 |

### 제외 범위

| 영역 | 제외 이유 |
|---|---|
| 분수 연산 | 자연수 사칙연산 범위 밖 |
| 소수 연산 | 소수점 입력 UX 필요 |
| 나머지 있는 나눗셈 | 답 입력 방식이 복잡해짐 |
| 약수와 배수 | 별도 개념 학습 모드 필요 |
| 어림하기 | 산성비식 정답 입력과 맞지 않음 |

---

## 13. 레벨별 문제 생성 스펙

### 13.1 덧셈·뺄셈 모드

| Level ID | 표시명 | 연산 | 생성 규칙 | 조건 | 태그 |
|---|---|---|---|---|---|
| ADD_01 | 한 자리 덧셈 | + | a: 1~9, b: 1~9 | a+b ≤ 10 | addition, one_digit |
| ADD_02 | 20 이하 덧셈 | + | a: 1~19, b: 1~9 | a+b ≤ 20 | addition |
| ADD_03 | 50 이하 덧셈 | + | a: 1~50, b: 1~50 | a+b ≤ 50 | addition |
| ADD_04 | 100 이하 덧셈 | + | a: 1~99, b: 1~99 | a+b ≤ 100 | addition |
| ADD_05 | 두 자리+한 자리 | + | a: 10~99, b: 1~9 | 제한 없음 | addition, two_digit |
| ADD_06 | 두 자리+두 자리 | + | a: 10~99, b: 10~99 | 제한 없음 | addition, two_digit |
| ADD_07 | 받아올림 덧셈 | + | a: 10~99, b: 1~99 | 일의 자리 합 ≥ 10 | addition, carry |
| ADD_08 | 세 자리 덧셈 | + | a: 100~999, b: 100~999 | 제한 없음 | addition, three_digit |
| SUB_01 | 한 자리 뺄셈 | - | a: 1~9, b: 1~9 | a ≥ b | subtraction, one_digit |
| SUB_02 | 20 이하 뺄셈 | - | a: 1~20, b: 1~20 | a ≥ b | subtraction |
| SUB_03 | 50 이하 뺄셈 | - | a: 1~50, b: 1~50 | a ≥ b | subtraction |
| SUB_04 | 100 이하 뺄셈 | - | a: 1~100, b: 1~100 | a ≥ b | subtraction |
| SUB_05 | 두 자리-한 자리 | - | a: 10~99, b: 1~9 | a ≥ b | subtraction, two_digit |
| SUB_06 | 두 자리-두 자리 | - | a: 10~99, b: 10~99 | a ≥ b | subtraction, two_digit |
| SUB_07 | 받아내림 뺄셈 | - | a: 10~99, b: 1~99 | a ≥ b, 일의 자리 a < b | subtraction, borrow |
| SUB_08 | 세 자리 뺄셈 | - | a: 100~999, b: 100~999 | a ≥ b | subtraction, three_digit |

### 13.2 구구단 모드

| Level ID | 표시명 | 연산 | 생성 규칙 | 조건 | 태그 |
|---|---|---|---|---|---|
| TABLE_02 | 2단 | × | 2 × b, b: 1~9 | 없음 | multiplication_table |
| TABLE_03 | 3단 | × | 3 × b, b: 1~9 | 없음 | multiplication_table |
| TABLE_04 | 4단 | × | 4 × b, b: 1~9 | 없음 | multiplication_table |
| TABLE_05 | 5단 | × | 5 × b, b: 1~9 | 없음 | multiplication_table |
| TABLE_06 | 6단 | × | 6 × b, b: 1~9 | 없음 | multiplication_table |
| TABLE_07 | 7단 | × | 7 × b, b: 1~9 | 없음 | multiplication_table |
| TABLE_08 | 8단 | × | 8 × b, b: 1~9 | 없음 | multiplication_table |
| TABLE_09 | 9단 | × | 9 × b, b: 1~9 | 없음 | multiplication_table |
| TABLE_ALL | 구구단 전체 | × | a: 2~9, b: 1~9 | 없음 | multiplication_table |

### 13.3 곱셈·나눗셈 모드

| Level ID | 표시명 | 연산 | 생성 규칙 | 조건 | 태그 |
|---|---|---|---|---|---|
| MUL_01 | 한 자리×한 자리 | × | a: 2~9, b: 1~9 | 없음 | multiplication, multiplication_table |
| MUL_02 | 두 자리×한 자리 | × | a: 10~99, b: 2~9 | 없음 | multiplication, two_digit |
| MUL_03 | 세 자리×한 자리 | × | a: 100~999, b: 2~9 | 없음 | multiplication, three_digit |
| MUL_04 | 몇십×한 자리 | × | a: 10,20,...,90 / b: 2~9 | 없음 | multiplication |
| MUL_05 | 몇십×몇십 | × | a: 10,20,...,90 / b: 10,20,...,90 | 없음 | multiplication |
| MUL_06 | 두 자리×두 자리 | × | a: 10~99, b: 10~99 | 없음 | multiplication, two_digit |
| DIV_01 | 구구단 나눗셈 | ÷ | q: 1~9, d: 2~9, n=q×d | n ÷ d = q | division, no_remainder |
| DIV_02 | 두 자리÷한 자리 | ÷ | q: 2~20, d: 2~9, n=q×d | n ≤ 99 | division, no_remainder |
| DIV_03 | 세 자리÷한 자리 | ÷ | q: 10~99, d: 2~9, n=q×d | n ≤ 999 | division, no_remainder |
| DIV_04 | 두 자리÷두 자리 | ÷ | q: 2~9, d: 10~99, n=q×d | n ≤ 999 | division, no_remainder |
| DIV_05 | 세 자리÷두 자리 | ÷ | q: 2~20, d: 10~99, n=q×d | n ≤ 999 | division, no_remainder |

#### 나눗셈 생성 원칙

나머지 없는 나눗셈은 다음 방식으로 생성한다.

```ts
const quotient = randomInt(qMin, qMax);
const divisor = randomInt(dMin, dMax);
const dividend = quotient * divisor;

expression = `${dividend} ÷ ${divisor} =`;
answer = quotient;
```

이 방식은 항상 나머지가 0인 나눗셈만 생성한다.

### 13.4 섞어서 모드

섞어서 모드는 사용자가 선택한 범위 내의 레벨들을 혼합한다.

| Level ID | 표시명 | 포함 레벨 |
|---|---|---|
| MIX_ADD_SUB_BASIC | 덧셈·뺄셈 기초 | ADD_01~ADD_04, SUB_01~SUB_04 |
| MIX_ADD_SUB_ADV | 덧셈·뺄셈 심화 | ADD_05~ADD_08, SUB_05~SUB_08 |
| MIX_MUL_DIV_BASIC | 곱셈·나눗셈 기초 | MUL_01, DIV_01 |
| MIX_MUL_DIV_ADV | 곱셈·나눗셈 심화 | MUL_02~MUL_06, DIV_02~DIV_05 |
| MIX_ALL_NATURAL | 자연수 사칙연산 전체 | 덧셈, 뺄셈, 곱셈, 나눗셈 전체 |

### 13.5 혼합계산 모드

혼합계산은 자연수 사칙연산 범위에서만 제공한다. 분수, 소수, 나머지 있는 나눗셈은 제외한다.

| Level ID | 표시명 | 생성 규칙 | 조건 | 태그 |
|---|---|---|---|---|
| ORDER_01 | 두 수 사칙연산 | a op b | 결과가 자연수 | mixed |
| ORDER_02 | 세 수 덧셈·뺄셈 | a ± b ± c | 중간 결과와 최종 결과가 0 이상 | mixed |
| ORDER_03 | 곱셈 포함 혼합 | a + b × c | 자연수 결과 | mixed, order_of_operations |
| ORDER_04 | 괄호 포함 혼합 | (a + b) × c | 자연수 결과 | mixed, order_of_operations |
| ORDER_05 | 나눗셈 포함 혼합 | a × b ÷ c | 나누어떨어짐 | mixed, division, no_remainder |

혼합계산은 저학년에게 어렵기 때문에 자유 선택형 목록에서는 별도 그룹으로 분리한다.

---

## 14. 난이도 조절 변수

### 14.1 수학 난이도

| 변수 | 설명 |
|---|---|
| operator | 연산자 |
| digitRange | 한 자리, 두 자리, 세 자리 |
| answerRange | 답의 크기 |
| carry | 받아올림 여부 |
| borrow | 받아내림 여부 |
| remainder | 나머지 여부, 본 게임에서는 false |
| termCount | 항의 개수 |
| parentheses | 괄호 사용 여부 |

### 14.2 게임 난이도

| 변수 | 설명 |
|---|---|
| fallSpeed | 낙하 속도 |
| spawnInterval | 문제 생성 간격 |
| maxActiveProblems | 화면에 동시에 존재 가능한 문제 수 |
| problemCardSize | 문제 카드 크기 |
| inputDigitLimit | 입력 가능한 최대 자릿수 |

MVP 기본값:

| 항목 | 값 |
|---|---:|
| lives | 5 |
| fallSpeed | 레벨별 설정 |
| maxActiveProblems | 3~5개 |
| spawnInterval | 2~4초 |
| inputDigitLimit | 5자리 |

---

## 15. 오답률 / 취약 문제 / 문제 분석

### 15.1 오답률

```ts
wrongRate = wrongCount / (correctCount + wrongCount)
```

놓친 문제까지 포함한 실패율도 별도로 계산할 수 있다.

```ts
failureRate = (wrongCount + missedCount) / (correctCount + wrongCount + missedCount)
```

### 15.2 취약 문제 분석

문제 결과의 tags를 기준으로 취약 유형을 분석한다.

예시 태그:

| 태그 | 의미 |
|---|---|
| addition | 덧셈 |
| subtraction | 뺄셈 |
| multiplication | 곱셈 |
| division | 나눗셈 |
| carry | 받아올림 |
| borrow | 받아내림 |
| multiplication_table | 구구단 |
| no_remainder | 나머지 없는 나눗셈 |
| order_of_operations | 혼합계산 |

취약 유형 산출 기준:

```ts
weaknessScore = wrongCountByTag + missedCountByTag
```

예시 결과:

| 취약 유형 | 설명 |
|---|---|
| 받아올림 덧셈 | carry 태그 문제에서 오답률 높음 |
| 받아내림 뺄셈 | borrow 태그 문제에서 오답률 높음 |
| 구구단 7단 | 7단 문제 오답 다수 |
| 나눗셈 | division 태그 문제 놓침 다수 |
| 혼합계산 | order_of_operations 태그 문제 오답률 높음 |

---

## 16. 사운드 요구사항

사운드는 포함한다.

| 상황 | 사운드 |
|---|---|
| 숫자 버튼 입력 | 짧은 클릭음 |
| 정답 | 밝은 효과음 |
| 여러 문제 동시 제거 | 강화된 팡 효과음 |
| 오답 | 짧은 실패음 |
| 문제 바닥 도달 | 충돌음 |
| 하트 감소 | 낮은 경고음 |
| 게임 종료 | 종료음 |
| 일시정지 | 부드러운 클릭음 |

설정에서 사운드 ON/OFF를 제공한다.

```ts
interface SoundSettings {
  enabled: boolean;
  volume: number;
}
```

---

## 17. PWA 요구사항

| 항목 | 요구사항 |
|---|---|
| manifest | 필요 |
| service worker | 필요 |
| app name | 추후 확정 |
| display | standalone |
| orientation | landscape |
| start_url | `/` |
| theme_color | 디자인 기준 |
| background_color | 디자인 기준 |
| icons | 192x192, 512x512 필요 |

세로 모드는 지원하지 않으므로 manifest에서 landscape orientation을 설정한다.

```json
{
  "display": "standalone",
  "orientation": "landscape"
}
```

---

## 18. localStorage 저장 항목

| 키 | 내용 |
|---|---|
| bestScore | 최고 점수 |
| bestCombo | 최고 콤보 |
| recentResults | 최근 플레이 결과 |
| soundSettings | 사운드 설정 |
| selectedMode | 마지막 선택 모드 |
| selectedLevel | 마지막 선택 레벨 |

성적표 기능은 별도 앱 기능을 가져올 예정이므로, 이번 단계에서는 최소 기록만 저장한다.

---

## 19. 구현 우선순위

### Phase 1. 기본 구조

- React + TypeScript 프로젝트 생성
- PWA 설정
- 가로 모드 전용 레이아웃
- 세로 화면 안내
- 왼쪽 게임 영역 / 오른쪽 키패드 영역 구현

### Phase 2. 게임 루프

- 문제 객체 생성
- 문제 낙하 애니메이션
- activeProblems 관리
- 바닥 도달 판정
- 하트 감소
- 게임 종료

### Phase 3. 입력 시스템

- 숫자 키패드
- currentInput 표시
- 지우기
- 입력 버튼
- 정답 매칭
- 같은 답 문제 전부 제거
- 점수 및 콤보 계산

### Phase 4. 레벨/문제 생성

- 덧셈·뺄셈 레벨 구현
- 구구단 레벨 구현
- 곱셈·나눗셈 레벨 구현
- 섞어서 모드 구현
- 혼합계산 모드 구현

### Phase 5. 결과 분석

- 정답 수, 오답 수, 놓친 수 기록
- 오답률 계산
- 취약 태그 분석
- 문제 분석 화면 구현

### Phase 6. 사운드 및 마감

- 버튼 사운드
- 정답/오답 사운드
- 동시 제거 사운드
- 게임 종료 사운드
- 사운드 ON/OFF
- 반응형 보정
- Vercel 배포 테스트

---

## 20. AI 코딩툴 작업 지시용 요약

```text
Build a React + TypeScript PWA arithmetic rain game for elementary students.

The app must support landscape mode only on mobile and tablet. It will be deployed on Vercel and used as a PWA through Chrome's "Add to Home Screen".

The screen is split into two areas:
- Left: game area where arithmetic problem cards fall from top to bottom.
- Right: custom numeric keypad and current input display.

The user sees a falling problem such as "4 × 9 =" and enters "36" using the keypad. When the submit button is pressed, compare the current input against all active falling problems. If multiple problems have the same answer, remove all matching problems and award points for each.

Game rules:
- No time limit.
- Lives are represented by hearts.
- Wrong input does not reduce lives.
- When a problem reaches the bottom, reduce hearts by 1.
- Game ends when hearts reach 0.
- Correct answer gives +10 points per removed problem.
- Every 5 consecutive correct answers gives +20 bonus points.
- No remainder division.
- Include mixed arithmetic mode.
- Do not implement portrait mode. Show a rotate-device message in portrait.
- Include sound effects and sound on/off settings.

The app should support free selection of modes and levels, not stage unlocking.

Modes:
1. Addition/Subtraction
2. Multiplication/Division
3. Multiplication Table
4. Mixed
5. Order of Operations / Mixed Calculation

Use rule-based problem generation. Division problems must be generated by choosing quotient and divisor first, then computing dividend = quotient × divisor, so all division problems have no remainder.

Track results:
- score
- correct count
- wrong count
- missed count
- max combo
- wrong rate
- weak problem tags
- problem analysis by type

Use React state or Zustand, Tailwind CSS, requestAnimationFrame for falling animation, and localStorage for simple saved records.
```

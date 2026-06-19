# 초등 순수 사칙연산 산성비 게임 리팩터링 명세서 v0.2

> 목적: 현재 React + TypeScript + Vite 기반으로 이미 구현된 산성비 연산 게임을 전면 재작성하지 않고, **기존 게임 엔진은 유지**하면서 원장님 제안의 **G → Chapter → Unit 커리큘럼 구조**로 리팩터링한다.

---

## 0. 매우 중요한 작업 원칙

### 0.1 전체 앱을 새로 만들지 말 것

현재 앱에는 이미 다음 기능이 구현되어 있으므로 유지한다.

- React + TypeScript + Vite 구조
- PWA 설정
- 가로 모드 전용 처리
- 세로 화면 안내
- 시작 화면
- 게임 화면
- 왼쪽 게임 영역 / 오른쪽 키패드 구조
- 숫자 키패드
- 문제 낙하 애니메이션
- 정답 입력 처리
- 같은 답 문제 전부 제거
- 점수 / 콤보
- 하트
- 타이머
- 사운드
- 결과 화면 기본 구조
- localStorage 기반 기록

이번 작업은 **기존 게임 시스템을 유지한 채, 레벨 선택 구조와 문제 생성 구조를 바꾸는 리팩터링**이다.

---

## 1. v0.2에서 바꿀 핵심 방향

### 1.1 기존 구조

현재 앱은 다음 구조에 가깝다.

```text
ModeSelectScreen
└─ LevelSelectScreen
   └─ ADD_01 / SUB_01 / MUL_01 / TABLE_02 ...
```

기존 모드:

- 덧셈·뺄셈
- 곱셈·나눗셈
- 구구단
- 섞어서
- 혼합계산

### 1.2 변경 구조

v0.2에서는 원장님 제안에 따라 다음 구조로 바꾼다.

```text
CurriculumSelectScreen
├─ G1
│  ├─ Chapter 1
│  │  ├─ Unit 1
│  │  ├─ Unit 2
│  │  └─ ...
│  └─ ...
├─ G2
│  └─ ...
└─ G3
   └─ ...
```

즉, 기존의 “모드 → 레벨” 구조를 **“G → Chapter → Unit” 커리큘럼 구조**로 바꾼다.

---

## 2. 유지할 게임 규칙

### 2.1 타이머

타이머는 유지한다.

현재 기본값은 300초, 즉 5분이다.  
v0.2에서는 기본값을 **180초, 즉 3분**으로 변경한다.

단, 하드코딩하지 말고 상수로 분리한다.

```ts
export const DEFAULT_GAME_DURATION_SECONDS = 180;
```

추후 설정에서 1분 / 3분 / 5분 선택 기능을 넣을 수 있도록 구조를 열어둔다.

### 2.2 점수

기존 규칙 유지.

| 행동 | 점수 |
|---|---:|
| 정답 문제 1개 제거 | +10 |
| 연속 정답 5개마다 | +20 |
| 오답 입력 | 0 |
| 문제 놓침 | 0 |

### 2.3 생명

기존 규칙 유지.

| 상황 | 처리 |
|---|---|
| 오답 입력 | 하트 감소 없음 |
| 문제 바닥 도달 | 하트 -1 |
| 하트 0개 | 게임 종료 |

### 2.4 같은 답 문제 처리

기존 규칙 유지.

입력한 숫자와 정답이 같은 active problem이 여러 개 있으면, 해당 문제를 **전부 제거**한다.

예:

```text
4×9
40-4
6×6
```

세 문제의 답이 모두 36일 때, 사용자가 `36`을 입력하면 세 문제가 모두 제거된다.

---

## 3. 구구단과 확장 범위 정책

### 3.1 구구단 전용 모드는 제거 또는 숨김

현재 앱의 `table` 모드는 v0.2에서 메인 앱에서 제거하거나 숨긴다.

제거/숨김 대상:

- 구구단 모드
- TABLE_02
- TABLE_03
- TABLE_04
- TABLE_05
- TABLE_06
- TABLE_07
- TABLE_08
- TABLE_09
- TABLE_ALL

구구단 전용 암기 앱은 별도 스핀오프 앱으로 분리하는 방향이다.

### 3.2 곱셈·나눗셈 자체는 유지

구구단 전용 모드는 제거하지만, 사칙연산 앱 안에서 곱셈·나눗셈 응용은 유지한다.

유지 대상 예시:

- 두 자리 × 한 자리
- 세 자리 × 한 자리
- 몇십 × 한 자리
- 몇십 배
- 두 자리 ÷ 한 자리
- 세 자리 ÷ 한 자리
- 곱셈/나눗셈 포함 3단 혼합계산

### 3.3 기본 앱에서 제외하고 확장으로 뺄 범위

다음은 기본 커리큘럼에서 제외하고 향후 확장으로 분리한다.

- 두 자리 × 두 자리 일반 랜덤
- 99×99 수준의 큰 곱셈
- 두 자리 수로 나누는 나눗셈
- 세 자리 ÷ 두 자리
- 나머지 있는 나눗셈
- 분수
- 소수

---

## 4. 수식 표시 규칙

### 4.1 일반 문제

일반 문제는 `=` 없이 표시한다.

예:

```text
1+1
37+8
42-5
24×2
39÷3
```

### 4.2 빈칸 문제

빈칸 문제는 반드시 `=`을 포함한다.

예:

```text
9+□=10
4+□=10
27÷□=9
40÷□=8
```

### 4.3 ProblemCard 수정 지시

현재 `ProblemCard.tsx`는 다음처럼 모든 수식에서 `=`을 제거한다.

```tsx
problem.expression.replace('=', '').trim()
```

v0.2에서는 이 처리를 제거한다.

수정 후:

```tsx
{problem.expression}
```

표시용 expression은 문제 생성기에서 완성해서 넘긴다.

즉:

- 일반 문제 generator는 애초에 `=` 없는 expression을 만든다.
- 빈칸 문제 generator는 `=` 포함 expression을 만든다.
- ProblemCard는 expression을 그대로 보여준다.

---

## 5. 선택 화면 UI

### 5.1 추천 UI

v0.2의 선택 화면은 `G 선택 → Chapter 선택 → Unit 선택`을 3개의 별도 화면으로 나누지 않는다.

권장 구조:

```text
상단: [G1] [G2] [G3] 탭

본문:
▼ Chapter 1. 9 이하 한 자리 수 덧셈
  [Unit 1 +1 릴레이]
  [Unit 2 합이 5 미만]
  [Unit 3 합이 9 미만]
  [Unit 4 0의 더하기]

▶ Chapter 2. 9 이하 한 자리 수 뺄셈
▶ Chapter 3. 10의 보수와 기초 혼합 연산
```

즉, **상단 G 탭 + Chapter 아코디언 + Unit 카드** 구조를 사용한다.

### 5.2 태블릿 / 모바일 대응

| 기기 | 선택 화면 UI |
|---|---|
| 태블릿 가로 | G 탭 + Chapter 아코디언. 여유가 있으면 좌측 Chapter, 우측 Unit 분할 가능 |
| 모바일 가로 | G 탭 + Chapter 아코디언 + Unit 2열 카드 |
| 세로 | 기존처럼 가로 전환 안내 |

### 5.3 새 화면 컴포넌트

새 컴포넌트를 만든다.

```text
src/components/screens/CurriculumSelectScreen.tsx
```

기존 파일 처리:

| 기존 파일 | 처리 |
|---|---|
| ModeSelectScreen.tsx | 사용 중지 또는 제거 |
| LevelSelectScreen.tsx | 사용 중지 또는 CurriculumSelectScreen으로 대체 |
| modes.ts | 사용 중지 또는 제거 |
| levels.ts | curriculum 데이터로 교체 또는 신규 파일로 분리 |

---

## 6. 데이터 구조 변경

### 6.1 새 파일 제안

다음 파일을 새로 만든다.

```text
src/data/curriculum.ts
src/game/curriculumProblemGenerator.ts
```

기존 `levels.ts`와 `problemGenerator.ts`를 바로 덮어써도 되지만, 안전하게 작업하려면 새 파일을 만들고 연결하는 편이 좋다.

### 6.2 타입 확장

`src/game/types.ts`에 다음 개념을 추가한다.

```ts
export type ProblemKind = 'normal' | 'blank';

export type GradeId = 'G1' | 'G2' | 'G3';

export interface CurriculumUnit {
  id: string;
  gradeId: GradeId;
  chapterId: string;
  unitId: string;
  chapterTitle: string;
  unitTitle: string;
  description?: string;
  examples: string[];
  fallSpeed: number;
  spawnInterval: number;
  maxActiveProblems: number;
  problemKind: ProblemKind;
  generatorKey: string;
  tags: string[];
}

export interface CurriculumChapter {
  id: string;
  gradeId: GradeId;
  title: string;
  units: CurriculumUnit[];
}

export interface CurriculumGrade {
  id: GradeId;
  title: string;
  chapters: CurriculumChapter[];
}
```

기존 `ProblemTag`는 현재 union type으로 좁게 정의되어 있으므로, 커리큘럼 태그를 넣기 어렵다.  
v0.2에서는 다음 중 하나로 처리한다.

권장안:

```ts
export type ProblemTag = string;
```

이렇게 하면 기존 태그와 커리큘럼 태그를 모두 처리할 수 있다.

예:

```ts
tags: [
  'grade:G1',
  'chapter:G1_C01',
  'unit:G1_C01_U01',
  'addition',
  'plus_one'
]
```

### 6.3 Problem 타입 확장

기존 Problem에 커리큘럼 정보를 추가한다.

```ts
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

  problemKind?: ProblemKind;
  gradeId?: GradeId;
  chapterId?: string;
  unitId?: string;
}
```

기존 코드와 호환을 위해 `levelId`는 유지한다.  
단, v0.2에서는 `levelId`에 unit id를 넣어도 된다.

예:

```ts
levelId: 'G1_C01_U01'
```

---

## 7. Store 변경

현재 store는 다음 값을 중심으로 작동한다.

```ts
modeId
levelId
```

v0.2에서는 기존 구조를 최대한 유지하면서 다음 값을 추가한다.

```ts
gradeId: GradeId;
chapterId: string;
unitId: string;
```

단, 리팩터링을 최소화하려면 다음 방식도 가능하다.

```ts
levelId = unitId
```

즉, 내부적으로는 기존 `levelId`를 계속 사용하되 값만 `G1_C01_U01` 같은 커리큘럼 unit id로 바꾼다.

권장 최소 변경안:

- `modeId`는 제거하지 않아도 된다.
- `levelId`를 unit id로 사용한다.
- `selectLevel(levelId)`는 그대로 둔다.
- `getLevelById()` 대신 `getUnitById()`를 만든다.
- `generateProblem(levelId)` 대신 `generateCurriculumProblem(unitId)`를 연결한다.

---

## 8. 타이머 변경

현재 `gameStore.ts`에는 `timeLeft: 300`이 있다.  
이를 상수화한다.

```ts
export const DEFAULT_GAME_DURATION_SECONDS = 180;
```

적용 위치:

- 초기 state의 `timeLeft`
- `startGame()` 안의 `timeLeft`
- 필요하다면 reset 관련 로직

`useGameLoop.ts`의 타이머 감소 로직은 유지한다.

---

## 9. 커리큘럼 전체 구조

아래 커리큘럼은 원장님 제안 기반으로 구성한다.  
G1/G2/G3는 실제 학교 학년이라기보다 **앱 내부 단계 그룹**으로 사용한다.

---

# G1: 한 자리 수 중심 및 기초 두 자리 수

## G1 Chapter 1. 9 이하의 한 자리 수 덧셈

| Unit ID | Unit | 제목 | 생성 규칙 | 문제 예시 | 비고 |
|---|---:|---|---|---|---|
| G1_C01_U01 | 1 | +1 릴레이 | a: 1~8, b=1 | `1+1`, `5+1`, `8+1` | normal |
| G1_C01_U02 | 2 | 합이 5 미만 | a,b: 1~4, a+b<5 | `1+2`, `2+2`, `3+1` | normal |
| G1_C01_U03 | 3 | 합이 9 미만 | a,b: 1~8, a+b<9 | `4+2`, `5+3`, `6+2` | normal |
| G1_C01_U04 | 4 | 0의 더하기 | a 또는 b가 0, 나머지는 0~9 | `7+0`, `0+4`, `0+0` | normal |

## G1 Chapter 2. 9 이하의 한 자리 수 뺄셈

| Unit ID | Unit | 제목 | 생성 규칙 | 문제 예시 | 비고 |
|---|---:|---|---|---|---|
| G1_C02_U01 | 1 | -1 릴레이 | a: 2~9, b=1 | `2-1`, `5-1`, `9-1` | normal |
| G1_C02_U02 | 2 | 결과가 5 미만 | a: 1~9, b: 0~a, a-b<5 | `4-2`, `5-3`, `3-2` | normal |
| G1_C02_U03 | 3 | 9 이하의 뺄셈 | a: 1~9, b: 0~a | `8-3`, `9-5`, `7-4` | normal |
| G1_C02_U04 | 4 | 0과 자기 자신 빼기 | `a-0` 또는 `a-a` | `6-0`, `4-4` | normal |

## G1 Chapter 3. 10의 보수와 기초 혼합 연산

| Unit ID | Unit | 제목 | 생성 규칙 | 문제 예시 | 비고 |
|---|---:|---|---|---|---|
| G1_C03_U01 | 1 | 10 만들기 빈칸 | a: 0~10, answer=10-a | `9+□=10`, `4+□=10` | blank |
| G1_C03_U02 | 2 | 10에서 바로 빼기 | a=10, b: 0~10 | `10-3`, `10-6` | normal |
| G1_C03_U03 | 3 | 특수 3수 연산 | a+b=10이 되도록 만든 뒤 +c | `8+2+4`, `3+7+5` | normal |
| G1_C03_U04 | 4 | 기초 덧뺄셈 혼합 | a+b-c, 중간/최종 결과 0 이상 | `5+4-2`, `9-3+2` | normal |

## G1 Chapter 4. 받아올림 없는 두 자리 수 덧셈

| Unit ID | Unit | 제목 | 생성 규칙 | 문제 예시 | 비고 |
|---|---:|---|---|---|---|
| G1_C04_U01 | 1 | 몇십과 한 자리 | a: 10,20,30,40, b: 0~9 | `10+4`, `30+7` | normal |
| G1_C04_U02 | 2 | 몇십몇과 한 자리 | a: 10~99, b: 1~9, ones(a)+b<10 | `23+5`, `42+6` | normal |
| G1_C04_U03 | 3 | 몇십끼리의 결합 | a,b: 10,20,...,90, a+b<=100 | `20+30`, `40+40` | normal |
| G1_C04_U04 | 4 | 기본 두 자리 덧셈 | a,b: 10~99, ones(a)+ones(b)<10 | `12+23`, `41+35` | normal |

## G1 Chapter 5. 받아내림 없는 두 자리 수 뺄셈

| Unit ID | Unit | 제목 | 생성 규칙 | 문제 예시 | 비고 |
|---|---:|---|---|---|---|
| G1_C05_U01 | 1 | 몇십몇에서 한 자리 | a: 10~99, b: 1~9, ones(a)>=b | `18-5`, `37-4` | normal |
| G1_C05_U02 | 2 | 몇십끼리의 뺄셈 | a,b: 10,20,...,90, a>=b | `50-20`, `90-40` | normal |
| G1_C05_U03 | 3 | 기본 두 자리 뺄셈 | a,b: 10~99, a>=b, ones(a)>=ones(b) | `35-12`, `67-24` | normal |
| G1_C05_U04 | 4 | G1 중간점검 혼합 | 올림/내림 없는 a+b-c | `20+15-11` | normal |

## G1 Chapter 6. 받아올림이 있는 한 자리 수 덧셈

| Unit ID | Unit | 제목 | 생성 규칙 | 문제 예시 | 비고 |
|---|---:|---|---|---|---|
| G1_C06_U01 | 1 | 기초 받아올림 | a,b: 1~9, 11<=a+b<=12 | `9+2`, `8+4` | normal |
| G1_C06_U02 | 2 | 심화 받아올림 | a,b: 1~9, 13<=a+b<=18 | `7+6`, `8+9` | normal |
| G1_C06_U03 | 3 | 쌍둥이 수 받아올림 | a=b, a: 5~9 | `6+6`, `8+8` | normal |
| G1_C06_U04 | 4 | 십몇 확장 받아올림 | a: 10~29, b: 1~9, ones(a)+b>=10 | `15+6`, `28+4` | normal |

## G1 Chapter 7. 받아내림이 있는 십몇의 뺄셈

| Unit ID | Unit | 제목 | 생성 규칙 | 문제 예시 | 비고 |
|---|---:|---|---|---|---|
| G1_C07_U01 | 1 | 기초 받아내림 | a: 11~12, b: 2~9, ones(a)<b | `11-3`, `12-5` | normal |
| G1_C07_U02 | 2 | 심화 받아내림 | a: 13~18, b: 2~9, ones(a)<b | `14-7`, `16-8` | normal |
| G1_C07_U03 | 3 | 10 거쳐 빼기 | a: 11~19, 식은 `a-ones(a)-c` | `13-3-4`, `15-5-2` | normal |
| G1_C07_U04 | 4 | G1 받아올림/내림 총망라 | G1_C06~G1_C07 랜덤 혼합 | 한 자리 올림/내림 랜덤 | normal |

## G1 Chapter 8. 두 자리 수 덧뺄셈 기본

| Unit ID | Unit | 제목 | 생성 규칙 | 문제 예시 | 비고 |
|---|---:|---|---|---|---|
| G1_C08_U01 | 1 | 가로셈 올림 | a,b: 10~99, ones(a)+ones(b)>=10 | `18+14`, `25+26` | normal |
| G1_C08_U02 | 2 | 가로셈 내림 | a,b: 10~99, a>b, ones(a)<ones(b) | `32-15`, `43-26` | normal |
| G1_C08_U03 | 3 | 몇십몇 덧셈 올림 | a: 10~99, b:1~9, ones(a)+b>=10 | `37+8`, `56+9` | normal |
| G1_C08_U04 | 4 | 몇십몇 뺄셈 내림 | a: 10~99, b:1~9, ones(a)<b | `42-5`, `71-4` | normal |

---

# G2: 큰 수 받아올림/내림 완성 및 세 자리 수 진입

## G2 Chapter 1. 두 자리 수 덧셈 끝판왕

| Unit ID | Unit | 제목 | 생성 규칙 | 문제 예시 |
|---|---:|---|---|---|
| G2_C01_U01 | 1 | 일의 자리 올림 | 두 자리+두 자리, ones carry | `46+39`, `27+58` |
| G2_C01_U02 | 2 | 십의 자리 올림 / 100 초과 | 두 자리+두 자리, 결과 >=100 | `73+52`, `84+43` |
| G2_C01_U03 | 3 | 일·십 둘 다 올림 | 두 자리+두 자리, ones carry and result>=100 | `68+47`, `79+56` |
| G2_C01_U04 | 4 | 묶어 푸는 고속 덧셈 | 세 수 덧셈, 10 또는 100 보수 조합 우선 | `15+25+35` |

## G2 Chapter 2. 두 자리 수 뺄셈 끝판왕

| Unit ID | Unit | 제목 | 생성 규칙 | 문제 예시 |
|---|---:|---|---|---|
| G2_C02_U01 | 1 | 십의 자리 받아내림 | 두 자리-두 자리, ones borrow | `62-25`, `81-47` |
| G2_C02_U02 | 2 | 백의 자리 빌려오기 | 세 자리-두 자리, hundreds borrow | `135-42`, `156-63` |
| G2_C02_U03 | 3 | 백·십 둘 다 내림 | 세 자리-두 자리, 연속 borrow | `121-45`, `113-56` |
| G2_C02_U04 | 4 | 받아올림/내림 혼합 제어 | a+b-c, carry and borrow 포함 | `45+25-36` |

## G2 Chapter 3. 세 자리 수 기초 연산

| Unit ID | Unit | 제목 | 생성 규칙 | 문제 예시 |
|---|---:|---|---|---|
| G2_C03_U01 | 1 | 세 자리+세 자리 올림 없음 | a,b: 100~999, 자리별 합 < 10 | `123+234`, `412+352` |
| G2_C03_U02 | 2 | 세 자리-세 자리 내림 없음 | a,b: 100~999, a>b, 자리별 a>=b | `654-231`, `879-453` |
| G2_C03_U03 | 3 | 끝자리가 0인 덧셈 | a,b: 100~900, tens/ones 0 포함 | `230+140`, `520+260` |
| G2_C03_U04 | 4 | 끝자리가 0인 뺄셈 | a,b: 100~900, a>b, tens/ones 0 포함 | `470-130`, `890-450` |

## G2 Chapter 4. 세 자리 수 덧셈 정밀 훈련

| Unit ID | Unit | 제목 | 생성 규칙 | 문제 예시 |
|---|---:|---|---|---|
| G2_C04_U01 | 1 | 일의 자리 올림 | 세 자리+세 자리, ones carry only | `125+236`, `347+125` |
| G2_C04_U02 | 2 | 십의 자리 올림 | 세 자리+세 자리, tens carry only | `261+153`, `482+331` |
| G2_C04_U03 | 3 | 백의 자리 올림 | 세 자리+세 자리, result>=1000 | `623+431`, `814+231` |
| G2_C04_U04 | 4 | 올림 위치 스위칭 | G2_C04_U01~U03 랜덤 혼합 | 무작위 세 자리 덧셈 |

## G2 Chapter 5. 세 자리 수 덧셈 끝판왕

| Unit ID | Unit | 제목 | 생성 규칙 | 문제 예시 |
|---|---:|---|---|---|
| G2_C05_U01 | 1 | 일·십 올림 | 세 자리+세 자리, ones/tens carry | `258+167`, `379+254` |
| G2_C05_U02 | 2 | 십·백 올림 | 세 자리+세 자리, tens carry and result>=1000 | `672+481`, `753+372` |
| G2_C05_U03 | 3 | 받아올림 3번 연속 | 세 자리+세 자리, ones/tens/hundreds carry | `568+674`, `789+456` |
| G2_C05_U04 | 4 | 세 자리 덧셈 마스터 | G2_C04~G2_C05 랜덤 혼합 | 세 자리 덧셈 올림 랜덤 |

## G2 Chapter 6. 세 자리 수 뺄셈 정밀 훈련

| Unit ID | Unit | 제목 | 생성 규칙 | 문제 예시 |
|---|---:|---|---|---|
| G2_C06_U01 | 1 | 십의 자리 내림 | 세 자리-세 자리, ones borrow | `451-124`, `673-238` |
| G2_C06_U02 | 2 | 백의 자리 내림 | 세 자리-세 자리, tens borrow | `325-152`, `747-281` |
| G2_C06_U03 | 3 | 몇십 단위 쏙 빼기 | a: 100~999, b: 10,20,...,90 | `254-60`, `537-80` |
| G2_C06_U04 | 4 | 내림 위치 스위칭 | G2_C06_U01~U03 랜덤 혼합 | 무작위 세 자리 뺄셈 |

## G2 Chapter 7. 세 자리 수 뺄셈 끝판왕

| Unit ID | Unit | 제목 | 생성 규칙 | 문제 예시 |
|---|---:|---|---|---|
| G2_C07_U01 | 1 | 연속 내림 | 세 자리-세 자리, borrow 2회 이상 | `512-165`, `713-248` |
| G2_C07_U02 | 2 | 가운데 0 내림 | a의 십의 자리가 0, borrow 발생 | `402-131`, `605-243` |
| G2_C07_U03 | 3 | 백 단위 정수에서 빼기 | a: 300,400,...,900, b:100~999, a>b | `300-124`, `700-453` |
| G2_C07_U04 | 4 | 세 자리 뺄셈 마스터 | G2_C06~G2_C07 랜덤 혼합 | 세 자리 뺄셈 내림 랜덤 |

## G2 Chapter 8. G2 과정 최종 가로셈 스피드 레이스

| Unit ID | Unit | 제목 | 생성 규칙 | 문제 예시 |
|---|---:|---|---|---|
| G2_C08_U01 | 1 | 두 자리 덧뺄셈 연속 가로셈 | G1_C08 + G2_C01~C02 랜덤 | 두 자리 덧뺄셈 |
| G2_C08_U02 | 2 | 세 자리 받아올림 덧셈 난사 | G2_C04~G2_C05 랜덤 | 세 자리 덧셈 |
| G2_C08_U03 | 3 | 세 자리 00 구조 받아내림 난사 | G2_C07_U02~U03 중심 | 0 포함 뺄셈 |
| G2_C08_U04 | 4 | G1~G2 덧뺄셈 총정리 | G1~G2 덧뺄셈 랜덤 | 총정리 |

---

# G3: 본격 곱셈·나눗셈 가로셈 암산

## G3 Chapter 1. 나눗셈구구 기초

| Unit ID | Unit | 제목 | 생성 규칙 | 문제 예시 | 비고 |
|---|---:|---|---|---|---|
| G3_C01_U01 | 1 | 작은 수 몫 | q:1~6, d:2~5, n=q*d | `12÷2`, `15÷3`, `25÷5` | normal |
| G3_C01_U02 | 2 | 큰 수 몫 | q:6~9, d:4~9, n=q*d | `36÷4`, `48÷6`, `72÷8` | normal |
| G3_C01_U03 | 3 | 나눗셈 빈칸 | q,d:2~9, n=q*d, expression=`n÷□=q` | `27÷□=9`, `40÷□=8` | blank |
| G3_C01_U04 | 4 | 구구단 안의 나눗셈 난사 | q:1~9, d:2~9, n=q*d | `56÷7`, `81÷9` | normal |

## G3 Chapter 2. 곱셈 가로셈 기초

| Unit ID | Unit | 제목 | 생성 규칙 | 문제 예시 |
|---|---:|---|---|---|
| G3_C02_U01 | 1 | 끝자리가 0인 곱셈 | a: 10,20,...,90, b:2~9 | `30×3`, `50×4` |
| G3_C02_U02 | 2 | 올림 없는 두 자리×한 자리 | a:10~99, b:2~9, 자리별 곱 carry 없음 | `24×2`, `33×3` |
| G3_C02_U03 | 3 | 올림 1회 | 두 자리×한 자리, carry 1회 | `13×4`, `25×3`, `16×5` |
| G3_C02_U04 | 4 | 올림 2회 | 두 자리×한 자리, carry 2회 | `43×4`, `65×3` |

## G3 Chapter 3. 곱셈 가로셈 심화

| Unit ID | Unit | 제목 | 생성 규칙 | 문제 예시 |
|---|---:|---|---|---|
| G3_C03_U01 | 1 | 세 자리×한 자리 올림 없음 | a:100~999, b:2~9, carry 없음 | `214×2`, `312×3` |
| G3_C03_U02 | 2 | 세 자리×한 자리 올림 1~2회 | a:100~999, b:2~9, carry 1~2회 | `123×4`, `215×5` |
| G3_C03_U03 | 3 | 몇십의 곱 | a:10~99, b:10,20,30 | `12×30`, `23×20` |
| G3_C03_U04 | 4 | 암산 특수식 | 고정 후보 중 랜덤 | `11×11`, `12×12`, `15×15` |

## G3 Chapter 4. 나눗셈 가로셈 기초

| Unit ID | Unit | 제목 | 생성 규칙 | 문제 예시 |
|---|---:|---|---|---|
| G3_C04_U01 | 1 | 자릿수가 각각 나누어떨어짐 | 두 자리÷한 자리, 각 자리 분해 가능 | `39÷3`, `48÷4` |
| G3_C04_U02 | 2 | 십의 자리 내림 나눗셈 | 두 자리÷한 자리, 십의 자리 나눗셈에서 나머지 발생 후 결합 | `42÷3`, `72÷4` |
| G3_C04_U03 | 3 | 십의 자리 내림 심화 | 두 자리÷한 자리, 몫 두 자리, 심화 | `65÷5`, `91÷7` |
| G3_C04_U04 | 4 | 두 자리÷한 자리 레이스 | G3_C04_U01~U03 랜덤 혼합 | 두 자리 나눗셈 |

## G3 Chapter 5. 나눗셈 가로셈 심화

| Unit ID | Unit | 제목 | 생성 규칙 | 문제 예시 |
|---|---:|---|---|---|
| G3_C05_U01 | 1 | 백 단위 나눗셈 | a: 100,200,...,900, d:2~9, 나누어떨어짐 | `400÷2`, `900÷3` |
| G3_C05_U02 | 2 | 몇백몇십 나눗셈 | a: 100~990, ones=0, d:2~9, 나누어떨어짐 | `480÷2`, `690÷3` |
| G3_C05_U03 | 3 | 구구단 범위 안의 몇백몇십 나눗셈 | a: 100~990, answer 10~99, d:2~9 | `160÷2`, `360÷4` |
| G3_C05_U04 | 4 | 90 도달형 나눗셈 | answer=90 또는 근처, d:2~9 | `270÷3`, `450÷5` |

## G3 Chapter 6. 나눗셈 가로셈 끝판왕

| Unit ID | Unit | 제목 | 생성 규칙 | 문제 예시 |
|---|---:|---|---|---|
| G3_C06_U01 | 1 | 올림 없는 순차 자릿수 분해 | 세 자리÷한 자리, 각 자리 분해 가능 | `246÷2`, `369÷3` |
| G3_C06_U02 | 2 | 앞의 두 자리 묶기 | 세 자리÷한 자리, 앞 두 자리 결합 필요 | `147÷7`, `186÷6` |
| G3_C06_U03 | 3 | 세 자리÷한 자리 심화 1 | n=q*d, q:20~99, d:4~5 중심 | `248÷4`, `455÷5` |
| G3_C06_U04 | 4 | 세 자리÷한 자리 심화 2 | n=q*d, q:40~99, d:6~9 중심 | `328÷8`, `549÷9` |

## G3 Chapter 7. 사칙연산 가로셈 혼합

| Unit ID | Unit | 제목 | 생성 규칙 | 문제 예시 |
|---|---:|---|---|---|
| G3_C07_U01 | 1 | 곱셈 후 덧셈 | a×b+c, 곱셈 먼저 | `3×4+5`, `6×2+8` |
| G3_C07_U02 | 2 | 나눗셈 후 덧셈 | a÷b+c, 나눗셈 먼저, 나누어떨어짐 | `16÷4+7`, `25÷5+9` |
| G3_C07_U03 | 3 | 곱셈 먼저 하기 | a-b×c, 결과 0 이상 | `20-3×5`, `35-4×6` |
| G3_C07_U04 | 4 | 나눗셈 먼저 하기 | a-b÷c, b÷c 나누어떨어짐, 결과 0 이상 | `30-18÷2`, `50-24÷3` |

## G3 Chapter 8. G1~G3 그랜드 마스터

| Unit ID | Unit | 제목 | 생성 규칙 | 문제 예시 |
|---|---:|---|---|---|
| G3_C08_U01 | 1 | 세 자리÷한 자리 초고속 어택 | G3_C06 랜덤 | 세 자리 나눗셈 |
| G3_C08_U02 | 2 | 두 자리×한 자리 받아올림 어택 | G3_C02_U03~U04 랜덤 | 두 자리 곱셈 |
| G3_C08_U03 | 3 | 3단 혼합 우선순위 어택 | G3_C07 랜덤 | 혼합계산 |
| G3_C08_U04 | 4 | G1~G3 무작위 수식 레이스 | G1~G3 전체 랜덤, 확장 제외 | 총정리 |

---

## 10. 문제 생성기 구현 지침

### 10.1 기본 함수 구조

`src/game/curriculumProblemGenerator.ts`에 다음과 같은 구조를 만든다.

```ts
import type { Operator, ProblemTag, ProblemKind } from './types';

interface GeneratedProblem {
  expression: string;
  answer: number;
  operator: Operator;
  tags: ProblemTag[];
  problemKind: ProblemKind;
  gradeId: 'G1' | 'G2' | 'G3';
  chapterId: string;
  unitId: string;
}

export function generateCurriculumProblem(unitId: string): GeneratedProblem {
  const generator = curriculumGeneratorMap[unitId];
  if (!generator) {
    return generateFallbackProblem(unitId);
  }
  return generator();
}
```

### 10.2 expression 생성 규칙

일반 문제:

```ts
expression = `${a}+${b}`;
```

빈칸 문제:

```ts
expression = `${a}+□=10`;
```

띄어쓰기는 넣지 않는 것을 권장한다.  
문제 카드가 좁은 모바일 화면에서도 잘 들어가야 하기 때문이다.

### 10.3 나눗셈 생성 규칙

나머지 없는 나눗셈은 항상 다음 방식으로 만든다.

```ts
const quotient = randomInt(qMin, qMax);
const divisor = randomInt(dMin, dMax);
const dividend = quotient * divisor;

expression = `${dividend}÷${divisor}`;
answer = quotient;
```

빈칸 나눗셈은 다음처럼 만든다.

```ts
const quotient = randomInt(2, 9);
const divisor = randomInt(2, 9);
const dividend = quotient * divisor;

expression = `${dividend}÷□=${quotient}`;
answer = divisor;
```

---

## 11. CurriculumSelectScreen UI 상세

### 11.1 상태

```ts
const [selectedGradeId, setSelectedGradeId] = useState<'G1' | 'G2' | 'G3'>('G1');
const [openChapterId, setOpenChapterId] = useState<string | null>('G1_C01');
```

### 11.2 레이아웃

```text
상단:
뒤로가기 / 제목 / 설정

Grade Tabs:
[G1] [G2] [G3]

본문:
Chapter Accordion List

각 Chapter:
- Chapter 번호
- Chapter 제목
- 펼침/접힘 아이콘

각 Unit Card:
- Unit 번호
- Unit 제목
- 예시 문제 2~3개
- 선택 시 startGame
```

### 11.3 Unit 선택 시 흐름

기존 흐름을 최대한 유지한다.

```ts
selectLevel(unit.id);
startGame();
```

또는 선택 후 시작 버튼을 따로 두고 싶으면:

```ts
selectLevel(unit.id);
setScreen('game');
```

현재 앱 구조에 맞춰 최소 변경으로 구현한다.

---

## 12. 현재 코드 기준 수정 파일 목록

### 12.1 반드시 수정

| 파일 | 수정 내용 |
|---|---|
| `src/game/types.ts` | CurriculumUnit, CurriculumChapter, CurriculumGrade, ProblemKind 추가. ProblemTag를 string으로 확장 |
| `src/data/levels.ts` | 기존 LEVELS를 curriculum unit 기반 데이터로 대체하거나 신규 `curriculum.ts`로 분리 |
| `src/data/modes.ts` | 더 이상 사용하지 않거나 제거 |
| `src/game/problemGenerator.ts` | unitId 기반 생성기로 교체 또는 신규 `curriculumProblemGenerator.ts` 사용 |
| `src/components/screens/ModeSelectScreen.tsx` | 사용 중지 |
| `src/components/screens/LevelSelectScreen.tsx` | CurriculumSelectScreen으로 교체 |
| `src/components/screens/CurriculumSelectScreen.tsx` | 신규 생성 |
| `src/App.tsx` | `modeSelect`, `levelSelect` 대신 curriculum select 연결 |
| `src/components/game/ProblemCard.tsx` | `.replace('=', '')` 제거 |
| `src/stores/gameStore.ts` | 기본 시간 180초, getUnitById/generateCurriculumProblem 연결 |
| `src/hooks/useGameLoop.ts` | `getLevelById` 대신 `getUnitById` 사용 |
| `src/components/input/InputPanel.tsx` | 타이머는 유지. 180초 기준 표시 확인 |
| `src/components/screens/ResultScreen.tsx` | unit/chapter/grade 태그 기반 취약 분석 강화 |

### 12.2 유지

| 파일/기능 | 처리 |
|---|---|
| `Keypad.tsx` | 유지 |
| `CurrentInput.tsx` | 유지 |
| `GameArea.tsx` | 유지 |
| `Hearts.tsx` | 유지 |
| `ScoreDisplay.tsx` | 유지 |
| `ComboDisplay.tsx` | 유지 |
| `useOrientation.ts` | 유지 |
| `useSound.ts` | 유지 |
| `utils/sound.ts` | 유지 |
| PWA 설정 | 유지, 필요 시 점검만 |

---

## 13. 결과 분석 변경

기존 분석은 `addition`, `borrow`, `division` 같은 넓은 태그 중심이다.  
v0.2에서는 unit 단위 분석이 가능해야 한다.

각 문제에는 다음 태그를 포함한다.

```ts
tags: [
  'grade:G1',
  'chapter:G1_C01',
  'unit:G1_C01_U01',
  'addition',
  'plus_one'
]
```

결과 화면에서는 다음을 보여준다.

| 항목 | 설명 |
|---|---|
| 최종 점수 | 기존 유지 |
| 정답 수 | 기존 유지 |
| 오답 수 | 기존 유지 |
| 놓친 문제 수 | 기존 유지 |
| 최고 콤보 | 기존 유지 |
| 취약 Grade | 실패율이 높은 G |
| 취약 Chapter | 실패율이 높은 Chapter |
| 취약 Unit | 실패율이 높은 Unit |
| 취약 유형 | carry, borrow, zero, blank, division 등 |

성적표 기능은 별도 앱에서 끌어올 예정이면 상세 구현은 보류한다.

---

## 14. AI 코딩툴용 직접 지시문

아래 문장을 Claude Code, Codex, Antigravity에 그대로 붙여넣어도 된다.

```text
You are refactoring an existing React + TypeScript + Vite PWA arithmetic rain game.

Do not rewrite the entire app.

Keep the existing game engine, keypad, falling animation, scoring, combo, hearts, timer, sound system, PWA setup, and landscape-only layout.

Refactor the curriculum and problem generation system.

Current app has:
- ModeSelectScreen
- LevelSelectScreen
- modes.ts
- levels.ts
- problemGenerator.ts

Replace the current mode/level structure with a Grade → Chapter → Unit curriculum structure.

Create a new CurriculumSelectScreen:
- top grade tabs: G1, G2, G3
- chapter accordion list
- unit cards inside each chapter
- unit cards show unit title and 2~3 example expressions
- selecting a unit starts the game with that unit id

Use the existing levelId field as unitId if that minimizes changes.

Timer:
- Keep timer functionality.
- Change the default game duration from 300 seconds to 180 seconds.
- Extract DEFAULT_GAME_DURATION_SECONDS = 180 as a constant.

Problem display:
- Normal problems should display without "=".
  Example: "1+1", "37+8", "24×2"
- Blank problems should display with "=".
  Example: "9+□=10", "27÷□=9"
- Do not globally remove "=" in ProblemCard.
- ProblemCard should render problem.expression exactly as provided.

Curriculum:
- Remove or hide the dedicated multiplication table mode from this app.
- Multiplication table memorization will be a separate app.
- Keep multiplication/division application units in G3.
- Do not include two-digit × two-digit general random multiplication in the default curriculum.
- Do not include division by a two-digit divisor in the default curriculum.
- Do not include remainder division.
- Do not include fractions or decimals.

Problem generation:
- Use unit-specific rule-based generators.
- Every answer must be a non-negative integer.
- No negative results.
- No decimal results.
- No fraction results.
- For division, generate quotient and divisor first, then dividend = quotient × divisor.

Refactor problemGenerator.ts or create curriculumProblemGenerator.ts.
Refactor levels.ts or create curriculum.ts.

Preserve existing scoring:
- +10 per removed problem
- +20 bonus every 5 consecutive correct answers
- if multiple active problems have the same answer, remove all matching problems

Preserve wrong answer behavior:
- wrong input does not reduce hearts
- missed falling problem reduces hearts by 1

Add curriculum tags to each generated problem:
- grade:G1 / grade:G2 / grade:G3
- chapter:G1_C01 etc.
- unit:G1_C01_U01 etc.
- semantic tags such as addition, subtraction, carry, borrow, zero, blank, division, multiplication, order_of_operations

Enhance result analysis to use unit/chapter/grade tags when possible.
```

---

## 15. 구현 우선순위

### Phase 1. 안전한 구조 변경

1. `DEFAULT_GAME_DURATION_SECONDS = 180` 추가
2. `ProblemCard`의 `.replace('=', '')` 제거
3. `ProblemTag`를 string 기반으로 확장
4. `ProblemKind`, `CurriculumUnit` 타입 추가

### Phase 2. 커리큘럼 데이터 추가

1. `src/data/curriculum.ts` 생성
2. G1/G2/G3 Chapter/Unit 데이터 입력
3. 각 Unit에 examples, fallSpeed, spawnInterval, maxActiveProblems 추가
4. `getUnitById(unitId)` 구현

### Phase 3. 선택 화면 교체

1. `CurriculumSelectScreen.tsx` 생성
2. G 탭 구현
3. Chapter 아코디언 구현
4. Unit 카드 구현
5. Unit 선택 시 기존 `selectLevel(unit.id)` + `startGame()` 연결

### Phase 4. 문제 생성기 교체

1. `generateCurriculumProblem(unitId)` 구현
2. G1부터 순차 구현
3. G2 구현
4. G3 구현
5. fallback generator 추가

### Phase 5. 기존 구조 정리

1. `ModeSelectScreen` 비활성화
2. `LevelSelectScreen` 비활성화
3. `modes.ts` 사용 제거
4. 기존 `levels.ts`를 curriculum으로 대체
5. 구구단 모드 숨김/제거

### Phase 6. 결과 분석 강화

1. `unit:*` 태그 분석
2. `chapter:*` 태그 분석
3. `grade:*` 태그 분석
4. 취약 Unit 표시
5. 취약 Chapter 표시

---

## 16. 완료 기준

v0.2 리팩터링이 완료되었다고 판단하는 기준은 다음과 같다.

- 앱이 여전히 PWA로 실행된다.
- 세로 화면에서는 가로 전환 안내가 나온다.
- 시작 화면에서 커리큘럼 선택 화면으로 이동한다.
- G1/G2/G3 탭이 있다.
- Chapter가 접기/펼치기 된다.
- Unit 카드가 보인다.
- Unit을 누르면 게임이 시작된다.
- 게임 시간 기본값이 3분이다.
- 일반 문제는 `1+1`처럼 `=` 없이 내려온다.
- 빈칸 문제는 `9+□=10`처럼 `=` 포함해서 내려온다.
- 같은 답 문제는 전부 제거된다.
- 오답 입력은 하트를 깎지 않는다.
- 문제가 바닥에 닿으면 하트가 깎인다.
- 구구단 전용 모드는 보이지 않는다.
- 두 자리×두 자리 일반 랜덤과 두 자리 제수 나눗셈은 기본 커리큘럼에 없다.
- 결과 화면에서 최소한 unit 태그 기반 분석이 가능하다.

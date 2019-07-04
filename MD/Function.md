### 함수
> 기명 함수 또는 익명 함수로 만들 수 있다.
> 함수는 함수 본문 외부의 변수를 참조할 수 있다. 변수를 Capture 한다 라고 말한다.

```typescript
// 함수의 타입
function add(x: number, y: number): number {
  return x + y
}

// full function type
let myAdd = function(x: number, y: number): number { return x + y }

// 파라미터 타입이 있으면 함수 타입에 파라미터를 지정하는 이름에 상관없이 함수의 유효한 타입으로 간주된다.
let myAdd2: (baseValue: number, increment: number) => number =
  function(x: number, y: number): number { return x + y }
// 파라미터와 리턴 타입 사이에 굵은 화살표 (=>)를 사용하여 리턴 타입을 명확하게 한다. 함수타입의 필수 부분
// Capture된 변수는 타입에 반영되지 않는다.
  
// 타입 추정 "컨텍스트 타입 지정"
let myAdd3: (baseValue: number, increment: number) => number =
  function(x, y) { return x + y }
  
// 타입 오버로드
function pickCard(x: { suit: string; card: number; }[]): number
function pickCard(x: number): { suit: string; card: number; }
function pickCard(x): any {
  return x
}
```

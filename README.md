# TypeScript and React Example

## Init

리액트에서 TS를 사용하려면
> `yarn add react react-dom @types/react @types/react-dom`

### @TODO
> 내가 직접 해보고 간단하게 정리 해보기

## HandBook

### 기본 타입

```typescript
// 부울 Boolean
let isDone: boolean = false

// 숫자형
let decimal: number = 6

// 문자형
let color: string = 'blue'
let sentence: string = `Hello ~~ ${color}`

// 배열
let list: number[] = [1, 2, 3]
let list2: Array<number> = [1, 2, 3] // 제네릭 배열 타입 Array<요소의 타입>

// 튜플
let x: [string, number]
x = ["hello", 10] // correct
x = [10, "hello"] // incorrect

/* 열거
* enums는 0부터 시작하는 자신의 번호를 매긴다
* { Red = 1, Green, Blue } 와 같은 선언으로 1부터 시작할 수 있다.
* { Red = 1, Green = 2, Blue = 4 } 와 같은 선언으로 수동으로 값을 설정할 수 있다.
*/
enum Color { Red, Green, Blue }
let c: Color = Color.Green

// Any (모든 값)
let notSure: any = 4

let anyList: any[] = [ 1, true, "free" ]
anyList[1] = 100

// Void (어떤 타입의 부재도 전혀 없다)
// undefined 또는 null만 할당할 수 있다.
function warnUser(): void {
  alert('warnUser')
}
let unusable: void = undefined

// Null 과 Undefined
let u: undefined = undefined
let n: null = null

// Never 절대로 발생하지 않는 값의 타입
// any도 never에 할당할 수 없다.
function error(message: string): never {
  throw new Error(message)
}

/*타입 단언 (Type assertions)
* 이미 타입을 알고 있을 때? 개발자가 필요한 특별한 검사를 이미 수행했다고 가정
* 다른 언어의 형 변환과 비슷하지만 특별한 검사나 데이터를 재구성하지는 않는다.
* 두 가지 형태를 가진다.
*/
let someValue: any = "this is a string"
let strLength: number = (<string>someValue).length // 꺽쇠괄호 구문
let strLength2: number = (someValue as string).length // as 구문, JSX와 함께 사용할 때는 as만 허용
```

### 인터페이스
```typescript
// 타입의 이름을 지정하는 역할
interface LabelledValue {
  label: string
}

function printLabel(labelledObj: LabelledValue) {
  console.log(labelledObj.label)
}

// 선택적 프로퍼티 (Optional Properties)
// 인터페이스에 포함되지 않는 프로퍼티의 사용을 방지할 수 있다.
interface SquareConfig {
  color?: string
  width?: number
}
function createSquare(config: SquareConfig): {
  color: string
  area: number
} {
  let newSquare = { color: 'white', area: 100 }
  if (config.color) {
    newSquare.color = config.color
  }
  if (config.width) {
    newSquare.area = config.width * config.width
  }
  return newSquare
}

// 읽기 전용 프로퍼티 (Readonly properties)
interface Point {
  readonly x: number
  readonly y: number
}

let p1: Point = { x: 10, y: 20 }
p1.x = 5 // Error

let a: number[] = [1, 2, 3, 4]
let ro: ReadonlyArray<number> = a

a = ro as number[]
a = <Array>a
// 할당 후 바꿀 수 없다.
// 타입 단언을 통해 오버라이드 할 수 있다.

```

**참고 사이트**
[TypeScript-kr](https://typescript-kr.github.io)

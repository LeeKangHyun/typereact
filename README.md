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

/* Object
* non-primitive type(number, string, boolean, symbol, null, undefined) 가 아닌 타입을 나타내는 타입
*/

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
// 할당 후 바꿀 수 없다.
/*
* const => 변수에 사용
* readonly => 프로퍼티에 사용
*/
interface Point {
  readonly x: number
  readonly y: number
}

let p1: Point = { x: 10, y: 20 }
p1.x = 5 // Error

let a: number[] = [1, 2, 3, 4]
let ro: ReadonlyArray<number> = a

// 타입 단언을 통해 오버라이드 할 수 있다.
a = ro as number[] // 추천
a = <number[]>ro

/* 프로퍼티 초과 검사 (Excess Property Checks)
* 객체 리터럴은 다른 변수에 할당하거나 인수로 전달할 때 특별한 처리를 받아 프로퍼티 초과 검사를 거친다.
* 대상 타입에 없는 프로퍼티가 있을 경우 오류가 발생한다.
*/
let mySquare = createSquare({ colour: "red", width: 100 }) // Error colour은 SquareConfig 타입 파리미터에 지정할 수 없다.
// 이 프로퍼티 초과 검사를 피하는 방법은 type assertions 사용
let mySquare2 = createSquare({ width: 100, colour: "red" } as SquareConfig)

// 객체에 다른 용도로 사용 되는 몇가지 추가 프로퍼티가 있다고 확신하는 경우
// 문자열 인덱스 시그니처(String Index Signature)을 추가하는 것이 더 좋다.
interface SquareConfigOpt {
  color?: string
  width?: number
  [propName: string]: any // 문자열 인덱스 시그니처
}

// 마지막으로 체크를 피하는 방법은
// 다른 변수에 객체를 할당하는 방법
// 이러한 체크를 피하는 방법은 시도 하지 말아야 한다.
let squareOpt = { colour: "red", width: 100 }
let mySquare3 = createSquare(squareOpt)

// 함수 타입 Function Types
// 함수의 타입을 형성하기 위해 인터페이스에 호출 시그니처(Call Signature)을 제공한다.
interface SearchFunc {
  (source: string, subString: string): boolean
}

let mySearch: SearchFunc
mySearch = function(source:string, subString: string) { // 파라미터에 타입을 정할 필요 없다. 인터페이스에서 미리 정의 했기 때문에
  let result = source.search(subString)
  return result > -1
} // 변수의 이름이 일치할 필요는 없다.

// 인덱싱 가능 타입 Indexable Types
// a[10] 또는 ageMap["daniel"] 처럼 index를 생성할 수 있는 타입
interface StringArray {
  [index: number]: string // number로 인덱싱 될 때 string을 반환한다.
}

let myArray: StringArray = ["Bob", "Fred"]
let myStr: string = myArray[0]
// 인덱스 시그니처에는 문자열과 숫자의 두 가지 타입이 있다.
// 두가지 타입의 인덱서를 모두 지원하는 경우에는 숫자 인덱서에서 반환된 형태는 문자열 인덱서에서 반환된 형태의 하위 형태이어야 한다.

interface ReadonlyStringArray {
  readonly [index: number]: string
}

let myArr: ReadonlyStringArray = ["Alice", "Bob"]
myArr[2] = "Mallory" // Error

// 클래스 타입 Class Types
// 명시적인 강제가 가능하다.
// 인터페이스는 public 측면의 class를 만든다.

interface ClockInterface {
  currentTime: Date
  setTime(d: Date)
}

class Clock implements ClockInterface {
  currentTime: Date
  setTime(d: Date) {
    this.currentTime = d
  }
  constructor(h: number, m: number) {}
}

// 클래스의 Static과 Instance의 차이점

// Construct Signature를 사용하여 인터페이스를 만들고 이 인터페이스를
// implements 하는 클래스를 만들려고 하면 오류가 발생
// 클래스가 인터페이스를 구현할 때 클래스의 인스턴스 측면만 검사되기 때문에.!
interface ClockConstructor {
  new (hour: number, minute: number)
}

class Clock implements ClockConstructor {
  currentTime: Date
  constructor(h: number, m: number) {}
}

// 해결방법은 클래스의 정적인 측면에서 직접 작업해야 한다.
interface ClockConstructor {
  new (hour: number, minute: number): ClockInterface
}

interface ClockInterface {
  tick()
}

function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
  return new ctor(hour, minute)
}

class DigitalClock implements ClockInterface {
  constructor(h: number, m: number) {}
  tick() {
    console.log("beep beep", this.h, this.m)
  }
}


class AnalogClock implements ClockInterface {
  constructor(h: number, m: number) {}
  tick() {
    console.log("tick tick", this.h, this.m)
  }
}

let digital = createClock(DigitalClock, 12, 17)
let analog = createClock(AnalogClock, 7, 32)

// 인터페이스 확장 Extending Interfaces
// 클래스처럼 인터페이스도 확장 가능
interface Shape {
  color: string
}

interface Square extends Shape {
  sideLength: number
}

let square = <Square>{}
square.color = "blue"
square.sideLength = 10

interface PenStroke {
  penWidth: number
}

interface Square extends Shape, PenStroke {
  sideLength: number
}

// 하이브리드 타입 Hybrid Types
interface Counter {
  (start: number): string
  interval: number
  reset(): void
}

function getCounter(): Counter {
  let counter = <Counter>function(start) {}
  counter.interval = 123
  counter.reset = function() {}
  
  return counter
}

let c = getCounter()
c(10)
c.reset()
c.interval = 5.0

// 인터페이스 확장 클래스 Interfaces Extending Classes
// 인터페이스 타입이 클래스 타입을 확장하면 해당 클래스의 멤버들을 상속하지만 구현을 상속하지는 않는다.

// private 또는 protected 멤버가 있는 클래스를 확장하는 인터페이스를 생성하면
// 해당 인터페이스 타입은 해당 클래스 또는 해당 클래스의 서브 클래스에서만 구현할 수 있다.

class Control {
  private state: any
}

// Control의 모든 멤버가 포함
// state는 private이기 때문에 Control의 자식만 SelectableControl을 구현가능
interface SelectableControl extends Control {
  select(): void
}

class Button extends Control implements SelectableControl {
  select() {
    
  }
}

class TextBox extends Control {
  select() {
    
  }
}

// Error Image타입의 state 프로퍼티가 없습니다.
class Image implements SelectableControl {
  select() {
    
  }
}

class Location {
  
}

```

**참고 사이트**
1. [TypeScript-kr](https://typescript-kr.github.io)
2. [https://infoscis.github.io](https://infoscis.github.io)


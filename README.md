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

### 클래스
> 클래스 몸체에 메소드만을 포함할 수 있다.

| 접근 가능성 | public | protected | private |
| --- | --- | --- | --- |
| 클래스 내부 | 가능 | 가능 | 가능 |
| 자식 클래스 내부 | 가능 | 가능 | 불가능 |
| 클래스 인스턴스 | 가능 | 불가능 | 불가능 |

```typescript
// Basic Class
class Greeter {
  greeting: string
  constructor(message: string) {
    this.greeting = message
  }
  
  greet() {
    return "Hello, " + this.greeting
  }
}

let greeter = new Greeter("world")

// Inheritance
/*
* this에 있는 프로퍼티에 접근하기 전에 항상 super()를 호출해야 한다.
*/
class Animal {
  name: string
  constructor(theName: string) {
    this.name = theName
  }
  move(disatanceInMeters: number = 0) {
    console.log(this.name, " ", disatanceInMeters)
  }
}

class Snake extends Animal {
  constructor(name: string) {
    super(name) // 기본 클래스의 생성자를 실행할 super() 를 호출해야한다
  }
  move(distanceInMeters = 5) {
    super.move(distanceInMeters)
  }
}

class Horse extends Animal {
  constructor(name: string) {
    super(name)
  }
  move(distanceInMeters = 45) {
    super.move(distanceInMeters)
  }
}

let sam = new Snake('Sam')

// tom은 Animal로 선언되었지만 Horse의 값을 가지므로 Horse의 오버라이딩 메서드가 호출된다.
let tom: Animal = new Horse('Tom')

sam.move()
tom.move(34)

// public (Public by default)
// 멤버들에 자유롭게 접근할 수 있다.

// private
class Animal {
  private name: string
  constructor(theName: string) {
    this.name = theName
  }
}

new Animal("cat").name // Error 'name'은 private이다

class Rhino extends Animal {
  constructor() {
    super("Rhino")
  }
}

// Animal과 Rhino는 Animal의 private 의 형태를 공유하기 때문에 호환 된다.

// protected
class Person {
  protected name: string
  constructor(name: string) {
    this.name = name
  }
}

class Employee extends Person {
  private department: string
  constructor(name: string, department: string) {
    super(name)
    this.department = department
  }
  
  public getElevtorPitch() {
    return `${this.name} ${this.department}`
  }
}

let howard = new Employee("Howard", "Sales")

// 생성자 또한 protected로 표시될 수 있다.
// 인스턴스화할 수는 없지만 확장될 수는 있다.
class Person {
  protected name: string
  protected constructor(theName: string) {
    this.name = theName
  }
}

let john = new Person('John') // Error Person의 생성자는 protected이다

// 매개변수 프로퍼티
class Octopus {
  readonly numberOfLegs: number = 8
  constructor(readonly name: string) {
    
  }
}

// 접근자
// get, set은 자동적으로 readonly
// .d.ts 파일을 생성할 때 유용

let passcode = 'secret'

class Employee {
  private _fullName: string
  
  get fullName(): string {
    return this._fullName
  }
  
  set fullName(newName: string) {
    if (passcode && passcode === 'secret') {
      this._fullName = newName
    } else {
      console.log('Error')
    }
  }
}

let employee = new Employee()
employee.fullName = 'Bob'
if (employee.fullName) {
  console.log(employee.fullName)
}

// 정적 프로퍼티
// this.를 추가하는 것과 비슷하게 스태틱 접근자 앞에 클래스명을 추가한다.
class Grid {
  static origin = {x: 0, y: 0};
  calculateDistanceFromOrigin(point: {x: number; y: number;}) {
    let xDist = (point.x - Grid.origin.x);
    let yDist = (point.y - Grid.origin.y);
    return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
  }
  constructor (public scale: number) { }
}

let grid1 = new Grid(1.0);  // 1x scale
let grid2 = new Grid(5.0);  // 5x scale

console.log(grid1.calculateDistanceFromOrigin({x: 10, y: 10}));
console.log(grid2.calculateDistanceFromOrigin({x: 10, y: 10}));

// 추상 클래스
// 다른 클래스가 파생될 수 있는 기본 클래스
// 인터페이스와 달리 추상 클래스는 멤버에 대한 구현 세부 정보를 포함할 수 있다.
// 추상 메서드는 파생된 클래스에서 구현해야 한다.

abstract class Department {
  constructor(public name: string) {}
  
  printName(): void {
    console.log('Department name: ' + this.name)
  }
  
  abstract printMeeting(): void
}

class AccountingDepartment extends Department {
  constructor(public name: string) {
    super(name) // 파생 된 클래스의 생성자는 super()를 호출해야한다.
  }
  
  printMeeting(): void{
    console.log('Account')
  }
  
  generateReports(): void {
    console.log('Genereting')
  }
}

let department: Department
// department = new Department() // Error 추상클래스의 인스턴스를 생성할 수 없다.
department = new AccountingDepartment('Hello') // 
department.printName()
department.printMeeting()
department.generateReports() // Error abstract 타입으로 선언된 메서드가 존재하지 않는다.

// 고급 기법 Advanced Techniques

// 생성자 함수
// TypeScript 에서 클래스를 선언하면 실제로 여러 선언이 동시에 생서된다.
// 클래스의 모든 정적 멤버도 포함.
// instatnce
class Greeter {
  constructor(public greeting: string) {}
  
  greet() {
    return 'Hello, ' + this.greeting
  }
}

let greeter: Greeter // Greeter 클래스의 인스턴스 타입으로 Greeter 를 사용
greeter = new Greeter('World')
console.log(greeter.greet())

// 위 TS를 JS로 변환한 모습
let Greeter = (function() {
  function Greeter(message) {
    this.greeting = message
  }
  Greeter.prototype.greet = function() {
    return "Hello, " + this.greeting
  }
  return Greeter
})()

let greeter
greeter = new Greeter('World') // 클래스의 인스턴스를 얻는다.
console.log(greeter.greet())

class Greeter {
  static standardGreeting = "Hello, World"
  constructor(public greeting?: string) {}
  greet() {
    if (this.greeting) {
      return "Hello, " + this.greeting
    } else {
      return Greeter.standardGreeting
    }
  }
}

let greeter1: Greeter
greeter1 = new Greeter()
console.log(greeter1.greet())

let greeterMaker: typeof Greeter = Greeter 
// 클래스 자체를 보유하거나 다른 방법으로 생성자 함수를 나타낸다, 인스턴스 유형이 아닌 Greeter 클래스 자체의 타입 을 사용한다.
greeterMaker.standardGreeting = "Hey World"

let greeter2: Greeter = new greeterMaker()
console.log(greeter2.greet())

// 클래스를 인터페이스로 사용
/*
* 클래스 선언은 클래스의 인스턴스를 나타내는 타입과 생성자 함수 두가지를 작성 해야 한다.
* */
class Point {
  x: number
  y: number
}

interface Point3d extends Point {
  z: number
}

let point3d: Point3d = {
  x: 1,
  y: 2,
  z: 3
}
```

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

### 제네릭
> 단일 타입이 아닌 다양한 타입을 처리할 수 있는 컴포넌트를 만드는 것

```typescript
// 타입 변수 사용. 값이 아닌 타입에서 작동하는 특별한 종류의 변수

function identity<T>(arg: T): T { // T는 함수 사용자가 제공한 타입을 캡처하여 나중에 사용할 수 있도록 한다.
  return arg
}

/*
* 제네릭 함수를 호출하는 두 가지 방법
* 1. Type 파라미터를 포함한 모든 파라미터를 함수에 전달
* 2. 파라미터 타입 추론
 */

//1) T를 string으로 명시적 설정, ()보다는 파라미터를 중심으로 <>를 사용
let output = identity<string>("string")

//2) 전달하는 파라미터의 타입에 따라 자동으로 T의 값을 설정
let output = identity("string")

// ** 
function loggingIdentity<T>(arg: T[]): T[] {
  console.log(arg.length)
  return arg
}

function loggingIdentity<T>(arg: Array<T>): Array<T> {
  console.log(arg.length)
  return arg
}
// **

// 제네릭 타입
let myIdentity: <T>(arg: T) => T = identity

// 타입 변수의 수와 타입 변수의 사용이 일치하다면 제네릭 타입 매개변수에 다른 이름을 사용할 수 있다.
let myIdentity: <U>(arg: U) => U = identity

// 제네릭 타입을 객체 리터럴 타입의 호출 형식으로도 사용할 수 있다.
let myIdentity: {<T>(arg: T): T} = identity

// 인터페이스로 작성해서 할 수 있다.
interface GenericIdentityFn {
  <T>(arg: T): T
}

let myIdentity: GenericIdentityFn = identity

// 제네릭 매개변수를 전체 인터페이스의 매개변수로 이동
interface GenericIdentityFn<T> {
  (art: T): T
}

let myIdentity: GenericIdentityFn<number> = identity

// 제네릭 제약조건
// 대신 모든 필수 프로퍼티가 있는 타입의 값을 전달해야 한다.
interface Lengthwise {
  length: number
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length)
  return arg
}

// 제네릭 제약조건에서 타입 매개변수 사용
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key]
}

let x = { a: 1, b: 2, c: 3, d: 4 }
getProperty(x, "a") // 오류 없음
getProperty(x, "m") // 오류

// 제네릭에서 클래스 타입 사용
// 팩토리를 생성할 때 생성자 함수를 사용하여 클래스 타입을 참조해야 한다.
function create<T>(c: {new(): T}): T {
  return new c()
}

class BeeKeeper {
  hasMask: boolean;
}

class ZooKeeper {
  nametag: string;
}

class Animal {
  numLegs: number;
}

class Bee extends Animal {
  keeper: BeeKeeper;
}

class Lion extends Animal {
  keeper: ZooKeeper;
}

function createInstance<A extends Animal>(c: new () => A): A {
  return new c();
}

createInstance(Lion).keeper.nametag;  // 타입 체크!
createInstance(Bee).keeper.hasMask;   // 타입 체크!
```

### 열거형(Enums)
> 숫자 및 문자열 기반 열거형을 모두 제공

```typescript
enum Direction {
  up = 1,
  down,
  left,
  right
}

enum Response {
  No = 0,
  Yes = 1
}

function respond(recipient: string, message: Response): void {}

respond("PC", Response.Yes)

// 숫자 열거형은 계산된, 상수 멤버에 혼합될 수 있다.

enum E {
  A = getSomeValue(),
  B, // Error A는 상수로 초기화 되지 않았으므로 B에는 초기화가 필요하다.
}
```

### 타입 호환성
```typescript
// y가 적어도 x와 같은 멤버를 가지고 있다면 x는 y와 호환된다.
interface Named {
  name: string
}

let x: Named
// y의 추론된 타입은 { name: string; location: string }
let y = { name: "Alice", location: "Seattle" }
x = y

function greet(n: Named) {
  alert("Hello, " + n.name)
}
greet(y)

// 두 함수 비교
let x = (a: number) => 0
let y = (b: number, s: string) => 0

y = x // 좋아요
x = y // 오류
// x가 y에 할당될 수 있는지 

let x = () => ({ name: "Alice" })
let y = () => ({ name: "Alice", location: "Seattle" })
x = y // 좋아요
y = x // x에 location 프로퍼티가 없기 때문에 오류
```

**참고 사이트**
1. [TypeScript-kr](https://typescript-kr.github.io)
2. [https://infoscis.github.io](https://infoscis.github.io)


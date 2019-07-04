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

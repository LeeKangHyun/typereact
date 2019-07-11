### 제네릭
> 단일 타입이 아닌 다양한 타입을 처리할 수 있는 컴포넌트를 만드는 것\
선언 시점이 아니라 생성 시점에 타입을 명시하여 하나의 타입만이 아닌 다양한 타입을 사용할 수 있도록 한다.

```typescript
interface StackType {
  push(item: any): void
  pop(): any
}

class Stack implements StackType {
  private data: any[] = []
  
  constructor() {}
  
  push(item: any):void {
    this.data.push(item)
  }
  
  pop(): any {
    return this.data.pop()
  }
}

class NumberStack extends Stack {
  constructor() {
    super()
  }
  
  push(item: number):void {
    super.push(item)
  }
  
  pop(): any {
    return super.pop()
  }
}

const stack = new Stack()
stack.push(1)
stack.push('a')
stack.pop().substring(0) // 'a'
stack.pop().substring(0) // Throw TypeError
```

```typescript
class Stack<T> {
  private data: T[] = []
  constructor() {}
  push(item: T): void {
    this.data.push(item)
  }
  pop(): T {
    return this.data.pop()
  }
}

const numberStack = new Stack<number>()
const stringStack = new Stack<string>()
numberStack.push(1)
stringStack.push('1')
```

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

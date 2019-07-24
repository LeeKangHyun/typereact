## 고급 타입
### 교차 타입
> Person & Serializable & Loggable은 Person과 Serializable이며 Loggable이다.
> 세 가지 타입의 모든 멤버를 갖게 된다.

```typescript
function extend<T, U>(first: T, second: U): T & U {
  let result = <T & U>{}
  
  for (let id in first) {
    (<any>result)[id] = (<any>first)[id]
  }
  for (let id in second) {
    if (!result.hasOwnProperty(id)) {
      (<any>result)[id] = (<any>second)[id]
    }
  }
  
  return result
}

class Person {
  constructor(public name: string) {}
}

interface Loggable {
  log(): void
}

class ConsoleLogger implements Loggable {
  log() {
    
  }
}

let jim = extend(new Person('Jim'), new ConsoleLogger())
let n = jim.name
jim.log()
```

### 유니온 타입
> number | string | boolean은 number, string 또는 boolean이 될 수 있다.
> 유니온 타입이 있는 값이 있으면 유니온의 모든 타입에 공통적인 멤버에만 접근할 수 있습니다.

```typescript
interface Bird {
  fly()
  layEggs()
}

interface Fish {
  swim()
  layEggs()
}

function getSmallPet(): Fish | Bird {
  return 
}

let pet = getSmallPet()
pet.layEggs()
pet.swim() // 오류
```

### 타입 가드와 차별된 타입

```typescript
interface Fish {
  swim()
  layEggs()
}

interface Bird {
  fly()
  layEggs()
}

function getSmallPet(): Fish | Bird {
  return
}

let pet = getSmallPet()

if (pet.swim) {
  pet.swim()
} else if (pet.fly) {
  pet.fly()
}

// 타입 단언을 사용해야 한다.
if ((<Fish>pet).swim) {
  (<Fish>pet).swim()
} else {
  (<Bird>pet).fly()
}
```

### 사용자 정의 타입 가드
```typescript
interface Fish {
  swim()
  layEggs()
}

interface Bird {
  fly()
  layEggs()
}

function getSmallPet(): Fish | Bird {
  return
}

let pet = getSmallPet()

// parameterName is Type 형태를 취해야 한다.

function isFish(pet: Fish | Bird): pet is Fish { // 타입 명제
  return (<Fish>pet).swim !== undefined
}

if (isFish(pet)) {
  pet.swim()
} else {
  pet.fly()
}
```

### typeof 타입가드

> typeof v === 'typename', typeof v !== 'typename'
> 'typename' 은 반드시 number, string, symbol

```typescript
function padLeft(value: string, padding: string | number) {
  if (typeof padding === 'number') {
  
  }
  if (typeof padding === 'string') {
    
  }
  throw new Error('')
}
```

### instanceof 타입 가드

> 1. 타입이 `any`가 아닌 경우 함수의 `prototype`프로퍼티 타입
> 2. 해당 타입의 생성자 시그니처에 의해 반환된 타입의 결합

```typescript
interface Padder {
    getPaddingString(): string
}

class SpaceRepeatingPadder implements Padder {
    constructor(private numSpaces: number) { }
    getPaddingString() {
        return Array(this.numSpaces + 1).join(" ");
    }
}

class StringPadder implements Padder {
    constructor(private value: string) { }
    getPaddingString() {
        return this.value;
    }
}

function getRandomPadder() {
    return Math.random() < 0.5 ?
        new SpaceRepeatingPadder(4) :
        new StringPadder("  ");
}

// 'SpaceRepeatingPadder | StringPadder' 타입입니다
let padder: Padder = getRandomPadder();

if (padder instanceof SpaceRepeatingPadder) {
    padder; // 타입이 'SpaceRepeatingPadder'로 좁혀졌습니다
}

if (padder instanceof StringPadder) {
    padder; // 타입이 'StringPadder'로 좁혀졌습니다.
}
```

### Nullable types
> --strictNullChecks 를 통해 null 또는 undefined 의 포함 여부를 설정할 수 있다.

```typescript
function broken(name: string | null): string {
  function postfix(epithet: string) {
    return name.charAt(0) + '. the ' + epithet // Error, 'name'이 null일 수 있다.
  }
  name = name || 'Bob'
  return postfix("great")
}

function fixed(name: string | null): string {
  function postfix(epithet: string) {
    return name!.charAt(0) + '. the ' + epithet // identifier! 는 identifier 의 타입 null과 undefined 를 제거한다.
  }
  name = name || 'Bob'
  return postfix('great')
}
```

### Type Aliases
```typescript
type Name = string
type NameResolver = () => string
type NameOrResolver = Name | NameResolver

function getName(n: NameOrResolver): Name {
  if (typeof n === 'string') {
    return n
  } else {
    return n()
  }
}

type Container<T> = { value: T }

type Tree<T> = {
  value: T
  left: Tree<T>
  right: Tree<T>
}

type Yikes = Array<Yikes> // 오류
```

### Type과 Interface의 차이점
> Interface는 여러곳에서 사용되는 새로운 이름을 만든다.
> Type aliases는 새로운 이름을 만들지 않는다.

```typescript
type Alias = { num: number }
interface Interface {
  num: number
}

declare function aliased(arg: Alias): Alias
declare function interfaced(arg: Interface): Interface
```
> Type aliases 는 extends / implements 될 수 없다.
> 가능하다면 Type aliases 보다 Interface 를 이용 해야한다.
> 한편 Interface로 표현할 수 없는 형태이고 union, tuple을 이용해야 한다면 Type aliases 를 이용한다.

### 문자열 리터럴 타입

```typescript
type Easing = "ease-in" | "ease-out" | "ease-in-out"

class UIElement {
  animate(dx: number, dy: number, easing: Easing) {
    if (easing === 'ease-in') {
      
    } else if (easing === 'ease-out') {
      
    } else if (easing === 'ease-in-out') {
      
    } else {
      // Error! null또는 undefined로 통과해서는 안된다.
    }
  }
}

let button = new UIElement()
button.animate(0, 0, 'ease-in')
button.animate(0, 0, 'uneasy') // Error. uneasy가 지원되지 않는다.
```

### 숫자 리터럴 타입
```typescript
function rollDie(): 1 | 2 | 3 | 4 | 5 | 6 {
  return
}
```

### 인덱스 타입

```typescript
/*
* 인덱스 타입 쿼리 연산자
* keyof T
*/
function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
  return names.map(n => o[n])
}

interface Person {
  name: string
  age: number
}
let person: Person = {
  name: 'KH',
  age: 28,
}

let strings: string[] = pluck(person, ['name'])

// keyof Person 은 'name' | 'age'와 완전히 호환된다.
let personProps: keyof Person // 'name' | 'age'

/* 
* 인덱스 접근 연산자
* T[K]
*/
function getProperty<T, K extends keyof T>(o: T, name: K): T[K] {
  return o[name] // T[K] 타입
}
```

### 인덱스 타입과 문자열 인덱스 시그니처
> keyof와 T[K] 는 상호작용한다.

```typescript
interface Map<T> {
  [key: string]: T
}

let keys: keyof Map<number> // string
let value: Map<number>['foo'] // number
```

### Mapped types
```typescript
interface PersonPartial {
  name?: string
  age?: number
}

interface PersonReadonly {
  readonly name: string
  readonly age: number
}

type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}
type Partial<T> = {
  [P in keyof T]?: T[P]
}

type PersonPartial = Partial<Person>
type ReadonlyPerson = Readonly<Person>

type Keys = 'option1' | 'option2'
type Flags = { [K in Keys]: boolean }

type Nullable<T> = { [P in keyof T]: T[P] | null }
type Partial<T> = { [P in keyof T]?: T[P] }

type Proxy<T> = {
  get(): T
  set(value: T): void
}

type Proxify<T> = {
  [P in keyof T]: Proxy<T[P]>
}

function proxify<T>(o: T): Proxify<T> {
  return
}

let proxyProps = proxify({})

type ThreeStringProps = Record<'prop1' | 'prop2' | 'prop3', string>
```






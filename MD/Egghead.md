# Egghead 

## Numeric Separator를 사용하여 큰 수를 다루기

> 큰 수를 표현할 때 가독성을 높일 수 있다.
```typescript
const foo = 1234567890

const bar = 1_234_567_890
```

## 더욱 철저한 속성 초기화

> `strictPropertyInitialization` 컴파일러 옵션이 제공
> `strictNullCheck` 도 같이 활성화 되어야 한다.

> `titles: string[] | undefined` 같은 식으로 타입을 정의하고 받아 쓰는 쪽에서 타입가드를 할 필요가 있다.

```typescript
class Library {
  titles: string[]

  constructor(foo: boolean) {
    if (!foo) {
      this.titles = ['foo', 'bar']
    } else {
      this.titles = []
    }
  }
}
```

> DI 등으로 인해 런타임에서 `titles`가 결정되고 컴파일러가 신경 쓸 필요가 없다면 `!`를 붙인다
```typescript
class Library {
  titles!: string[]
  constructor() {}
}
```

## in 연산자를 활용한 자동 타입 추론

> 유니온 타입으로 활용할 시 구분을 어떻게 할 지가 문제가 된다.
> `prop in object`같은 방식으로 사용하면 `boolean` 값으로 리턴한다.

```typescript
function redirect(user: Admin | User) {
  if ('role' in user) {
    
  } else {
  
    }
}
```

## Switch 문에서 자동으로 타입 추론하기

> Redux, useReducer 훅을 사용할 때 

```typescript
interface TodoState {
  todos: string[]
}

function todoReducer(state: TodoState = { todos: [] }, action: Action) {
  switch (action.type) {
    case 'Add':
      return {
        todos: [...state.todos, action.payload], // payload 부분에서 에러
      }
    case 'Remove All':
      return {
        todos: [],
      }
    // ...
  }
}

export interface Action {
  type: string
}

export class Add implements Action {
  readonly type: string = 'Add'
  constructor(public payload: string) {}
}

export class RemoveAll implements Action {
  readonly type: string = 'Remove All'
}
```
> readonly 가 명시가 되어있을땐 타입을 정해주지 않으면 상수 타입이 된다.
> enum 을 활용하여 해결할 수 도 있다.

## Mapped Type을 수정하기

> +, -, ? 등 연산자를 통해 특정 심볼을 더하거나 제거할 수 있다.

```typescript
interface Pet {
  name: string
  age: number
  favoritePark?: string
}

type ReadonlyPet = { readonly [K in keyof Pet ]-?: Pet[K] }

const readonlyPet: ReadonlyPet = { name: 'foor', age: 1000 } // favoritePark 가 없다는 오류가 나온다.
```


## 타입과 인터페이스의 차이

> type은 같은 파일 안에서 두번 선언될 수 없지만, interface는 중복 선언될 경우 타입 결합과 동일하게 동작 한다. 

## 자기 자신을 참조하는 타입 만들기

```typescript
interface TreeNode<T> {
  value: T
  left: TreeNode<T>
  right: TreeNode<T>
}

interface LikedListNode<T> {
  value: T
  next: LikedListNode<T>
}

let node: LikedListNode<string>
node.next.next.next.next.value
```

```typescript
interface Action {
  type: string
}

interface ListNode<T> {
  value: T
  prev: ListNode<T>
  next: ListNode<T>
}

let login = { type: 'LOGIN' }
let load_posts = { type: 'LOAD_POSTS' }
let loginNode: ListNode<Action> = {
  value: login,
  prev: null,
  next: null
}
let loadPostsNode: ListNode<Action> = {
  value: load_posts,
  prev: null,
  next: null
}

loginNode.next = loadPostsNode

let current = loadPostsNode

do {
  console.log(current.value)
  current = current.prev
} while (current)
```

## 이터레이터를 이용하여 커스텀 자료 구조의 순회를 단순하게 만들기

```typescript
interface Action {
  type: string
}

interface ListNode<T> {
  value: T
  prev: ListNode<T>
  next: ListNode<T>
}

class BackwardActionIterator implements IterableIterator<Action> {
  constructor(private _currentActionNode: ListNode<Action>) {}

  [Symbol.iterator](): IterableIterator<Action> {
    return this;
  }
  
  next(): IteratorResult<Action> {
    const curr = this._currentActionNode
  
    if (!curr || !curr.value) {
      return { value: null, done: true }
    }
    
    this._currentActionNode = curr.prev

    return { value: curr.value, done: false };
  }
  
}
```

## unknown 타입 활용하기

> `any`타입을 많이 사용하게 되는데. 3.0 버전부터 추가된 `unknown`타입이 많은 문제를 해결해줄 수 있다.

## 조건부 타입을 사용하여 함수의 타입을 동적으로 할당하기

```typescript
interface StringContainer {
  value: string
  format(): string
  split(): string[]
}

interface NumberContainer {
  value: number
  nearestPrime: number
  round(): number
}

interface Item<T> {
  id: T
  container: T extends string ? StringContainer : NumberContainer
}

let item: Item<string> = {
  id: "foo",
  container: null
}

item.container.

```

> 조건에 맞지 않는 타입은 `never`타입이 되도록 만들면 된다.
> `never`타입이 유니언 타입 안에 있으면 자동으로 무시되기 때문이다.

```typescript
type ArrayOnly<T> = T extends any[] ? T : never
type StringOrNumbers = ArrayOnly<string | number | string[] | number[]>
// 이렇게 하면 StringOrNumbers의 타입은 string[] | number[] 가 된다.
```

```typescript
interface Book {
  id: string
  tableOfContents: string[]
}

interface Tv {
  id: number
  diagonal: number
}

interface ItemService {
  getItem<T>(id: T): Book | Tv
}

interface ItemService {
  getItem<T extends string | number>(id: T): T extends string ? Book | Tv
}
```


## 조건부 타입을 활용하여 재사용할 수 있는 평탄한 타입(Flatten Type) 만들기

```typescript
type FlattenArray<T extends any[]> = T[number]
type FlattenObject<T extends object> = T[keyof T]

type Flatten<T> = T extends any[]
    ? T[number]
    : T extends object
    ? T[keyof T]
    : T
```

## 제네릭 함수 타입이 어떤 타입으로 리턴되는지 추측하기

> 2.8 버전부터 추가된 `infer`키워드를 사용

```typescript
type ReturnType<F> = F extends (...args: any[]) => infer R ? R : any

type UnpackPromiseArray<P> = P extends Promise<infer K>[] ? K : any
const arr = [Promise.resolve(true)]
type ExpectedBoolean = UnpackPromiseArray<typeof arr>
```


## 중첩된 객체의 모든 속성을 read-only 타입으로 만들기


## 데코레이터를 사용하여 클래스의 속성을 동적으로 초기화하기

참고사이트
1. ['Practical Advanced TypeScript' 정리](https://rinae.dev/posts/practical-advanced-typescript-summary?fbclid=IwAR3_tGskSL7c6I0BGyGn58epA5lxNa02LCONbTlhhTuD3kLv6ipwwn93WH8)
2. [Egghead](https://egghead.io/courses/practical-advanced-typescript)

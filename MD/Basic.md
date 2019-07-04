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

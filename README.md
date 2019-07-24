[![Build Status](https://travis-ci.com/LeeKangHyun/typereactexam.svg?branch=master)](https://travis-ci.com/LeeKangHyun/typereact)
# TypeScript and React Example

## Init

리액트에서 TS를 사용하려면
> `yarn add react react-dom @types/react @types/react-dom`

### @TODO
> 내가 직접 해보고 간단하게 정리 해보기

## HandBook

1. 기본 타입
2. 인터페이스
3. 클래스
4. 함수
5. 제네릭
6. 열거형
7. 타입 호환성
8. 고급 타입

## tsconfig

`import React, { Component, FC } from 'react'`
> 이런 형태로 가기 위해선

```json
{
  "allowSyntheticDefaultImports": true,
  "esModuleInterop": true
}
```

**참고 사이트**
1. [TypeScript-kr](https://typescript-kr.github.io)
2. [https://infoscis.github.io](https://infoscis.github.io)
3. [typescript-type과-interface-차이](https://medium.com/@alexsung/typescript-type과-interface-차이-86666e3e90c)

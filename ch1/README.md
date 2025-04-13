강의 교안의 소스가 추가되어 있습니다  
https://github.com/ZeroCho/test-jest

jest 실행 스크립트 옵션

--runInBand

- jest는 테스트를 기본적으로 멀티스레드로 돌려줌, 싱글 스레드로 테스트하기 위함
- 싱글스레드로 테스트 했을 때, 더 빠른 케이스가 있을 수 있어서 성능 비교해보면 좋음
- ex) 모노레포 환경일 때, 너무 많은 스레드가 생성된다고 함
- --maxWorkers로 설정할 수 있음

--watch, --watchAll

--detectOpenHandles

- test leaking 원인 찾는데 도움을 줄 수 있음
- 원인을 못찾았을 때 최후의 수단으로 --forceExit
